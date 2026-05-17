'use client';

import Link from 'next/link';

const NAV = [
  { href: '#origen', label: 'Origen' },
  { href: '#tueste', label: 'Tueste' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-[var(--surface-dark)]/90 text-[var(--surface-dark-text)] border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 md:px-16">
        <Link
          href="/"
          aria-label="Nescafé"
          className="logo-wrap group relative flex items-center gap-3"
        >
          <span className="relative inline-block h-[60px] w-[60px]">
            <span className="steam steam-1" />
            <span className="steam steam-2" />
            <span className="steam steam-3" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/coffe.png"
              alt=""
              width={60}
              height={60}
              className="logo-mark h-[60px] w-[60px] object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Nescafé<span className="text-[var(--accent)]">.</span>
          </span>
        </Link>
        <nav className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.28em] md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative opacity-75 transition hover:opacity-100 hover:text-[var(--accent)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
