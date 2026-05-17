'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import HeroSequence from './HeroSequence';

type Chapter = {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  side: 'left' | 'right';
  meta: { label: string; value: string }[];
};

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    eyebrow: 'Origen',
    title: (
      <>
        Cada taza
        <br />
        <span className="italic text-[var(--accent)]">cuenta</span> una historia
      </>
    ),
    body:
      'Del grano cultivado en altura al ritual diario. Una experiencia que despierta los sentidos en cada sorbo.',
    side: 'left',
    meta: [
      { label: 'Altitud', value: '1.450 msnm' },
      { label: 'Región', value: 'Huila, CO' },
      { label: 'Variedad', value: '100% Arábica' },
    ],
  },
  {
    num: '02',
    eyebrow: 'Tueste',
    title: (
      <>
        Tierra que <span className="italic text-[var(--accent)]">despierta</span>
      </>
    ),
    body:
      'Caficultores que respetan el suelo y el tiempo. Tueste lento, perfil pleno, carácter inconfundible.',
    side: 'right',
    meta: [
      { label: 'Curva', value: '12 min' },
      { label: 'Tueste', value: 'Medio' },
      { label: 'Densidad', value: '720 g/l' },
    ],
  },
  {
    num: '03',
    eyebrow: 'Ritual',
    title: (
      <>
        El aroma que <span className="italic text-[var(--accent)]">queda</span>
      </>
    ),
    body:
      'Notas a cacao y caramelo, final cítrico. Cada sorbo, una pausa que enciende el día.',
    side: 'right',
    meta: [
      { label: 'Cuerpo', value: 'Sedoso' },
      { label: 'Acidez', value: 'Media' },
      { label: 'Notas', value: 'Cacao · Cítrico' },
    ],
  },
];

const TICKER = [
  'Café',
  'Origen',
  'Aroma',
  'Carácter',
  'Ritual',
  'Altitud',
  'Tueste',
  'Cacao',
  'Cítrico',
];

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);
  const progressLabelRef = useRef<HTMLSpanElement | null>(null);
  const bgNumberRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      rafRef.current = null;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(rect.height - vh, 1);
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const progress = passed / total;

      const ranges: [number, number][] = [
        [0.0, 0.34],
        [0.34, 0.66],
        [0.66, 1.0],
      ];

      let activeIdx = 0;
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const [start, end] = ranges[i];
        const span = end - start;
        const isFirst = i === 0;
        const isLast = i === ranges.length - 1;
        const enter = isFirst
          ? 1
          : smoothstep(start, start + span * 0.3, progress);
        const exit = isLast
          ? 0
          : smoothstep(end - span * 0.3, end, progress);
        const opacity = enter * (1 - exit);
        const ty = (1 - enter) * 24 - exit * 24;
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${ty}px)`;
        el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
        if (opacity > 0.5) activeIdx = i;
      });

      if (bgNumberRef.current) {
        const ch = CHAPTERS[activeIdx];
        if (bgNumberRef.current.dataset.num !== ch.num) {
          bgNumberRef.current.dataset.num = ch.num;
          bgNumberRef.current.textContent = ch.num;
        }
      }

      if (eyebrowRef.current) {
        eyebrowRef.current.style.opacity = String(
          1 - smoothstep(0.0, 0.12, progress),
        );
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(
          1 - smoothstep(0.0, 0.18, progress),
        );
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      if (progressLabelRef.current) {
        progressLabelRef.current.textContent =
          String(activeIdx + 1).padStart(2, '0') + ' / 03';
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', tick);
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', tick);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '210vh' }}
    >
      <HeroSequence />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Giant background chapter number */}
        <div
          ref={bgNumberRef}
          data-num="01"
          aria-hidden
          className="font-display pointer-events-none absolute -right-4 top-16 z-[1] select-none text-[28vw] font-bold leading-none text-black/[0.04] sm:-right-8 md:-right-12"
        >
          01
        </div>

        {/* Top bar: eyebrow + meta */}
        <div
          ref={eyebrowRef}
          className="pointer-events-none absolute left-6 right-6 top-24 z-20 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] opacity-80 transition-opacity sm:left-8 sm:right-8 sm:top-28 sm:text-[11px] md:left-16 md:right-16"
        >
          <span className="flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-[var(--accent)]" />
            Edición 2026 · Lote 042
          </span>
          <span className="hidden gap-6 md:flex">
            <span className="opacity-60">Lat 2.5358° N</span>
            <span className="opacity-60">Lon 75.5276° W</span>
            <span>Nescafé · Origen</span>
          </span>
        </div>

        {/* Left vertical rail */}
        <div className="pointer-events-none absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.5em] opacity-60 md:block">
          <span className="text-[var(--accent)]">●</span>{' '}
          Cosecha 24/25 — Trazabilidad
        </div>

        {/* Right vertical rail with progress index */}
        <div className="pointer-events-none absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.5em] opacity-70 md:block">
          <span ref={progressLabelRef}>01 / 03</span>
        </div>

        {/* Chapters */}
        {CHAPTERS.map((ch, i) => (
          <div
            key={i}
            className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center px-6 sm:px-8 md:px-16"
          >
          <div
            ref={(el) => {
              chapterRefs.current[i] = el;
            }}
            className={`w-full will-change-[transform,opacity] ${
              ch.side === 'left'
                ? 'md:max-w-[46%]'
                : 'md:ml-auto md:max-w-[46%] md:text-right'
            }`}
            style={{ opacity: 0 }}
          >
            <div
              className={`flex items-baseline gap-4 ${
                ch.side === 'right' ? 'md:justify-end' : ''
              }`}
            >
              <span className="font-display text-3xl font-bold text-[var(--accent)] md:text-5xl">
                {ch.num}
              </span>
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-70 sm:text-[11px]">
                <span className="inline-block h-px w-6 bg-[var(--accent)] align-middle" />{' '}
                {ch.eyebrow}
              </p>
            </div>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[0.95] sm:mt-6 sm:text-5xl md:text-7xl lg:text-[5.5rem]">
              {ch.title}
            </h1>
            <p
              className={`mt-6 max-w-md text-sm opacity-75 sm:text-base md:mt-8 md:text-lg ${
                ch.side === 'right' ? 'md:ml-auto' : ''
              }`}
            >
              {ch.body}
            </p>

            {/* Meta grid */}
            <dl
              className={`mt-8 grid max-w-md grid-cols-3 gap-4 md:mt-10 ${
                ch.side === 'right' ? 'md:ml-auto md:text-right' : ''
              }`}
            >
              {ch.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[9px] uppercase tracking-[0.3em] opacity-50 sm:text-[10px]">
                    {m.label}
                  </dt>
                  <dd className="mt-1 font-display text-base font-semibold sm:text-lg md:text-xl">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          </div>
        ))}

        {/* Bottom-left bean image with caption */}
        <div className="pointer-events-none absolute bottom-16 left-6 z-10 hidden items-end gap-4 md:flex md:bottom-20 md:left-16">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[var(--cream)] md:h-20 md:w-20">
            <Image
              src="/coffee-beans.png"
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="text-[10px] uppercase leading-relaxed tracking-[0.3em] opacity-70">
            <p className="font-semibold opacity-90">Grano selecto</p>
            <p className="opacity-60">Cosecha manual · pulpa fresca</p>
          </div>
        </div>

        {/* Bottom hint right */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-12 right-6 z-20 hidden items-center gap-4 transition-opacity md:flex md:bottom-16 md:right-16"
        >
          <p className="max-w-sm text-right text-xs uppercase tracking-[0.3em] opacity-60 md:text-sm">
            Desplázate · descubre el viaje
          </p>
          <span className="inline-block h-8 w-px bg-[var(--accent)]" />
        </div>

        {/* Bottom ticker */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-black/10 bg-[var(--background)]/80 py-2 backdrop-blur-sm">
          <div className="flex animate-[ticker_28s_linear_infinite] whitespace-nowrap text-[10px] uppercase tracking-[0.4em] opacity-70 sm:text-[11px]">
            {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="mx-6 flex items-center gap-6">
                {t}
                <span className="text-[var(--accent)]">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="pointer-events-none absolute bottom-9 left-0 right-0 z-20 h-px bg-black/10">
          <span
            ref={progressBarRef}
            className="block h-full origin-left bg-[var(--accent)]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  );
}
