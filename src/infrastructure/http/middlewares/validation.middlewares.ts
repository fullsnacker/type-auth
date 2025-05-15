import { Request, Response, NextFunction } from "express";
import { authSchema } from "../../../core/validators/auth.validators";

export const validateAuthInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = authSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      errors: result.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });
  }

  (req as any).validatedData = result.data;
  next();
};
