export default function SitesLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 bg-gray-200 rounded-md w-44 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
        <div className="h-9 bg-gray-200 rounded-md w-28" />
      </div>
      <div className="flex gap-3 mb-4">
        <div className="h-9 bg-gray-200 rounded-md w-44" />
        <div className="h-9 bg-gray-200 rounded-md w-44" />
      </div>
      <div className="bg-white border border-gray-200 rounded-md">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center px-5 py-4 border-b border-gray-100 gap-4 last:border-0">
            <div className="w-4 h-4 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-56 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-40" />
            </div>
            <div className="hidden sm:flex gap-4">
              <div className="h-3 bg-gray-100 rounded w-20" />
              <div className="h-3 bg-gray-100 rounded w-20" />
            </div>
            <div className="h-5 bg-gray-200 rounded-md w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
