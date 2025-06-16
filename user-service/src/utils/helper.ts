import bcryptjs from "bcryptjs";
import { hashedPasswordRounds } from "./constant";

export async function generateHashPassword(password: string) {
  const salt = await bcryptjs.genSalt(hashedPasswordRounds);
  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
}
