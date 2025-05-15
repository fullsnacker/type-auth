import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { AuthUseCase } from "../../core/usecases/auth.usecase";
import { User } from "../../core/entities/user";

export class AuthCLI {
  private currentUser: User | null = null;

  constructor(private authUseCase: AuthUseCase) {}

  async start() {
    console.clear();
    
    console.log(chalk.green(figlet.textSync("Type Auth", { horizontalLayout: "full" })));

    while (true) {
      if (!this.currentUser) {
        await this.showMainMenu();
      } else {
        await this.showUserMenu();
      }
    }
  }

  private async showMainMenu() {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: ["Login", "Register", "Exit"],
      },
    ]);

    switch (action) {
      case "Login":
        await this.handleLogin();
        break;
      case "Register":
        await this.handleRegister();
        break;
      case "Exit":
        process.exit(0);
    }
  }

  private async showUserMenu() {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: `Welcome ${this.currentUser!.username}, what do you want to do?`,
        choices: ["Logout", "Exit"],
      },
    ]);

    switch (action) {
      case "Logout":
        this.currentUser = null;
        console.log(chalk.blue("You have been logged out"));
        break;
      case "Exit":
        process.exit(0);
    }
  }

  private async handleLogin() {
    const { username, password } = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Enter your username:",
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password:",
        mask: "*",
      },
    ]);

    try {
      this.currentUser = await this.authUseCase.login(username, password);
      console.log(chalk.green("Login successful!"));
    } catch (error) {
      console.log(chalk.red(`Error: ${(error as Error).message}`));
    }
  }

  private async handleRegister() {
    const { username, password } = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Choose a username:",
      },
      {
        type: "password",
        name: "password",
        message: "Choose a password:",
        mask: "*",
      },
    ]);

    try {
      await this.authUseCase.register(username, password);
      console.log(chalk.green("Registration successful! You can now login."));
    } catch (error) {
      console.log(chalk.red(`Error: ${(error as Error).message}`));
    }
  }
}