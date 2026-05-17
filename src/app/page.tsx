import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <section className="relative z-10 min-h-screen px-8 py-32 md:px-16">
        <div className="ml-auto max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">
            01 · El origen
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Del grano a tu taza
          </h2>
          <p className="mt-6 text-lg opacity-80">
            La taza queda anclada abajo a la izquierda mientras seguimos
            contando la historia. Aquí va el primer capítulo del recorrido
            del café.
          </p>
        </div>
      </section>
      <section className="relative z-10 min-h-screen px-8 py-32 md:px-16">
        <div className="ml-auto max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">
            02 · El tueste
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Aroma que despierta
          </h2>
        </div>
      </section>
    </main>
  );
}
