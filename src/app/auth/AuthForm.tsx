'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Hourglass, Mail, Lock, User as UserIcon, ArrowRight, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import Link from 'next/link';

interface AuthFormProps {
  type: 'signin' | 'signup' | 'forgot-password';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { signIn, signUp, forgotPassword } = useAuth();

  useEffect(() => {
    document.title = type === 'signin' 
      ? 'Sign In | TimeWitness' 
      : type === 'signup' 
      ? 'Create Account | TimeWitness' 
      : 'Reset Password | TimeWitness';
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === 'signup') {
        if (!email.trim() || !password.trim()) {
          toast.error('Please fill in all required fields.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          toast.error('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }

        const res = await signUp(email.trim(), password, name.trim());
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Account created successfully! Welcome to TimeWitness.');
          router.push('/dashboard');
        }
      } else if (type === 'signin') {
        if (!email.trim() || !password.trim()) {
          toast.error('Please enter your email and password.');
          setLoading(false);
          return;
        }

        const res = await signIn(email.trim(), password);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Welcome back to TimeWitness!');
          router.push('/dashboard');
        }
      } else if (type === 'forgot-password') {
        if (!email.trim()) {
          toast.error('Please enter your email address.');
          setLoading(false);
          return;
        }

        const res = await forgotPassword(email.trim());
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Password reset instructions sent to your email.');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#14141C]/90 backdrop-blur-xl border border-[#242434] rounded-2xl p-8 shadow-2xl relative z-10">
      {/* Back to Home Link */}
      <div className="mb-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#D4AF37] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Explore Public History</span>
        </Link>
        <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
          Chronos Auth
        </span>
      </div>

      <div className="flex justify-center mb-6">
        <Link href="/" className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-105 transition-transform">
          <Hourglass className="w-6 h-6 text-[#D4AF37]" />
        </Link>
      </div>
      
      <h2 className="text-2xl font-cinzel font-bold text-center text-[#F8FAFC] mb-2">
        {type === 'signin' ? 'Welcome Back' : type === 'signup' ? 'Join TimeWitness' : 'Reset Password'}
      </h2>
      <p className="text-sm text-center text-[#94A3B8] mb-8">
        {type === 'signin' ? 'Continue your journey through history.' : type === 'signup' ? 'Create an account to save your historical experiences.' : 'Enter your email to receive a reset link.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#94A3B8] ml-1">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 pl-10 pr-4 text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-sm"
                placeholder="Historian Name"
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#94A3B8] ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 pl-10 pr-4 text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-sm"
              placeholder="name@example.com"
            />
          </div>
        </div>

        {type !== 'forgot-password' && (
          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-semibold text-[#94A3B8]">Password</label>
              {type === 'signin' && (
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-[#D4AF37] hover:text-[#FFF3C4] transition-colors"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A0A0E] border border-[#242434] rounded-xl py-3 pl-10 pr-11 text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#94A3B8] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold py-3 px-4 rounded-xl transition-all mt-6 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {type === 'signin' ? 'Sign In' : type === 'signup' ? 'Create Account' : 'Send Reset Link'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-[#94A3B8]">
        {type === 'signin' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-[#D4AF37] font-semibold hover:underline">
              Sign Up
            </Link>
          </>
        ) : type === 'signup' ? (
          <>
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-[#D4AF37] font-semibold hover:underline">
              Sign In
            </Link>
          </>
        ) : (
          <Link href="/auth/signin" className="text-[#D4AF37] font-semibold hover:underline">
            Back to Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
