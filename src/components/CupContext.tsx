'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react';
import type { Group } from 'three';

type CupCtx = {
  ref: RefObject<Group | null>;
  ready: boolean;
  setReady: Dispatch<SetStateAction<boolean>>;
};

const CupContext = createContext<CupCtx | null>(null);

export function CupProvider({ children }: { children: ReactNode }) {
  const ref = useRef<Group | null>(null);
  const [ready, setReady] = useState(false);
  return (
    <CupContext.Provider value={{ ref, ready, setReady }}>
      {children}
    </CupContext.Provider>
  );
}

export function useCup() {
  const ctx = useContext(CupContext);
  if (!ctx) throw new Error('useCup must be used inside CupProvider');
  return ctx;
}
