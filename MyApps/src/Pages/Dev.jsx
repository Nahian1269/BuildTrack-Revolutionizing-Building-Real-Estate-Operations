import React from 'react';
import { Layers, Users, Layout, Workflow } from 'lucide-react'; 

function Developers() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter antialiased">
   
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 text-center bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Solutions</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            From land acquisition to post-construction handover, our platform supports developers with
            modern tools and end-to-end project visibility, empowering success at every stage.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Learn More
          </button>
        </div>
      </section>


      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 text-left">
    
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 ease-in-out group">
              <div className="text-purple-600 mb-6 flex justify-center items-center rounded-full bg-purple-50 w-16 h-16 text-3xl group-hover:bg-purple-100 transition">
                <Layers size={36} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Project Lifecycle Tools</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage the entire development process, from pre-feasibility studies to final delivery,
                with comprehensive tools at your fingertips.
              </p>
            </div>

       
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 ease-in-out group">
              <div className="text-purple-600 mb-6 flex justify-center items-center rounded-full bg-purple-50 w-16 h-16 text-3xl group-hover:bg-purple-100 transition">
                <Users size={36} strokeWidth={2.5} /> 
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Investor Reporting</h3>
              <p className="text-gray-600 leading-relaxed">
                Automate the generation of detailed reports for stakeholders and investors, ensuring
                transparency and trust.
              </p>
            </div>

            {/* Feature Card 3: Design Reviews */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 ease-in-out group">
              <div className="text-purple-600 mb-6 flex justify-center items-center rounded-full bg-purple-50 w-16 h-16 text-3xl group-hover:bg-purple-100 transition">
                <Layout size={36} strokeWidth={2.5} /> {/* Lucide icon for design reviews */}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Design Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Facilitate real-time collaboration with architects and engineers on design reviews,
                streamlining feedback and approvals.
              </p>
            </div>
          </div>
        </div>
      </section>

  
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white shadow-sm mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900">
            Integrated Workflow <span className="text-purple-600">Visualization</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Gain a holistic view of your development processes with intuitive visualizations,
            mapping key milestones and dependencies for seamless execution.
          </p>
          <div className="bg-gray-100 p-8 rounded-2xl shadow-inner flex flex-col items-center justify-center h-96">
            <Workflow size={96} className="text-purple-400 mb-6" />
            <p className="text-gray-500 text-2xl font-medium">Your Project Workflow Here</p>
            <p className="text-gray-400 text-base mt-2">Interactive Diagram Placeholder</p>
          </div>
        </div>
      </section>

    
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 py-16 md:py-20 text-white text-center rounded-t-3xl shadow-inner mt-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">Empower Your Development Projects</h3>
          <p className="text-purple-100 text-lg mb-8 leading-relaxed">
            Equip your team with cutting-edge tools that streamline workflows, enhance collaboration,
            and provide unparalleled insights into every project phase.
          </p>
          <button className="px-8 py-4 bg-white text-purple-800 font-bold rounded-xl shadow-lg hover:bg-purple-100 transition duration-300 ease-in-out transform hover:-translate-y-1">
            Request a Developer Demo
          </button>
        </div>
      </section>
    </div>
  );
}

export default Developers;

