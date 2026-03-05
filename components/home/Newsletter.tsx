"use client";

export default function Newsletter() {
  return (
    <section className="bg-[#2D6A4F] pb-32">
      <div className="px-6 sm:px-10 lg:px-20">
        <div className="h-[1px] bg-white/20 mb-12" />
        <h3 className="text-lg font-semibold text-white">Mantente informado</h3>
        <p className="mt-2 text-sm text-white/70">
          Recibe las últimas novedades en tu correo
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 flex flex-col sm:flex-row gap-4 max-w-lg"
        >
          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 bg-transparent border border-white/30 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/60 transition-colors"
          />
          <button
            type="submit"
            className="bg-white text-[#2D6A4F] font-semibold text-sm px-6 py-2.5 rounded-md hover:bg-white/90 transition-colors shrink-0"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  );
}
