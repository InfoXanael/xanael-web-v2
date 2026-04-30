export default function TestingLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 bg-gray-200 rounded-md w-40" />
        <div className="flex gap-2">
          <div className="h-9 bg-gray-200 rounded-md w-28" />
          <div className="h-9 bg-gray-200 rounded-md w-24" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-md p-5 h-24" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-11 bg-white border border-gray-200 rounded-md" />
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-md">
        <div className="px-5 py-4 border-b border-gray-100 h-14" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center px-5 py-4 border-b border-gray-100 gap-4 last:border-0">
            <div className="h-4 bg-gray-200 rounded w-48" />
            <div className="flex-1" />
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-5 bg-gray-200 rounded-md w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
