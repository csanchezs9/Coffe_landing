import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <section
        id="origen"
        className="relative z-10 min-h-screen px-8 py-32 md:px-16"
      >
        <div className="ml-auto max-w-xl">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] opacity-70">
            <span className="text-[var(--accent)]">01</span>
            <span className="inline-block h-px w-6 bg-[var(--accent)]" />
            El origen
          </p>
          <h2 className="font-display mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Del grano <span className="italic text-[var(--accent)]">a tu taza</span>
          </h2>
          <p className="mt-6 text-lg opacity-80">
            La taza queda anclada abajo a la izquierda mientras seguimos
            contando la historia. Aquí va el primer capítulo del recorrido
            del café.
          </p>
        </div>
      </section>
      <section
        id="tueste"
        className="relative z-10 min-h-screen px-8 py-32 md:px-16"
      >
        <div className="ml-auto max-w-xl">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] opacity-70">
            <span className="text-[var(--accent)]">02</span>
            <span className="inline-block h-px w-6 bg-[var(--accent)]" />
            El tueste
          </p>
          <h2 className="font-display mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Aroma que <span className="italic text-[var(--accent)]">despierta</span>
          </h2>
          <p className="mt-6 text-lg opacity-80">
            Tueste medio. Notas a cacao, caramelo y un final cítrico que se
            queda contigo toda la mañana.
          </p>
        </div>
      </section>
    </main>
  );
}
