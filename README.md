# Encravel

Cryptography package based on `Illuminate/Encryption` (Laravel).

Uses the AES-256-CBC algorithm for encryption and an IV system to always generate different results, regardless of the input.

# Installation

```bash
npm install @novapc/encravel
```

# How to use

## Generate encryption key

```typescript
import { generateKey } from '@novapc/encravel';

const key = generateKey();

console.log(key); // T9aYJhvqVdnm4scQQhr+It7xrXn+C7RZHk1Q7zllAmM=
```

## Create instance

```typescript
import Encravel from '@novapc/encravel';

const key = 'T9aYJhvqVdnm4scQQhr+It7xrXn+C7RZHk1Q7zllAmM=';

const encrypter = new Encravel(key);
```

## Encrypt text using instance

```typescript
console.log(encrypter.encrypt('My secret text'));
```

## Decrypt text using instance

```typescript
console.log(encrypter.decrypt('eyJpdiI6IjBVOVZLQU9jMW0wYmdhNGtON0FTcmc9PSIsInZhbHVlIjoid0NTaGEvQlFOMmE3R2g4UEFmL3VkQT09IiwibWFjIjoiNjI4ZWM4MDY1YjMwMTNlYjA2MDJkNmFhODE2ZmYwMGQwMzY0NWY4ZWM2NDBmNDkzOTEzM2Q1Nzc1YTQ3YjVkMCJ9'));
```

## Encrypt text using helper

```typescript
import { encrypt } from '@novapc/encravel';

const key = 'T9aYJhvqVdnm4scQQhr+It7xrXn+C7RZHk1Q7zllAmM=';

console.log(encrypt('My secret text', key));
```

## Decrypt text using helper

```typescript
import { decrypt } from '@novapc/encravel';

const key = 'T9aYJhvqVdnm4scQQhr+It7xrXn+C7RZHk1Q7zllAmM=';

console.log(decrypt('eyJpdiI6IjBVOVZLQU9jMW0wYmdhNGtON0FTcmc9PSIsInZhbHVlIjoid0NTaGEvQlFOMmE3R2g4UEFmL3VkQT09IiwibWFjIjoiNjI4ZWM4MDY1YjMwMTNlYjA2MDJkNmFhODE2ZmYwMGQwMzY0NWY4ZWM2NDBmNDkzOTEzM2Q1Nzc1YTQ3YjVkMCJ9', key));
```
