import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  private readonly SALT_ROUNDS = Number(
    this.configService.get<number>("SALT_ROUNDS")
  );

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
