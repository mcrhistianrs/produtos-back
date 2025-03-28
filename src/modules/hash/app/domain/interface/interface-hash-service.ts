export interface IHashService {
  hash(password: string): Promise<string>;
  compare(password: string, encryptedPassword: string): Promise<boolean>;
}
