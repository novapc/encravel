import crypto, { Cipher } from 'crypto';

import { Payload } from './types/Payload';
import { Encryption } from './encryption';
import { InvalidKeyException } from './exceptions/invalid-key.exception';

export class Encrypter extends Encryption {
    encrypt(text: string): string {
        const iv = this.generateRandomIv();
        const encryptedText = this.cipherEncryptText(text, iv)
        const payload = this.generatePayload(encryptedText, iv);
        return this.encodePayload(payload);
    }

    protected generateRandomIv(): Buffer {
        return crypto.randomBytes(16);
    }

    protected cipherEncryptText(text: string, iv: Buffer): string {
        let cipher: Cipher | null = null;
        try {
            cipher = crypto.createCipheriv('AES-256-CBC', this.key, iv);
        } catch (error: any) {
            if (error.toString() === 'RangeError: Invalid key length') {
                throw new InvalidKeyException();
            }
            throw error;
        }
        const encryptedText = cipher.update(text, 'utf-8', 'hex')+cipher.final('hex');
        return encryptedText;
    }

    protected generatePayload(encryptedText: string, iv: Buffer): Payload {
        const encryptedTextInBase64 = Buffer.from(encryptedText, 'hex').toString('base64');
        const ivInBase64 = iv.toString('base64');
        return {
            iv: ivInBase64,
            value: encryptedTextInBase64,
            mac: this.signEncryption(encryptedTextInBase64, ivInBase64)
        };
    }

    protected encodePayload(payload: object): string {
        return Buffer.from(JSON.stringify(payload)).toString('base64');
    }
}
