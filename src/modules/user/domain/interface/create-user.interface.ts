export interface CreateUserInterface {
  email: string;
  name?: string | null;
  password: string;
  salt: string;
}
