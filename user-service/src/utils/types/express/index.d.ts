// types/express/index.d.ts

import { GetUserDTO } from "../user.type";

declare global {
  namespace Express {
    interface Request {
      user?: GetUserDTO; // Use your actual user type here
    }
  }
}
