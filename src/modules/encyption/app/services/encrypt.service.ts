import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IEncryptService } from '../../domain/interfaces/interface-encryption-service';

@Injectable()
export default class EncryptService implements IEncryptService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = crypto.scryptSync(
    process.env.ENCRYPTION_KEY,
    'salt',
    32,
  );
  private readonly iv = crypto.randomBytes(16);

  async encrypt(text: string): Promise<string> {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${this.iv.toString('hex')}:${encrypted}`;
  }

  async decrypt(encryptedText: string): Promise<string> {
    const [ivHex, content] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
