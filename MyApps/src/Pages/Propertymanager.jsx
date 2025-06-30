import React from 'react';

function ConstructionManager() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white text-gray-800 font-sans">
      {/* Hero */}
      <section className="bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            BuildTrack Construction Management
          </h1>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            High-performance construction management services tailored to deliver precision, transparency, and project excellence.
          </p>
          <div className="mt-10">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
              Get a Free Project Plan
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white"></div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes BuildTrack Different?</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            From groundbreaking to project delivery, we handle everything with structured workflows and precision tools.
          </p>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              ['📐', 'Smart Planning', 'We create intelligent Gantt timelines with forecast buffers and real-time adjustments.'],
              ['🏗️', 'On-Site Management', 'Certified managers supervise daily progress, subcontractors, and material flows.'],
              ['📊', 'Live Dashboards', 'Clients get real-time access to milestones, risks, and budget snapshots.'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
                <div className="text-4xl mb-4">{icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Focus Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://www.hashmicro.com/blog/wp-content/uploads/2022/10/Tools-16.jpg"
              alt="Construction site"
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Precision. Control. Delivery.</h3>
            <p className="text-gray-600 mb-4">
              BuildTrack empowers your vision with elite site professionals, advanced tools, and an obsession with quality.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Live construction reporting via app</li>
              <li>Budget alerts and resource automation</li>
              <li>Weekly photo & progress updates</li>
              <li>Transparent collaboration with architects & vendors</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-3xl font-semibold mb-4">Your Project, Handled with Care</h4>
          <p className="text-blue-100 mb-6">
            Ready to build with professionals who care about your outcomes as much as you do?
            Let’s create your construction roadmap today.
          </p>
          <button className="px-6 py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-100 transition">
            Schedule a Discovery Call
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConstructionManager;
