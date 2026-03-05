export default function SurfaceSection() {
  return (
    <section className="py-24 bg-[#F0F4F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="-mt-24">
            <h2 className="text-4xl font-bold text-[#1A4A3A] leading-tight">
              ¿Puede la superficie urbana<br />estar protegida?
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              El problema es real. El crecimiento de las poblaciones de plagas es imparable sin una respuesta estructural.
            </p>
          </div>

          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/W5kCJD-gE5k?rel=0"
              title="Xanael - Superficie urbana protegida"
              allow="encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
