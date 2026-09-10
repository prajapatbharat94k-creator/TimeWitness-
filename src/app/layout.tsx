import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';
import { AppContextProvider } from '@/context/AppContext';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'TimeWitness | Historical AI Engine — Indian & World History',
  description: 'AI-Powered Cinematic Historical Time Machine. Relive historical moments with verified primary sources, audio atmospheres, and visual recreations across Indian and World history.',
  keywords: ['History', 'AI', 'Time Witness', 'Indian History', 'World History', 'Shivaji Maharaj', 'Napoleon', 'Cleopatra', '1857', 'Ashoka', 'Historical Events'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0D0D11] text-[#94A3B8] antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
        <AppContextProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
