import { Shield, Leaf, Eye, Target } from "lucide-react";

const features = [
  {
    Icon: Shield,
    title: "Seguridad",
    description: "Acceso técnico controlado. Sin exposición de cebos en la vía pública.",
  },
  {
    Icon: Leaf,
    title: "Sostenibilidad",
    description: "Minimiza el uso de rodenticidas y el impacto ambiental.",
  },
  {
    Icon: Eye,
    title: "Discreción",
    description: "Integrado en el viario urbano sin alterar el espacio público.",
  },
  {
    Icon: Target,
    title: "Prevención",
    description: "Puntos permanentes de vigilancia e intervención temprana en superficie.",
  },
];

export default function FeaturesStrip() {
  return (
    <section className="relative z-10 -mt-[88px] px-0 pb-12">
      <div
        className="relative max-w-[1500px] mx-auto rounded-md overflow-hidden shadow-xl bg-cover bg-center"
        style={{ backgroundImage: "url('/images/textura-hormigon.webp')" }}
      >
        <div className="absolute inset-0 bg-[#3d7a5f]/90" />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-3 px-7 py-8">
              <f.Icon className="w-6 h-6 text-white/80" strokeWidth={1.5} />
              <h3 className="text-white font-bold text-base">{f.title}</h3>
              <p className="text-white/75 text-[0.875rem] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
