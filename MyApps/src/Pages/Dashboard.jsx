import React from 'react'

function Dashboard() {
 return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Real-Time Project Dashboard</h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Get full visibility on your construction progress, risks, and financials with our intuitive dashboard.
        </p>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          {[
            ['📍', 'Live Site Status', 'Track location-specific activity and worker logs.'],
            ['💰', 'Budget Usage', 'Visual breakdown of expenses, projections, and overruns.'],
            ['⏱️', 'Timeline Forecasts', 'AI-based delay detection and timeline recalibration.']
          ].map(([icon, title, desc], i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4">{icon}</div>
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard ; 