import { makeRedirectUri } from 'expo-auth-session';

export type UserRole = 'user' | 'editor' | 'admin';

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  updated_at: string;
}

export interface UserPermissions {
  canCreateNews: boolean;
  canEditNews: boolean;
  canDeleteNews: boolean;
  canManageUsers: boolean;
}

