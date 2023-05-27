import { Request, Response } from 'express';
import generateController from '../controllers/generateController';
import { validateGenerateRequest } from '../utils/validation';
import { vi } from 'vitest';

vi.mock('../utils/validation', () => ({
  validateGenerateRequest: vi.fn(() => 'result of validateGenerateRequest'),
  validateGenerateResponse: vi.fn(() => 'result of validateGenerateResponse'),
}));

describe('generateController', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('validateRequest', () => {
    it('should call validateGenerateRequest with req.body', async () => {
      const req = { body: 'body' } as unknown as Request;
      const res = { locals: {} } as unknown as Response;
      const next = vi.fn();

      await generateController.validateRequest(req, res, next);

      expect(validateGenerateRequest).toHaveBeenCalledWith(req.body);
    });

    it('should set res.locals.generationRequest to the result of validateGenerateRequest', async () => {
      const req = { body: 'body' } as unknown as Request;
      const res = { locals: {} } as unknown as Response;
      const next = vi.fn();

      await generateController.validateRequest(req, res, next);

      expect(res.locals.generationRequest).toEqual(
        'result of validateGenerateRequest'
      );
    });

    it('should call next', async () => {
      const req = { body: 'body' } as unknown as Request;
      const res = { locals: {} } as unknown as Response;
      const next = vi.fn();

      await generateController.validateRequest(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
