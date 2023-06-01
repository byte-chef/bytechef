import {
  validateGenerateRequest,
  validateGenerateResponse,
} from '../utils/validation';

describe('validation', () => {
  describe('validateGenerateRequest', () => {
    it('should validate a valid request', async () => {
      const request = {
        ingredients: ['chicken', 'beef'],
        allowOtherIngredients: false,
        cuisine: 'italian',
        servings: 4,
        theme: 'romantic',
      };

      const result = await validateGenerateRequest(request);

      expect(result).toEqual(request);
    });

    it('should validate a valid request with default values', async () => {
      const request = {
        ingredients: ['chicken', 'beef'],
        allowOtherIngredients: false,
      };

      const result = await validateGenerateRequest(request);

      expect(result).toEqual({
        ...request,
        cuisine: 'any',
        servings: 4,
        theme: 'any',
      });
    });

    it('should throw an error if ingredients is not an array', async () => {
      const request = {
        ingredients: 'chicken',
        allowOtherIngredients: false,
      };

      await expect(validateGenerateRequest(request)).rejects.toThrow();
    });

    it('should throw an error if ingredients is an empty array', async () => {
      const request = {
        ingredients: [],
        allowOtherIngredients: false,
      };

      await expect(validateGenerateRequest(request)).rejects.toThrow();
    });

    it('should throw an error if cuisine is not a string', async () => {
      const request = {
        ingredients: ['chicken', 'beef'],
        allowOtherIngredients: false,
        cuisine: 4,
      };

      await expect(validateGenerateRequest(request)).rejects.toThrow();
    });

    it('should throw an error if servings is not a number', async () => {
      const request = {
        ingredients: ['chicken', 'beef'],
        allowOtherIngredients: false,
        servings: 'four',
      };

      await expect(validateGenerateRequest(request)).rejects.toThrow();
    });

    it('should throw an error if ingredients is missing', async () => {
      const request = {
        allowOtherIngredients: false,
      };

      await expect(validateGenerateRequest(request)).rejects.toThrow();
    });

    it('should throw an error if allowOtherIngredients is missing', async () => {
      const request = {
        ingredients: ['chicken', 'beef'],
      };

      await expect(validateGenerateRequest(request)).rejects.toThrow();
    });
  });

  describe('validateGenerateResponse', () => {
    it('should validate a valid response', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: ['cook', 'eat'],
        name: 'name',
        servings: 4,
        time: 60,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      const result = await validateGenerateResponse(response);

      expect(result).toEqual(response);
    });

    it('should throw an error if ingredients is not an array', async () => {
      const response = {
        ingredients: 'chicken',
        instructions: ['cook', 'eat'],
        name: 'name',
        servings: 4,
        time: 60,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if instructions is not an array', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: 'cook',
        name: 'name',
        servings: 4,
        time: 60,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if name is missing', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: ['cook', 'eat'],
        servings: 4,
        time: 60,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if servings is missing', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: ['cook', 'eat'],
        name: 'name',
        time: 60,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if time is missing', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: ['cook', 'eat'],
        name: 'name',
        servings: 4,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if description is missing', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: ['cook', 'eat'],
        name: 'name',
        servings: 4,
        time: 60,
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if imagePrompt is missing', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: ['cook', 'eat'],
        name: 'name',
        servings: 4,
        time: 60,
        description: 'description',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if ingredients is an empty array', async () => {
      const response = {
        ingredients: [],
        instructions: ['cook', 'eat'],
        name: 'name',
        servings: 4,
        time: 60,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });

    it('should throw an error if instructions is an empty array', async () => {
      const response = {
        ingredients: ['chicken', 'beef'],
        instructions: [],
        name: 'name',
        servings: 4,
        time: 60,
        description: 'description',
        imagePrompt: 'imagePrompt',
      };

      await expect(validateGenerateResponse(response)).rejects.toThrow();
    });
  });
});
