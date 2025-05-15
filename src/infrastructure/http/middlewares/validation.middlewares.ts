import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export function validateRequest(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        username:req.body.username,
        password:req.body.password,
      });
      next();
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        res.status(400).json({ error: (error as any).errors });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  };
}