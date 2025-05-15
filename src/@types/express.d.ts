import { AuthCredentials } from '../../../core/validators/auth.validators';

declare global {
  namespace Express {
    interface Request {
      validatedData?: AuthCredentials;
    }
  }
}