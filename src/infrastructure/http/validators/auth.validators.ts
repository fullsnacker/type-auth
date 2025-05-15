import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(1),
});

export type RegisterUserDto = z.infer<typeof registerSchema>;
export type LoginUserDto = z.infer<typeof loginSchema>;