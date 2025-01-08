import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import type { Profile } from '../types/supabase';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshSession = async () => {
    const { data: { session: newSession }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error refreshing session:', error);
      return;
    }
    if (newSession) {
      setSession(newSession);
      setUser(newSession.user);
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', newSession.user.id)
        .single();
      setProfile(profileData);
    }
  };

  useEffect(() => {
    refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('🔐 Auth Event:', event);
        console.log('📱 Session:', newSession);
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newSession.user.id)
            .single();
          console.log('👤 Profile Data:', profileData);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      return;
    }
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      signOut,
      refreshSession,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}