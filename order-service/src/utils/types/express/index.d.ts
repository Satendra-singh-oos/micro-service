export interface GetUserDTO {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: GetUserDTO;
    }
  }
}
