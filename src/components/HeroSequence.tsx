'use client';

import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 90;
const FRAME_PATH = (i: number) =>
  `/hero-frames/frame_${String(i).padStart(4, '0')}.png`;

// Position path in viewport units. 0 = start (top-right), 1 = end (bottom-left)
const START = { xVw: 70, yVh: 8 };
const END   = { xVw: 8,  yVh: 42 };
const CUP_VH = 55;

export default function HeroSequence() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(-1);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    sectionRef.current =
      (wrapperRef.current?.closest('section') as HTMLElement | null) ?? null;
  }, []);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let cancelled = false;
    let count = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (cancelled) return;
        count++;
        setLoaded(count);
        if (count === 1) drawFrame(0);
      };
      imgs[i - 1] = img;
    }
    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[idx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    const tick = () => {
      rafRef.current = null;
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      if (!section || !wrapper) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(rect.height - vh, 1);
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const progress = passed / total; // 0..1

      // Frame index: linear with progress (3 rotations baked into 90 frames)
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
      );
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        drawFrame(idx);
      }

      // Position: lerp from START to END across progress
      const xVw = START.xVw + (END.xVw - START.xVw) * progress;
      const yVh = START.yVh + (END.yVh - START.yVh) * progress;
      wrapper.style.transform = `translate(${xVw}vw, ${yVh}vh)`;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(tick);
    };
    const onResize = () => {
      drawFrame(Math.max(0, currentFrameRef.current));
      tick();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={wrapperRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${CUP_VH}vh`,
            height: `${CUP_VH}vh`,
            willChange: 'transform',
          }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ display: 'block' }}
          />
        </div>
        {loaded < FRAME_COUNT && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] opacity-40">
            cargando {Math.round((loaded / FRAME_COUNT) * 100)}%
          </div>
        )}
      </div>
    </div>
  );
}
