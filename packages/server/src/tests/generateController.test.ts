import * as ImageUtils from './../utils/image';
import { Request, Response } from 'express';
import generateController from '../controllers/generateController';
import * as Validation from '../utils/validation';
import { vi } from 'vitest';
import { openai } from '../utils/openai';
import * as S3Utils from '../utils/s3';

vi.mock('../utils/openai', () => {
  const openai = {
    createChatCompletion: vi.fn(() => ({
      data: {
        choices: [
          {
            message: {
              content: '{ "result": "result" }',
            },
          },
        ],
      },
    })),
    createModeration: vi.fn(() => ({
      data: {
        results: [
          {
            flagged: false,
          },
        ],
      },
    })),
    createImage: vi.fn(() => ({
      data: {
        data: [
          {
            url: 'url',
          },
        ],
      },
    })),
  };
  return { openai };
});

vi.mock('../utils/validation', () => ({
  validateGenerateRequest: vi.fn(() => 'result of validateGenerateRequest'),
  validateGenerateResponse: vi.fn(() => 'result of validateGenerateResponse'),
}));

vi.mock('../utils/aiPrompt', () => ({
  createPrompt: vi.fn(() => 'prompt'),
}));

vi.mock('../utils/image', () => ({
  getImageBuffer: vi.fn(() => 'image buffer'),
}));

vi.mock('../utils/s3', () => ({
  uploadImage: vi.fn(() => 's3 url'),
}));

describe('generateController', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('validateRequest', () => {
    const req = { body: 'body' } as unknown as Request;
    const res = { locals: {} } as unknown as Response;
    const next = vi.fn();

    it('should call validateGenerateRequest with req.body', async () => {
      await generateController.validateRequest(req, res, next);

      expect(Validation.validateGenerateRequest).toHaveBeenCalledWith(req.body);
    });

    it('should set res.locals.generationRequest to the result of validateGenerateRequest', async () => {
      await generateController.validateRequest(req, res, next);

      expect(res.locals.generationRequest).toEqual(
        'result of validateGenerateRequest'
      );
    });

    it('should call next', async () => {
      await generateController.validateRequest(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error if validateGenerateRequest throws an error', async () => {
      vi.spyOn(Validation, 'validateGenerateRequest').mockRejectedValueOnce(
        new Error()
      );

      await generateController.validateRequest(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String),
        log: expect.any(String),
      });
    });
  });

  describe('moderateRequest', () => {
    const req = {} as Request;
    const res = {
      locals: {
        generationRequest: {
          cuisine: 'cuisine',
          theme: 'theme',
          ingredients: ['ingredient1', 'ingredient2'],
        },
      },
    } as unknown as Response;
    const next = vi.fn();

    it('should call openai.createModeration with moderationString', async () => {
      await generateController.moderateRequest(req, res, next);

      expect(openai.createModeration).toHaveBeenCalledWith({
        input: 'cuisine theme with ingredient1 ingredient2',
      });
    });

    it('should invoke next error handling if moderation is flagged', async () => {
      vi.spyOn(openai, 'createModeration').mockResolvedValue({
        data: {
          results: [
            {
              flagged: true,
              categories: {
                bad: true,
              },
            },
          ],
        },
      } as any);

      await generateController.moderateRequest(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String),
        log: expect.any(String),
      });
    });

    it('should return a server error if openai throws an error', async () => {
      vi.spyOn(openai, 'createModeration').mockRejectedValue(
        new Error('error')
      );

      await generateController.moderateRequest(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 500,
        message: expect.any(String),
        log: expect.any(String),
      });
    });
  });

  describe('generateRequest', () => {
    process.env.BC_OPENAI_MODEL = 'model';

    const req = {} as Request;
    const res = {
      locals: {
        generationRequest: '{ "ingredients": ["ingredient1", "ingredient2"] }',
      },
    } as unknown as Response;
    const next = vi.fn();

    it('should call openai.createChatCompletion with the correct prompt', async () => {
      await generateController.generateRequest(req, res, next);

      expect(openai.createChatCompletion).toHaveBeenCalledWith({
        model: 'model',
        messages: 'prompt',
      });
    });

    it('should call next with an error if openai throws an error', async () => {
      vi.spyOn(openai, 'createChatCompletion').mockRejectedValue(
        new Error('error')
      );

      await generateController.generateRequest(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 500,
        message: 'Error generating prompt.',
        log: expect.any(String),
      });
    });

    it('should call next with an error if openai returns a bad response', async () => {
      vi.spyOn(openai, 'createChatCompletion').mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: '{{}}}',
              },
            },
          ],
        },
      } as any);

      await generateController.generateRequest(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 500,
        message: 'AI produced invalid JSON.',
        log: expect.any(String),
      });
    });

    it('should validate the AI response', async () => {
      vi.spyOn(openai, 'createChatCompletion').mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: '{ "result": "result" }',
              },
            },
          ],
        },
      } as any);

      await generateController.generateRequest(req, res, next);

      expect(Validation.validateGenerateResponse).toHaveBeenCalledWith({
        result: 'result',
      });
    });

    it('should call next with an error if validateGenerateResponse throws an error', async () => {
      vi.spyOn(Validation, 'validateGenerateResponse').mockRejectedValue(
        new Error()
      );

      await generateController.generateRequest(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 500,
        message: 'AI produced invalid recipe.',
        log: expect.any(String),
      });
    });

    it('should set res.locals.generatedRecipe and call next()', async () => {
      vi.spyOn(Validation, 'validateGenerateResponse').mockResolvedValue(
        'validated response'
      );

      await generateController.generateRequest(req, res, next);

      expect(res.locals.generatedRecipe).toEqual('validated response');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('generateImage', () => {
    const req = {} as Request;
    const res = {
      locals: {
        generatedRecipe: {
          imagePrompt: 'image',
        },
      },
    } as unknown as Response;
    const next = vi.fn();

    it('should call openai createImage with the correct prompt', async () => {
      await generateController.generateImage(req, res, next);

      expect(openai.createImage).toHaveBeenCalledWith({
        prompt: 'image',
        n: 1,
        size: '512x512',
      });
    });

    it('should call next with an error if openai throws an error', async () => {
      vi.spyOn(openai, 'createImage').mockRejectedValue(new Error('error'));

      await generateController.generateImage(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 500,
        message: 'Error generating image.',
        log: expect.any(String),
      });
    });

    it('should call getImageBuffer with the correct parameters', async () => {
      await generateController.generateImage(req, res, next);

      expect(ImageUtils.getImageBuffer).toHaveBeenCalledWith('url');
    });

    it('should call next with an error if getImageBuffer throws an error', async () => {
      vi.spyOn(ImageUtils, 'getImageBuffer').mockRejectedValue(
        new Error('error')
      );

      await generateController.generateImage(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 500,
        message: 'Error downloading image.',
        log: expect.any(String),
      });
    });

    it('should call AWS with the image buffer to upload to S3', async () => {
      await generateController.generateImage(req, res, next);

      expect(S3Utils.uploadImage).toHaveBeenCalledWith('image buffer');
    });

    it('should call next with an error if uploadImage throws an error', async () => {
      vi.spyOn(S3Utils, 'uploadImage').mockRejectedValue(new Error(''));

      await generateController.generateImage(req, res, next);

      expect(next).toHaveBeenCalledWith({
        status: 500,
        message: 'Error uploading image to S3.',
        log: expect.any(String),
      });
    });

    it('should set res.locals.generatedRecipe.imageUrl to the S3 url', async () => {
      await generateController.generateImage(req, res, next);

      expect(res.locals.generatedRecipe.imageUrl).toEqual('s3 url');
    });
  });
});
