import { Request, Response } from 'express';
import generateController from '../controllers/generateController';
import * as Validation from '../utils/validation';
import { vi } from 'vitest';
import { openai } from '../utils/openai';
import { AxiosResponse } from 'axios';
import { CreateModerationResponse } from 'openai';

describe('generateController', () => {
  describe('validateRequest', () => {
    vi.mock('../utils/validation', () => ({
      validateGenerateRequest: vi.fn(() => 'result of validateGenerateRequest'),
    }));

    const req = { body: 'body' } as unknown as Request;
    const res = { locals: {} } as unknown as Response;
    const next = vi.fn();

    afterEach(() => {
      vi.clearAllMocks();
    });

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
      vi.spyOn(Validation, 'validateGenerateRequest').mockRejectedValue(
        'error'
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

    vi.mock('../utils/openai', () => {
      const openai = {
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

    afterEach(() => {
      vi.clearAllMocks();
    });

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
});
