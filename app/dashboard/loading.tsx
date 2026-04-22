export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-md p-5">
            <div className="w-5 h-5 bg-gray-200 rounded mb-3" />
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-7 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white border border-gray-200 rounded-md p-5 h-64" />
        <div className="bg-white border border-gray-200 rounded-md p-5 h-64" />
      </div>
    </div>
  );
}
