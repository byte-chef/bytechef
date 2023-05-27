import { Request, Response } from 'express';
import generateController from '../controllers/generateController';
import * as Validation from '../utils/validation';
import { vi } from 'vitest';
import { openai } from '../utils/openai';

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

describe('generateController', () => {
  afterEach(() => {
    vi.clearAllMocks();
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
      const spy = vi
        .spyOn(openai, 'createModeration')

        .mockResolvedValue({
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
});
