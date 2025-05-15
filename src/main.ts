import { UserFileRepository } from "./infrastructure/repositories/user.file.repository";
import { AuthUseCase } from "./core/usecases/auth.usecase";
import { AuthCLI } from "./infrastructure/cli/auth.cli";
import { startServer } from "./infrastructure/http/server";

if (process.argv.includes('--api')) {
  startServer(3000);
} else {

const userRepository = new UserFileRepository();
const authUseCase = new AuthUseCase(userRepository);
const authCLI = new AuthCLI(authUseCase);

authCLI.start().catch((error) => {
  console.error("Application error:", error);
  process.exit(1);
});
}