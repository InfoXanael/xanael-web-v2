export default function PipelineLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
      <div className="flex gap-3 mt-4 overflow-x-auto pb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[240px] md:w-72 bg-white border border-gray-200 rounded-md flex flex-col max-h-[calc(100vh-180px)]"
          >
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-6" />
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded-md" />
            </div>
            <div className="flex-1 p-2 space-y-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-3 bg-gray-200 rounded w-10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
