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
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">
            Edición 2026
          </p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight md:text-7xl">
            Cada taza
            <br />
            cuenta una historia
          </h1>
        </div>
        <p className="max-w-sm self-end text-right text-sm opacity-60 md:text-base">
          Desplázate para descubrir el viaje del grano.
        </p>
      </div>
    </section>
  );
}
