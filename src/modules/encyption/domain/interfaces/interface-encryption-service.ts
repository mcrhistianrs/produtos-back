interface IEncryptService {
  encrypt(data: string): Promise<string>;
  decrypt(data: string): Promise<string>;
}
export { IEncryptService };
