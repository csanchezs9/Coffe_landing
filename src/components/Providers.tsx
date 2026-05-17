'use client';

import type { ReactNode } from 'react';
import { CupProvider } from './CupContext';
import SmoothScroll from './SmoothScroll';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CupProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </CupProvider>
  );
}
