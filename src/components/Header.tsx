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
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-[#0d0a08]/40 border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 md:px-16">
        <Link
          href="/"
          aria-label="Nescafé"
          className="logo-wrap group relative flex items-center gap-3"
        >
          <span className="relative inline-block h-10 w-10">
            <span className="steam steam-1" />
            <span className="steam steam-2" />
            <span className="steam steam-3" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/coffe.png"
              alt=""
              width={40}
              height={40}
              className="logo-mark h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.4em]">
            Nescafé
          </span>
        </Link>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.3em] md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="opacity-70 transition hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] transition hover:bg-white/10"
        >
          Comprar
        </a>
      </div>
    </header>
  );
}
