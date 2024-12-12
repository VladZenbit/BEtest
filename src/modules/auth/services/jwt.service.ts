import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private readonly JWT_SECRET_KEY =
    this.configService.get<string>("JWT_SECRET_KEY");

  sign(payload: object, expiresIn: string): string {
    return jwt.sign(payload, this.JWT_SECRET_KEY ?? "secret", { expiresIn });
  }

  verify(token: string): object | string {
    try {
      return jwt.verify(token, this.JWT_SECRET_KEY ?? "secret");
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }
}
