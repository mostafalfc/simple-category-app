import crypto from "crypto";
import { HashResponseInterface } from "../interfaces/hash-response.interface";
import { verifyPasswordRequestInterface } from "../interfaces/verify-password-request.interface";

export class Hash {
  async hashPassword(
    password: string,
    salt?: string
  ): Promise<HashResponseInterface> {
    if (!salt) {
      salt = crypto.randomBytes(16).toString("hex");
    }
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return {
      salt,
      hash,
    };
  }

  async verifyPassword(
    input: verifyPasswordRequestInterface
  ): Promise<boolean> {
    const user_password_hash = this.hashPassword(
      input.user_password,
      input.salt
    );

    return input.hash === (await user_password_hash).hash;
  }
}
