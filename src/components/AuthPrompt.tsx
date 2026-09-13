'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hourglass, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function AuthPrompt({ 
  isOpen, 
  onClose,
  title = "Authentication Required",
  message = "Please sign in to access this feature and continue your historical journey."
}: AuthPromptProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#14141C] border border-[#242434] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#242434]">
                <div className="flex items-center gap-2">
                  <Hourglass className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-semibold text-[#F8FAFC]">TimeWitness</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#242434] text-[#94A3B8] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mb-4 mx-auto shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  <Hourglass className="w-6 h-6 text-[#D4AF37]" />
                </div>
                
                <h2 className="text-xl font-cinzel font-bold text-center text-[#F8FAFC] mb-2">
                  {title}
                </h2>
                <p className="text-center text-[#94A3B8] mb-6 text-sm">
                  {message}
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => { onClose(); router.push('/auth/signin'); }}
                    className="w-full py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A0A0E] font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    Sign In <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { onClose(); router.push('/auth/signup'); }}
                    className="w-full py-3 px-4 rounded-xl bg-[#1B1B26] border border-[#242434] hover:border-[#D4AF37]/50 text-[#F8FAFC] font-semibold transition-all"
                  >
                    Create an Account
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
