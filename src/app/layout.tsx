import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from './Providers';

export const viewport: Viewport = {
  themeColor: '#0D0D11',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://timewitness.ai'),
  title: {
    default: 'TimeWitness — Witness History As It Happened',
    template: '%s | TimeWitness',
  },
  description: 'AI-Powered Historical Experience & Reconstruction Platform. Step into primary-source grounded historical moments across civilisations.',
  keywords: [
    'History', 'AI Historical Research', 'Time Machine', 'Shivaji Maharaj', 
    'Napoleon', 'Rani Lakshmibai', '1857 Revolution', 'Ancient History', 
    'Living History', 'Primary Sources', 'Multilingual History'
  ],
  authors: [{ name: 'TimeWitness Historical Archive' }],
  creator: 'TimeWitness',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timewitness.ai',
    title: 'TimeWitness | Witness History As It Happened',
    description: 'AI-Powered Cinematic Historical Time Machine. Reconstruct and experience verified historical epochs with audio and dialogue.',
    siteName: 'TimeWitness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeWitness | Witness History As It Happened',
    description: 'Relive historical moments with verified primary sources, audio atmospheres, and visual recreations.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0D0D11] text-[#94A3B8] antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFF3C4]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
