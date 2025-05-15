import { Request, Response } from "express";
import { AuthUseCase } from "../../../core/usecases/auth.usecase";

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  /**
   * @desc Register a new user
   * @route POST /api/auth/register
   * @access Public
   */
  async register(req: Request, res: Response) {
    try {
      if (!("validatedData" in req)) {
        return res.status(500).json({ error: "Validation middleware failed" });
      }

      const { username, password } = (req as any).validatedData;
      const user = await this.authUseCase.register(username, password);

      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      this.handleError(res, error as Error, "Registration failed");
    }
  }

  /**
   * @desc Authenticate user
   * @route POST /api/auth/login
   * @access Public
   */
  async login(req: Request, res: Response) {
    try {
      const { username, password } = (req as any).validatedData;

      const user = await this.authUseCase.login(username, password);

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        },
      });
    } catch (error) {
      this.handleError(res, error as Error, "Login failed");
    }
  }

  /**
   * @desc Logout user / clear cookie
   * @route POST /api/auth/logout
   * @access Private
   */
  async logout(req: Request, res: Response) {
    try {
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      this.handleError(res, error as Error, "Logout failed");
    }
  }

  private handleError(res: Response, error: Error, defaultMessage: string) {
    const statusCode = error.message.includes("not found")
      ? 404
      : error.message.includes("Invalid")
      ? 401
      : 400;

    res.status(statusCode).json({
      success: false,
      message: error.message || defaultMessage,
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
