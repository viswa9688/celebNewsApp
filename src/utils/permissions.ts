import { UserRole, UserPermissions } from '../types/auth';

export const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'admin':
      return {
        canCreateNews: true,
        canEditNews: true,
        canDeleteNews: true,
        canManageUsers: true,
      };
    case 'editor':
      return {
        canCreateNews: true,
        canEditNews: true,
        canDeleteNews: false,
        canManageUsers: false,
      };
    case 'user':
    default:
      return {
        canCreateNews: false,
        canEditNews: false,
        canDeleteNews: false,
        canManageUsers: false,
      };
  }
};