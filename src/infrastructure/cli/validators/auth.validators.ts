import { authSchema } from '../../../core/validators/auth.validators';
import { ZodError } from 'zod';

export const validateCLIInput = (input: { username: string; password: string }) => {
  try {
    return authSchema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      );
      throw new Error(`Validation failed:\n${errorMessages.join('\n')}`);
    }
    throw error;
  }
};