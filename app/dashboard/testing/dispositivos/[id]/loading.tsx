export default function DispositivoDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-5 h-5 bg-gray-200 rounded mt-1" />
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded-md w-64 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-80" />
        </div>
        <div className="h-6 bg-gray-200 rounded-md w-16" />
      </div>
      <div className="flex gap-1 border-b border-gray-200 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded-t-md w-28" />
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-md">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex px-5 py-3 border-b border-gray-100 gap-4 last:border-0">
            <div className="h-4 bg-gray-200 rounded w-36 flex-shrink-0" />
            <div className="h-4 bg-gray-100 rounded flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
