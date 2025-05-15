import express from 'express';
import { UserFileRepository } from '../repositories/user.file.repository';
import { AuthUseCase } from '../../core/usecases/auth.usecase';
import { AuthController } from './controllers/auth.controller';
import { createAuthRoutes } from './routes/auth.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inyección de dependencias
const userRepo = new UserFileRepository();
const authUseCase = new AuthUseCase(userRepo);
const authController = new AuthController(authUseCase);

// Routes
app.use('/api/auth', createAuthRoutes(authController));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export const startServer = (port: number) => {
  return app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};