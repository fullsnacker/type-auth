import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user";

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async register(username: string, password: string): Promise<User> {
    // Validaciones de negocio aquí
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // La encriptación real se hará en la capa de infraestructura
    const user: User = {
      id: this.generateUserId(),
      username,
      passwordHash: password, // Esto será encriptado después
      createdAt: new Date(),
    };

    return this.userRepository.createUser(user);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    // Corregimos aquí - delegamos al repositorio
    const isValid = await this.userRepository.verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    return user;
  }

  private generateUserId(): string {
    // Implementación real en infraestructura
    return "temp-id";
  }
}