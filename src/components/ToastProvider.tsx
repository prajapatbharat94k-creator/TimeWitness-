'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}

// ─── Style Map ────────────────────────────────────────────────────────────────
const TOAST_STYLES: Record<ToastType, { border: string; icon: React.ReactNode; iconColor: string }> = {
  success: {
    border: 'border-[#D4AF37]/60',
    iconColor: 'text-[#D4AF37]',
    icon: <CheckCircle2 className="w-4 h-4 shrink-0" />,
  },
  error: {
    border: 'border-red-500/60',
    iconColor: 'text-red-400',
    icon: <XCircle className="w-4 h-4 shrink-0" />,
  },
  info: {
    border: 'border-[#334155]/80',
    iconColor: 'text-[#94A3B8]',
    icon: <Info className="w-4 h-4 shrink-0" />,
  },
};

// ─── Provider Component ───────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = `toast-${++counterRef.current}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const api: ToastContextValue = {
    success: (msg) => addToast('success', msg),
    error: (msg) => addToast('error', msg),
    info: (msg) => addToast('info', msg),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Toast Stack — bottom-right desktop, bottom-center mobile */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 items-end sm:items-end max-w-[calc(100vw-2rem)] sm:max-w-sm pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const style = TOAST_STYLES[toast.type];
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border ${style.border} bg-[#0D0D11]/95 backdrop-blur-xl shadow-2xl shadow-black/60 min-w-[240px] w-full`}
              >
                <span className={`mt-0.5 ${style.iconColor}`}>{style.icon}</span>
                <p className="text-sm text-[#E2E8F0] leading-snug flex-1">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="mt-0.5 text-[#4A5568] hover:text-[#94A3B8] transition-colors shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
