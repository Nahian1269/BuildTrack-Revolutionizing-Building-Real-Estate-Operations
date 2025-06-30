import React from 'react';

function RajukDetails() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white text-gray-800 font-sans">
      <section className="py-20 px-6 bg-white text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">RAJUK Compliance & Approvals</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
          Navigate the complexities of RAJUK regulations with confidence. We ensure your projects meet all planning, zoning, and safety standards in Dhaka city.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          {[
            ['📄', 'Document Preparation', 'We help compile and validate all necessary blueprints, maps, and legal papers.'],
            ['🛠️', 'Code Compliance', 'Ensure your designs follow all updated RAJUK codes and building bylaws.'],
            ['✅', 'Approval Tracking', 'We monitor the status of your applications and speed up approvals.']
          ].map(([icon, title, desc], idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-3xl mb-4">{icon}</div>
              <h4 className="font-semibold text-xl mb-2">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RajukDetails;
