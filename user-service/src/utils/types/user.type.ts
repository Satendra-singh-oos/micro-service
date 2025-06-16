export interface UserRegistrationDTO {
  userName: string;
  fullName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
