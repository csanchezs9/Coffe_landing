'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCup } from './CupContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: cupRef, ready } = useCup();

  useLayoutEffect(() => {
    if (!ready || !cupRef.current || !sectionRef.current) return;
    const cup = cupRef.current;

    cup.position.set(1.7, 0.9, 0);
    cup.rotation.set(0.15, -0.6, -0.2);
    cup.scale.setScalar(1);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        cup.position,
        { x: -1.7, y: -0.9, z: 0.4, ease: 'none' },
        0,
      ).to(
        cup.rotation,
        { x: 0.05, y: -0.6 + Math.PI * 2, z: 0.25, ease: 'none' },
        0,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, cupRef]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="relative z-10 flex h-full flex-col justify-between px-8 pb-8 pt-28 md:px-16 md:pb-16 md:pt-32">
        <div>
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] opacity-70">
            <span className="inline-block h-px w-8 bg-[var(--accent)]" />
            Edición 2026
          </p>
          <h1 className="font-display mt-6 max-w-3xl text-6xl font-bold leading-[0.95] md:text-8xl">
            Cada taza
            <br />
            <span className="italic text-[var(--accent)]">cuenta</span> una historia
          </h1>
          <p className="mt-8 max-w-md text-base opacity-75 md:text-lg">
            Del grano cultivado en altura al ritual diario. Una experiencia que
            despierta los sentidos.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 self-end md:flex-row md:items-center">
          <p className="max-w-sm text-right text-xs uppercase tracking-[0.3em] opacity-60 md:text-sm">
            Desplázate para descubrir el viaje del grano
          </p>
          <span className="inline-block h-8 w-px bg-[var(--accent)]" />
        </div>
      </div>
    </section>
  );
}
