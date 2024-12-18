import crypto from 'crypto';

import { Payload } from './types/Payload';
import { Encryption } from './encryption';

import { InvalidPayloadException } from './exceptions/invalid-payload.exception';
import { InvalidMacException } from './exceptions/invalid-mac.exception';

export class Decrypter extends Encryption {
    decrypt(text: string): string {
        const payload = this.decodePayload(text);
        const iv = Buffer.from(payload.iv, 'base64');
        const encryptedText = Buffer.from(payload.value, 'base64').toString('hex');
        const decryptedText = this.cipherDecryptText(encryptedText, iv);
        return decryptedText;
    }

    protected decodePayload(text: string): Payload {
        let payload: Payload | null = null;

        try {
            const textDecoded = Buffer.from(text, 'base64').toString();
            payload = JSON.parse(textDecoded);
        } catch (error) {
            throw new InvalidPayloadException();
        }

        if (payload === null || ! this.payloadIsValid(payload)) {
            throw new InvalidPayloadException();
        }

        if (! this.macIsValid(payload)) {
            throw new InvalidMacException();
        }

        return payload;
    }

    protected payloadIsValid(payload: Payload): boolean {
        return (payload.iv != null || payload.value != null || payload.mac != null);
    }

    protected macIsValid(payload: Payload): boolean {
        const randomBytes = crypto.randomBytes(16);
        const hashMac = crypto.createHmac('sha256', randomBytes).update(payload.mac).digest('binary');
        const hashPayload = crypto.createHmac('sha256', randomBytes).update(this.signEncryption(payload.value, payload.iv)).digest('binary');
        return hashMac === hashPayload;
    }

    protected cipherDecryptText(encryptedText: string, iv: Buffer): string {
        const decipher = crypto.createDecipheriv('AES-256-CBC', this.key, iv);
        const decryptedText = decipher.update(encryptedText, 'hex', 'utf-8')+decipher.final('utf-8');
        return decryptedText;
    }
}
