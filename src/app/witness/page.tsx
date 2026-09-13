'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Hourglass } from 'lucide-react';

function WitnessRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const topic = searchParams.get('topic') || searchParams.get('witness') || searchParams.get('q');
    if (topic) {
      router.replace(`/?witness=${encodeURIComponent(topic)}`);
    } else {
      router.replace('/explore');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0D0D11] flex flex-col items-center justify-center gap-3">
      <Hourglass className="w-8 h-8 text-[#D4AF37] animate-pulse-slow" />
      <p className="text-xs font-mono text-[#64748B] tracking-widest uppercase">Targeting Temporal Coordinates...</p>
    </div>
  );
}

export default function WitnessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0D11] flex items-center justify-center">
        <Hourglass className="w-8 h-8 text-[#D4AF37] animate-pulse-slow" />
      </div>
    }>
      <WitnessRedirect />
    </Suspense>
  );
}
