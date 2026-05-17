'use client';

import HeroSequence from './HeroSequence';

export default function Hero() {
  return (
    <section className="relative w-full" style={{ height: '300vh' }}>
      <HeroSequence />
      <div className="pointer-events-none sticky top-0 z-10 flex h-screen flex-col justify-between px-6 pb-8 pt-28 sm:px-8 sm:pt-32 md:px-16 md:pb-16">
        <div className="md:max-w-2xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] opacity-70 sm:text-[11px]">
            <span className="inline-block h-px w-8 bg-[var(--accent)]" />
            Edición 2026
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold leading-[0.95] sm:mt-6 sm:text-5xl md:text-7xl lg:text-8xl">
            Cada taza
            <br />
            <span className="italic text-[var(--accent)]">cuenta</span> una historia
          </h1>
          <p className="mt-6 max-w-md text-sm opacity-75 sm:text-base md:mt-8 md:text-lg">
            Del grano cultivado en altura al ritual diario. Una experiencia que
            despierta los sentidos.
          </p>
        </div>
        <div className="hidden flex-col items-end gap-4 md:flex md:flex-row md:items-center md:justify-end">
          <p className="max-w-sm text-right text-xs uppercase tracking-[0.3em] opacity-60 md:text-sm">
            Desplázate para descubrir el viaje del grano
          </p>
          <span className="inline-block h-8 w-px bg-[var(--accent)]" />
        </div>
      </div>
    </section>
  );
}
