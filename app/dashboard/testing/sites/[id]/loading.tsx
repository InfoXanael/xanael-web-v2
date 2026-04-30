export default function SiteDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-5 h-5 bg-gray-200 rounded mt-1" />
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded-md w-72 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-56" />
        </div>
        <div className="h-6 bg-gray-200 rounded-md w-16" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-md p-4 h-20" />
        ))}
      </div>
      <div className="flex gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-9 bg-gray-200 rounded-md w-28" />
        ))}
      </div>
      <div className="flex gap-1 border-b border-gray-200 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded-t-md w-32" />
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-md">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center px-5 py-4 border-b border-gray-100 gap-3 last:border-0">
            <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-48 mb-1" />
              <div className="h-3 bg-gray-100 rounded w-36" />
            </div>
            <div className="h-5 bg-gray-200 rounded-md w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
