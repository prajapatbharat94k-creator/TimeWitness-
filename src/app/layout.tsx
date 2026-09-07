import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TimeWitness | Witness History As It Happened',
  description: 'AI-Powered Cinematic Historical Time Machine. Relive historical moments with verified primary sources, audio atmospheres, and visual recreations.',
  keywords: ['History', 'AI', 'Time Witness', 'Shivaji Maharaj', 'Napoleon', 'Cleopatra', '1857', 'Historical Events'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0D0D11] text-[#94A3B8] antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
        {children}
      </body>
    </html>
  );
}
