export default function PipelineLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
      <div className="flex gap-3 mt-4 overflow-x-auto pb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[240px] md:w-72 bg-white border border-gray-200 rounded-md"
          >
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            <div className="p-2 space-y-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
