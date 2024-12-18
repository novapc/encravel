import { decrypt, encrypt, generateKey } from '.';

describe('Generate random key', () => {
    test('Returns correct type', () => {
        expect(typeof generateKey()).toBe('string');
    });

    test('Random values', () => {
        const key1 = generateKey();
        const key2 = generateKey();
        expect(key2).not.toBe(key1);
    });

    test('Returns correct type', () => {
        const key = generateKey();

        expect(typeof key).toBe('string');

        const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        expect(key).toMatch(base64Regex);
    });
});

describe('Encrypt', () => {
    test('Returns correct type', () => {
        const encryptedText = encrypt('Payload secret', generateKey());

        expect(typeof encryptedText).toBe('string');

        const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        expect(encryptedText).toMatch(base64Regex);
    });
});

describe('Decrypt', () => {
    test('Returns correct type', () => {
        const key = 'Qf4OIvmpoXhBMTbPBvOHddyU6CqPeN0c2H+vcakZ4h8=';
        const encryptedText = 'eyJpdiI6ImQ0SVgxOStKeDlFV1g0OTdOMzU1OEE9PSIsInZhbHVlIjoiR1pIYnpYRTBpeGs3d3IyYW5mUjBBdz09IiwibWFjIjoiYzU5ZGU5ODEyZjBmMDgzM2RjM2NkMzI1YzhiZDQwZmQ2ZDg3YzUwMTJjNmIyM2IzMjZkZjcxMTAzYzkzODNmNCJ9';
        const decryptedText = decrypt(encryptedText, key);

        expect(typeof decryptedText).toBe('string');

        expect(decryptedText).toBe('Payload secret');
    });
});
