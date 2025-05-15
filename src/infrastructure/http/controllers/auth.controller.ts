import { Request, Response } from 'express';
import { AuthUseCase } from '../../../core/usecases/auth.usecase';
import { RegisterUserDto, LoginUserDto } from '../validators/auth.validators';

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  /**
   * @desc Register a new user
   * @route POST /api/auth/register
   * @access Public
   */
  async register(req: Request, res: Response) {
    try {
      const { username, password }: RegisterUserDto = req.body;
      
      const user = await this.authUseCase.register(username, password);
      
      // Generar token JWT (opcional)
    //   const token = generateToken(user.id);
      
      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt,
        }
      });
    } catch (error) {
      this.handleError(res, error as Error, 'Registration failed');
    }
  }

  /**
   * @desc Authenticate user
   * @route POST /api/auth/login
   * @access Public
   */
  async login(req: Request, res: Response) {
    try {
      const { username, password }: LoginUserDto = req.body;
      
      const user = await this.authUseCase.login(username, password);
      
      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        }
      });
    } catch (error) {
      this.handleError(res, error as Error, 'Login failed');
    }
  }

  /**
   * @desc Logout user / clear cookie
   * @route POST /api/auth/logout
   * @access Private
   */
  async logout(req: Request, res: Response) {
    try {
      // En una implementación real, invalidarías el token aquí
      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      this.handleError(res, error as Error, 'Logout failed');
    }
  }

//   /**
//    * @desc Get current user profile
//    * @route GET /api/auth/me
//    * @access Private
//    */
//   async getProfile(req: Request, res: Response) {
//     try {
//       // req.user sería establecido por tu middleware de autenticación
//       const user = await this.authUseCase.getUserById((req as any).user.id);
      
//       res.status(200).json({
//         success: true,
//         data: {
//           id: user.id,
//           username: user.username,
//           createdAt: user.createdAt
//         }
//       });
//     } catch (error) {
//       this.handleError(res, error as Error, 'Profile retrieval failed');
//     }
//   }

  // Helper para manejo centralizado de errores
  private handleError(res: Response, error: Error, defaultMessage: string) {
    const statusCode = error.message.includes('not found') ? 404 : 
                      error.message.includes('Invalid') ? 401 : 
                      400;
    
    res.status(statusCode).json({
      success: false,
      message: error.message || defaultMessage,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}