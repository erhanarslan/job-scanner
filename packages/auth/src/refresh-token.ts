import { randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

import { eq } from 'drizzle-orm';
import { getDb, schema } from '@job-scanner/database';
import type { RefreshTokenPayload } from '@job-scanner/shared';

import { signAccessToken, signRefreshToken, verifyRefreshToken } from './token.js';

const randomBytesAsync = promisify(randomBytes);

export async function createRefreshToken(userId: string, userAgent?: string): Promise<string> {
  const token = (await randomBytesAsync(32)).toString('hex');

  const db = getDb();

  await db.insert(schema.sessions).values({
    userId,
    token,
    userAgent: userAgent || null,
  });

  return token;
}

export async function rotateRefreshToken(token: string, userAgent?: string) {
  const db = getDb();

  const session = await db.query.sessions.findFirst({
    where: eq(schema.sessions.token, token),
  });

  if (!session) {
    throw new Error('Invalid refresh token');
  }

  const payload = verifyRefreshToken(token);

  if (Date.now() / 1000 > payload.exp) {
    throw new Error('Refresh token expired');
  }

  const newToken = await createRefreshToken(session.userId, userAgent);

  await db.delete(schema.sessions).where(eq(schema.sessions.token, token));

  return newToken;
}

export async function refreshTokens(refreshToken: string, userAgent?: string) {
  const db = getDb();

  const session = await db.query.sessions.findFirst({
    where: eq(schema.sessions.token, refreshToken),
  });

  if (!session) {
    throw new Error('Invalid refresh token');
  }

  const payload = verifyRefreshToken(refreshToken);

  if (Date.now() / 1000 > payload.exp) {
    throw new Error('Refresh token expired');
  }

  const newAccessToken = signAccessToken({
    userId: session.userId,
    email: payload.email,
  });

  const newRefreshToken = await createRefreshToken(session.userId, userAgent);

  await db.delete(schema.sessions).where(eq(schema.sessions.token, refreshToken));

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
