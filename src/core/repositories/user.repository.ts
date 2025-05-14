import { User } from "../entities/user";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
}