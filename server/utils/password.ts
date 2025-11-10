import crypto from 'crypto';

export function generateSecurePassword(): string {
  // Generate 16 random bytes and convert to base64
  const buffer = crypto.randomBytes(16);
  return buffer.toString('base64').slice(0, 16); // Truncate to 16 chars for usability
}
