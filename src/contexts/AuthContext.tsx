'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase';
import { 
  getLocalAuthUser, 
  setLocalAuthUser, 
  clearLocalAuthUser,
  updateLocalProfile 
} from '@/lib/localStorage';

export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
  created_at: string;
}

interface AuthResult {
  error?: string;
}

interface AuthContextType {
  user: User | AuthUser | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<AuthResult>;
  signUp: (email: string, password?: string, name?: string) => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  forgotPassword: async () => ({}),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClient();
    
    if (supabase) {
      // Get initial session from Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          setLocalAuthUser({
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
            created_at: session.user.created_at,
          });
        } else {
          // Check local fallback
          const localUser = getLocalAuthUser();
          if (localUser) {
            setUser(localUser);
          }
        }
        setLoading(false);
      }).catch(() => {
        const localUser = getLocalAuthUser();
        if (localUser) setUser(localUser);
        setLoading(false);
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setLocalAuthUser({
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
            created_at: session.user.created_at,
          });
        } else {
          const localUser = getLocalAuthUser();
          setUser(localUser || null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Offline / Local storage fallback mode
      const localUser = getLocalAuthUser();
      if (localUser) {
        setUser(localUser);
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password?: string): Promise<AuthResult> => {
    const supabase = getSupabaseClient();
    if (supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          // If invalid login on supabase, check if offline fallback applies or return error
          return { error: error.message };
        }
        if (data.user) {
          setUser(data.user);
          setLocalAuthUser({
            id: data.user.id,
            email: data.user.email,
            user_metadata: data.user.user_metadata,
            created_at: data.user.created_at,
          });
          return {};
        }
      } catch (err: any) {
        // Fall back to local auth if Supabase has network/config failure
      }
    }

    // Local / Offline authentication fallback
    const localId = `usr_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const localUser: AuthUser = {
      id: localId,
      email,
      user_metadata: {
        full_name: email.split('@')[0],
      },
      created_at: new Date().toISOString(),
    };

    setLocalAuthUser(localUser);
    setUser(localUser);
    return {};
  };

  const signUp = async (email: string, password?: string, name?: string): Promise<AuthResult> => {
    const supabase = getSupabaseClient();
    const displayName = name || email.split('@')[0];

    if (supabase && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: displayName },
          },
        });
        if (error) {
          return { error: error.message };
        }
        if (data.user) {
          setUser(data.user);
          setLocalAuthUser({
            id: data.user.id,
            email: data.user.email,
            user_metadata: { full_name: displayName },
            created_at: data.user.created_at,
          });
          // Upsert profile in Supabase & locally
          await supabase.from('profiles').upsert({ id: data.user.id, name: displayName });
          updateLocalProfile(data.user.id, { name: displayName });
          return {};
        }
      } catch (err: any) {
        // Fall back to local
      }
    }

    // Local user registration
    const localId = `usr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const localUser: AuthUser = {
      id: localId,
      email,
      user_metadata: {
        full_name: displayName,
      },
      created_at: new Date().toISOString(),
    };

    setLocalAuthUser(localUser);
    updateLocalProfile(localId, { name: displayName });
    setUser(localUser);
    return {};
  };

  const forgotPassword = async (email: string): Promise<AuthResult> => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) return { error: error.message };
      } catch (err: any) {
        return { error: err.message };
      }
    }
    return {};
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Silent
      }
    }
    clearLocalAuthUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, forgotPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
