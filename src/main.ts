import { UserFileRepository } from "./infrastructure/repositories/user.file.repository";
import { AuthUseCase } from "./core/usecases/auth.usecase";
import { startServer } from "./infrastructure/http/server";
import { AuthCLI } from "./presentation/cli/auth.cli";

if (process.argv.includes("--api")) {
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
