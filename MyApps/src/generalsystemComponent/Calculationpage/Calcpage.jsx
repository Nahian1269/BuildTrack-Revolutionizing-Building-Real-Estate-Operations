import FlatClaculator from "../Flatcalc/FlatClaculator";
import Constcalc from "../ConstCalc/Constcalc";
import Calculate from "../Calculator/Calculate";
import NotePad from "../Note/NotePad";
import { Outlet } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  Building,
  Hammer,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

const Calcpage = () => {
  return (
    <div className="flex justify-end">
 <div className="flex ">
      <div className="">
        <section className="text-center py-12 mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                {" "}
                Construction{" "}
              </span>
              Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Calculate construction and flat costs with precision. Get accurate
              estimates, track your calculations, and make informed decisions
              for your projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/construction"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <Hammer className="h-5 w-5" />
                <span>Construction Calculator</span>
              </Link>
              <Link
                to="/flat"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <Building className="h-5 w-5" />
                <span>Flat Calculator</span>
              </Link>
            </div>
          </div>
          <div>
          </div>
        </section>
      </div>
      <div className="">
        <div className="flex justify-end ">
          <Calculate></Calculate>
        </div>
        <div className="flex justify-end">
          <NotePad></NotePad>
        </div>
      </div>
    </div>


    </div>
   
  );
};

export default Calcpage;
