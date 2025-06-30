import React from 'react';
import { BarChart2, Repeat, ShieldCheck, TrendingUp } from 'lucide-react';

function FinancePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter antialiased">

      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 text-center bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            Finance & Budget <span className="text-blue-600">Oversight</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Gain unparalleled financial control over your construction projects with real-time tracking,
            predictive budgeting, and streamlined disbursement workflows.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1">
            Discover More
          </button>
        </div>
      </section>


      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 text-left">
      
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 ease-in-out group">
              <div className="text-blue-600 mb-6 flex justify-center items-center rounded-full bg-blue-50 w-16 h-16 text-3xl group-hover:bg-blue-100 transition">
                <BarChart2 size={36} strokeWidth={2.5} /> 
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Cost Breakdown</h3>
              <p className="text-gray-600 leading-relaxed">
                Access detailed cost analyses, monitor expense categories, and proactively identify
                budget variances to keep your projects on track.
              </p>
            </div>

      
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 ease-in-out group">
              <div className="text-blue-600 mb-6 flex justify-center items-center rounded-full bg-blue-50 w-16 h-16 text-3xl group-hover:bg-blue-100 transition">
                <Repeat size={36} strokeWidth={2.5} /> 
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Payment Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">
                Automate payment flows for contractors, suppliers, and bank releases with full
                transparency and timely execution.
              </p>
            </div>

   
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 ease-in-out group">
              <div className="text-blue-600 mb-6 flex justify-center items-center rounded-full bg-blue-50 w-16 h-16 text-3xl group-hover:bg-blue-100 transition">
                <ShieldCheck size={36} strokeWidth={2.5} /> 
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Audit & Compliance</h3>
              <p className="text-gray-600 leading-relaxed">
                Maintain impeccable financial records, meticulously track invoices, and generate
                audit-ready reports with unparalleled ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white shadow-sm mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900">
            Real-time Financial <span className="text-blue-600">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Visualize your financial health with interactive dashboards and customizable reports,
            giving you a clear overview of your project's performance.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
      
            <div className="bg-gray-100 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center h-80">
              <TrendingUp size={64} className="text-blue-400 mb-4" />
              <p className="text-gray-500 text-xl font-medium">Projected vs. Actual Spend</p>
              <p className="text-gray-400 text-sm mt-2">Interactive Chart Placeholder</p>
            </div>
        
            <div className="bg-gray-100 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center h-80">
              <BarChart2 size={64} className="text-green-400 mb-4" />
              <p className="text-gray-500 text-xl font-medium">Expense Category Breakdown</p>
              <p className="text-gray-400 text-sm mt-2">Dynamic Data Visualization</p>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-gradient-to-r from-blue-800 to-blue-600 py-16 md:py-20 text-white text-center rounded-t-3xl shadow-inner mt-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">Stay Ahead of Financial Surprises</h3>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            From meticulous day-one forecasting to comprehensive post-handover audits, BuildTrack
            empowers you with financial precision at every stage of your project lifecycle.
          </p>
          <button className="px-8 py-4 bg-white text-blue-800 font-bold rounded-xl shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out transform hover:-translate-y-1">
            Request Live Demo
          </button>
        </div>
      </section>
    </div>
  );
}

export default FinancePage;

