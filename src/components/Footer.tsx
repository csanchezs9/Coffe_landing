'use client';

const COLUMNS = [
  {
    title: 'Producto',
    links: ['Origen', 'Tueste', 'Variedades', 'Sostenibilidad'],
  },
  {
    title: 'Compañía',
    links: ['Sobre nosotros', 'Prensa', 'Trabaja con nosotros'],
  },
  {
    title: 'Soporte',
    links: ['Contacto', 'FAQ', 'Términos', 'Privacidad'],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[var(--surface-dark)] text-[var(--surface-dark-text)]">
      <div className="mx-auto max-w-7xl px-8 py-16 md:px-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              Nescafé<span className="text-[var(--accent)]">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm opacity-70">
              Cada taza cuenta una historia. Del grano al ritual diario.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] opacity-70">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-75 transition hover:text-[var(--accent)] hover:opacity-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-[11px] uppercase tracking-[0.3em] opacity-70 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Nescafé. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-[var(--accent)]">Instagram</a>
            <a href="#" className="transition hover:text-[var(--accent)]">YouTube</a>
            <a href="#" className="transition hover:text-[var(--accent)]">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
