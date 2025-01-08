import { makeRedirectUri } from 'expo-auth-session';

export const AUTH_CONFIG = {
  redirectUrl: makeRedirectUri({
    path: 'auth/callback',
  }),
  providers: {
    google: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  },
}; 