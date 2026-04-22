export default function MauticLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-24 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-md p-5">
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-7 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-5 h-64" />
    </div>
  );
}
