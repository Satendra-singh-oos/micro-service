import { GetUserDTO } from "../user.type";

declare global {
  namespace Express {
    interface Request {
      user?: GetUserDTO;
    }
  }
}
