export const GOOGLE_AUTH = {
  CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  SCHEME: process.env.EXPO_PUBLIC_APP_SCHEME,
  REDIRECT_URI: `${process.env.EXPO_PUBLIC_APP_SCHEME}://auth-callback`
}; 