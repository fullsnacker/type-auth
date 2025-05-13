import { UserFileRepository } from "./infrastructure/repositories/user.file.repository";
import { AuthUseCase } from "./core/usecases/auth.usecase";
import { AuthCLI } from "./infrastructure/cli/auth.cli";

// Configuración e inyección de dependencias
const userRepository = new UserFileRepository();
const authUseCase = new AuthUseCase(userRepository);
const authCLI = new AuthCLI(authUseCase);

// Iniciar la aplicación
authCLI.start().catch((error) => {
  console.error("Application error:", error);
  process.exit(1);
});