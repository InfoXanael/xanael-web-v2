export default function PipelineLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-28 mb-4" />
      <div className="flex gap-4 overflow-x-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-md"
          >
            <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-100 rounded w-6" />
            </div>
            <div className="p-2 space-y-2">
              {[...Array(i % 2 === 0 ? 3 : 2)].map((_, j) => (
                <div key={j} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-16" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
