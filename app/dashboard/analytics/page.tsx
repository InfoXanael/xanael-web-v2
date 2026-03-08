export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-6">Analytics</h1>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/20355340-a063-4e26-a501-a2e56169e008"
          width="100%"
          height="800"
          frameBorder={0}
          style={{ border: 0 }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  )
}
