const Billing = () => {
  return (
    <div className="min-h-screen bg-[#FCF6EF] px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-3xl shadow-2xl p-10 space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-600 font-semibold">Billing</p>
          <h1 className="text-4xl font-['Season_Mix_TRIAL'] text-neutral-900">Manage your plan</h1>
          <p className="text-base text-neutral-600 font-['Geist']">
            Update payment method, download invoices, or change plans. Stripe portal integration is
            on the way—this screen is ready for when it lands.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Current plan</p>
          <p className="mt-3 text-2xl font-['Season_Mix_TRIAL'] text-neutral-800">R599 / month</p>
          <p className="mt-2 text-sm text-neutral-500">Unlimited bookings • Automatic reminders • WhatsApp support</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-full bg-brand-600 text-white px-6 py-3 font-semibold hover:bg-brand-700 transition">
            Update payment method
          </button>
          <button className="rounded-full border border-neutral-300 px-6 py-3 font-semibold text-neutral-800 hover:border-neutral-400 transition">
            Download invoices
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billing
