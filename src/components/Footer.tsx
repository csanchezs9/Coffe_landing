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
    <footer className="relative z-10 border-t border-white/5 bg-[#0d0a08]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-8 py-16 md:px-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.4em]">
              Nescafé
            </p>
            <p className="mt-4 text-sm opacity-70">
              Cada taza cuenta una historia. Del grano al ritual diario.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-80 transition hover:opacity-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs uppercase tracking-[0.3em] opacity-60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Nescafé. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:opacity-100">Instagram</a>
            <a href="#" className="transition hover:opacity-100">YouTube</a>
            <a href="#" className="transition hover:opacity-100">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
