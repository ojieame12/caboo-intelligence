const StoreInfo = () => {
  return (
    <div className="min-h-screen bg-[#FCF6EF] px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-3xl shadow-2xl p-10 space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-600 font-semibold">
            Restaurant profile
          </p>
          <h1 className="text-4xl font-['Season_Mix_TRIAL'] text-neutral-900">Store information</h1>
          <p className="text-base text-neutral-600 font-['Geist']">
            Business hours, notification preferences, and table capacity controls will live here.
            We&rsquo;re finishing the data model; for now this page is a preview.
          </p>
        </div>
        <div className="grid gap-5">
          <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Business hours</p>
            <p className="mt-2 text-lg font-['Season_Mix_TRIAL'] text-neutral-800">Setup pending</p>
          </div>
          <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Notification team</p>
            <p className="mt-2 text-lg font-['Season_Mix_TRIAL'] text-neutral-800">Add managers soon</p>
          </div>
          <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Capacity rules</p>
            <p className="mt-2 text-lg font-['Season_Mix_TRIAL'] text-neutral-800">Auto-confirm windows coming</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreInfo
