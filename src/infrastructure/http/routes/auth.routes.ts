import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateAuthInput } from "../middlewares/validation.middlewares";
import { RequestHandler } from "express";

export function createAuthRoutes(authController: AuthController) {
  const router = Router();

  /**
   * @openapi
   * /api/auth/register:
   *   post:
   *     tags: [Authentication]
   *     summary: Register a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterUserDto'
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Invalid input
   */
  router.post(
    "/register",
    validateAuthInput as RequestHandler,
    async (req, res, next) => {
      try {
        await authController.register(req, res);
        next();
      } catch (error) {
        next(error);
      }
    }
  );

  /**
   * @openapi
   * /api/auth/login:
   *   post:
   *     tags: [Authentication]
   *     summary: Login user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginUserDto'
   *     responses:
   *       200:
   *         description: Login successful
   *       401:
   *         description: Invalid credentials
   */
  router.post("/login", authController.login.bind(authController));

  /**
   * @openapi
   * /api/auth/logout:
   *   post:
   *     tags: [Authentication]
   *     summary: Logout user
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout successful
   *       401:
   *         description: Unauthorized
   */
  router.post("/logout", authController.logout.bind(authController));

  return router;
}
