const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#FCF6EF] px-6 py-16">
      <div className="max-w-5xl mx-auto bg-white border border-neutral-200 rounded-3xl shadow-2xl p-10 space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-600 font-semibold">
            Overview
          </p>
          <h1 className="text-4xl font-['Season_Mix_TRIAL'] text-neutral-900">
            Dashboard
          </h1>
          <p className="text-base text-neutral-600 font-['Geist']">
            Bookings, reminders, and no-show prevention insights will live here. We&rsquo;re
            still wiring the intelligence layer—stay tuned.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {['Bookings captured', 'No-shows prevented', 'Customers reminded', 'Revenue saved'].map(
            (metric) => (
              <div key={metric} className="rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-5">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{metric}</p>
                <p className="mt-3 text-3xl font-['Season_Mix_TRIAL'] text-neutral-800">Coming soon</p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
