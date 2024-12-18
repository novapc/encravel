import crypto from 'crypto';

import { Encrypter } from './encrypter';
import { Decrypter } from './decrypter';

import { InvalidKeyException } from './exceptions/invalid-key.exception';
import { InvalidMacException } from './exceptions/invalid-mac.exception';
import { InvalidPayloadException } from './exceptions/invalid-payload.exception';

function generateKey(): string {
    return crypto.randomBytes(32).toString('base64');
}

function encrypt(text: string, key: any): string {
    const encravel = new Encravel(key);
    return encravel.encrypt(text);
}

function decrypt(text: string, key: string): string {
    const encravel = new Encravel(key);
    return encravel.decrypt(text);
}

class Encravel {
    constructor (
        protected key: string
    ) {}

    encrypt(text: string): string {
        const encrypter = new Encrypter(this.key);
        return encrypter.encrypt(text);
    }

    decrypt(text: string): string {
        const decrypter = new Decrypter(this.key);
        return decrypter.decrypt(text);
    }
}

export {
    generateKey,
    encrypt,
    decrypt,
    InvalidKeyException,
    InvalidMacException,
    InvalidPayloadException
};

export default Encravel;
