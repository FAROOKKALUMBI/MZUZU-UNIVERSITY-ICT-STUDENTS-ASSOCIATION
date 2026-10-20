import { PasswordStrength } from '../types/auth';

/**
 * Get the Web Crypto API instance safely across modern browsers and environments
 */
function getCrypto(): Crypto {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto;
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  throw new Error('Web Cryptography API is not available in this environment');
}

/**
 * Generate a cryptographically secure random hexadecimal string (default: 16 bytes = 32 hex chars)
 */
export function generateSalt(byteLength: number = 16): string {
  const cryptoInstance = getCrypto();
  const array = new Uint8Array(byteLength);
  cryptoInstance.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert a hexadecimal string to Uint8Array
 */
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/**
 * Derive a secure cryptographic hash using PBKDF2 with SHA-256 (100,000 iterations)
 */
export async function hashPassword(password: string, saltHex: string): Promise<string> {
  const cryptoInstance = getCrypto();
  const subtle = cryptoInstance.subtle;
  const enc = new TextEncoder();
  const passwordKey = await subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const saltBytes = hexToBytes(saltHex);
  const derivedBits = await subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes as unknown as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    256
  );

  return Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Constant-time string equality check to mitigate timing attack vulnerabilities
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Verify a candidate password against an existing salt and PBKDF2 hash
 */
export async function verifyPassword(
  candidatePassword: string,
  saltHex: string,
  expectedHash: string
): Promise<boolean> {
  try {
    const candidateHash = await hashPassword(candidatePassword, saltHex);
    return timingSafeEqual(candidateHash, expectedHash);
  } catch (err) {
    console.error('Password verification failure:', err);
    return false;
  }
}

/**
 * Generate a random session token
 */
export function generateRandomToken(byteLength: number = 32): string {
  return generateSalt(byteLength);
}

/**
 * Generate a formatted emergency recovery key (e.g., MUISA-SEC-7291-8402-9A3K)
 */
export function generateRecoveryKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const cryptoInstance = getCrypto();
  const array = new Uint8Array(12);
  cryptoInstance.getRandomValues(array);

  let key = 'MUISA-SEC-';
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) key += '-';
    key += chars[array[i] % chars.length];
  }
  return key;
}

/**
 * Evaluate password strength and compliance with high-security policy
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  const requirements = [
    { label: 'At least 8 characters long', met: password.length >= 8 },
    { label: 'Contains at least one uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'Contains at least one lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { label: 'Contains at least one number (0-9)', met: /[0-9]/.test(password) },
    { label: 'Contains at least one special symbol (!@#$%^&*...)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = requirements.filter((r) => r.met).length;

  let score = 0;
  let label: PasswordStrength['label'] = 'Very Weak';
  let color = 'text-red-500 bg-red-500';

  if (password.length === 0) {
    score = 0;
    label = 'Very Weak';
    color = 'text-gray-400 bg-gray-300';
  } else if (metCount <= 2 || password.length < 8) {
    score = 1;
    label = 'Weak';
    color = 'text-red-500 bg-red-500';
  } else if (metCount === 3) {
    score = 2;
    label = 'Medium';
    color = 'text-amber-500 bg-amber-500';
  } else if (metCount === 4) {
    score = 3;
    label = 'Strong';
    color = 'text-blue-500 bg-blue-500';
  } else {
    score = 4;
    label = 'Very Strong';
    color = 'text-green-600 bg-green-600';
  }

  return { score, label, color, requirements };
}
