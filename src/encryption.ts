import crypto, { BinaryToTextEncoding } from 'crypto';
import { InvalidKeyException } from './exceptions/invalid-key.exception';

export class Encryption {
    protected key: Buffer;

    constructor (
        key: string
    ) {
        this.validateKey(key);
        this.key = Buffer.from(this.removeFormattingOnKey(key), 'base64');
    }

    protected validateKey(key: string) {
        if (typeof key !== 'string') {
            throw new InvalidKeyException();
        }
    }

    protected removeFormattingOnKey(key: string): string {
        return key.substring(0, 7) === 'base64:' ? key.substring(7, key.length) : key;
    }

    protected signEncryption(encryptedText: string, iv: string, output: BinaryToTextEncoding = 'hex'): string {
        return crypto.createHmac('sha256', this.key).update(iv+encryptedText).digest(output);
    }
}
