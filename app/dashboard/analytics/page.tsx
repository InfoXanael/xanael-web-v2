export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Analytics</h1>
      <p className="text-sm text-gray-500 mb-6">Datos en tiempo real de xanael.es</p>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <iframe
          plausible-embed=""
          src="https://analytics.xanael.es/share/xanael.es?auth=4SOjY56Mn9STP3tIQ6DVF&embed=true&theme=light"
          scrolling="no"
          frameBorder={0}
          loading="lazy"
          style={{ width: "1px", minWidth: "100%", height: "1600px" }}
        />
      </div>
      <script async src="https://analytics.xanael.es/js/embed.host.js" />
    </div>
  )
}
