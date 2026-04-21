export type UserRole = 'user' | 'admin';

export type UserStatus = 'active' | 'inactive';

export interface UserSummary {
  id: string;
  email: string;
  fullName: string | null;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SessionSummary {
  id: string;
  userId: string;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: string;
  expiresAt: string | null;
}
