const Integrations = () => {
  const integrations = [
    { name: 'Dineplan', status: 'In progress' },
    { name: 'FOMO', status: 'Planned' },
    { name: 'Google Calendar', status: 'Ready soon' },
    { name: 'Email parser', status: 'Testing' },
  ]

  return (
    <div className="min-h-screen bg-[#FCF6EF] px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-3xl shadow-2xl p-10 space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-600 font-semibold">
            Integrations
          </p>
          <h1 className="text-4xl font-['Season_Mix_TRIAL'] text-neutral-900">
            Connect your existing tools
          </h1>
          <p className="text-base text-neutral-600 font-['Geist']">
            We&rsquo;re building connectors so Caboo stays in sync with the systems you already use.
            Track progress and request early access here.
          </p>
        </div>

        <div className="space-y-4">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-4"
            >
              <div>
                <p className="text-lg font-['Season_Mix_TRIAL'] text-neutral-900">{item.name}</p>
                <p className="text-sm text-neutral-500">Status: {item.status}</p>
              </div>
              <button className="mt-4 sm:mt-0 rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-800 hover:border-brand-600 transition">
                Request access
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Integrations
