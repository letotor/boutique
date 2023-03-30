export interface UserInterface {
  userId: number | string | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  avatar?: string | undefined;
  password: string | null | undefined;
  birthdate?: Date | string;
  registeredAt?: Date | string;
}
