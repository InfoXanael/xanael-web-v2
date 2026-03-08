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
              El problema es real. Las ciudades llevan décadas actuando en dos capas: el subsuelo y el interior de los edificios. Pero existe una tercera capa donde las plagas emergen, se desplazan y encuentran alimento: <strong className="text-[#1A4A3A]">la superficie urbana.</strong>
            </p>
          </div>

          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/ztZ8FHfuzbQ?rel=0"
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
