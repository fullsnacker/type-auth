import { UserRepository } from "../../core/repositories/user.repository";
import { User } from "../../core/entities/user";
import * as fs from "fs";
import * as path from "path";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const FILE_PATH = path.join(__dirname, "../../../data/users.json");

export class UserFileRepository implements UserRepository {
  private users: User[] = [];

  constructor() {
    this.ensureFileExists();
    this.loadUsers();
  }

  private ensureFileExists(): void {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, "[]", "utf-8");
    }
  }

  private loadUsers(): void {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    this.users = JSON.parse(data || "[]");
  }

  private saveUsers(): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(this.users, null, 2), "utf-8");
  }

  async createUser(user: User): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.passwordHash, salt);

    const newUser: User = {
      ...user,
      id: uuidv4(),
      passwordHash,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((u) => u.username === username) || null;
  }

  async findAllUsers(): Promise<User[]> {
    return [...this.users];
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}