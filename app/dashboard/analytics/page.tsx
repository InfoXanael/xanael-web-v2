export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Analytics</h1>
      <p className="text-sm text-gray-500 mb-6">Datos en tiempo real de xanael.es</p>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <iframe
          src="https://analytics.xanael.es/xanael.es?embed=true&theme=light"
          width="100%"
          height="900"
          frameBorder={0}
          style={{ border: 0 }}
          scrolling="auto"
        />
      </div>
    </div>
  )
}
