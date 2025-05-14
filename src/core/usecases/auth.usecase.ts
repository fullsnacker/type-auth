import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user";

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async register(username: string, password: string): Promise<User> {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const user: User = {
      id: this.generateUserId(),
      username,
      passwordHash: password,
      createdAt: new Date(),
    };

    return this.userRepository.createUser(user);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await this.userRepository.verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    return user;
  }

  private generateUserId(): string {
    return "temp-id";
  }
}