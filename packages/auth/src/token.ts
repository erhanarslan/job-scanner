import jwt from 'jsonwebtoken';

import { TOKEN_EXPIRY } from '@job-scanner/config';
import type { AccessTokenPayload, RefreshTokenPayload } from '@job-scanner/shared';

function getAccessSecret(): string {
  const secret = process.env['JWT_ACCESS_SECRET'];
  if (!secret) throw new Error('JWT_ACCESS_SECRET is required');
  return secret;
}

function getRefreshSecret(): string {
  const secret = process.env['JWT_REFRESH_SECRET'];
  if (!secret) throw new Error('JWT_REFRESH_SECRET is required');
  return secret;
}

export function signAccessToken(payload: Omit<AccessTokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, getAccessSecret(), {
    expiresIn: TOKEN_EXPIRY.access,
  });
}

export function signRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn: TOKEN_EXPIRY.refresh,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, getAccessSecret()) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, getRefreshSecret()) as RefreshTokenPayload;
}

export function decodeToken<T>(token: string): T | null {
  try {
    return jwt.decode(token) as T;
  } catch {
    return null;
  }
}
