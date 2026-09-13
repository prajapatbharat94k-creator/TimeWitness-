import React from 'react';
import { Metadata } from 'next';
import AuthForm from '../AuthForm';

export const metadata: Metadata = {
  title: 'Sign Up | TimeWitness',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0A0A0E] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <AuthForm type="signup" />
    </div>
  );
}
