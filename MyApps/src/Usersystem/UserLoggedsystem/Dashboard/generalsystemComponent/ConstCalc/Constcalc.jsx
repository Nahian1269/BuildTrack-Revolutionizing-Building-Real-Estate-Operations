import React, { useState } from 'react';
import { Hammer, Plus, Minus, Calculator, Save } from 'lucide-react';
import Calculate from '../Calculator/Calculate';
import NotePad from '../Note/NotePad';
import { NavLink } from "react-router-dom";

const Constcalc = () => {
   const [materials, setMaterials] = useState([
    { id: '1', name: 'Cement (bags)', quantity: 0, unit: 'bags', costPerUnit: 350 },
    { id: '2', name: 'Steel (kg)', quantity: 0, unit: 'kg', costPerUnit: 65 },
    { id: '3', name: 'Sand (cubic feet)', quantity: 0, unit: 'cft', costPerUnit: 45 },
    { id: '4', name: 'Aggregate (cubic feet)', quantity: 0, unit: 'cft', costPerUnit: 55 },
    { id: '5', name: 'Bricks', quantity: 0, unit: 'pieces', costPerUnit: 8 },
  ]);

  const [labor, setLabor] = useState([
    { id: '1', category: 'Mason', hours: 0, ratePerHour: 500 },
    { id: '2', category: 'Helper', hours: 0, ratePerHour: 350 },
    { id: '3', category: 'Electrician', hours: 0, ratePerHour: 600 },
    { id: '4', category: 'Plumber', hours: 0, ratePerHour: 550 },
  ]);

  const [miscCosts, setMiscCosts] = useState(0);
  const [transportCosts, setTransportCosts] = useState(0);

  const materialTotal = materials.reduce((sum, item) => sum + (item.quantity * item.costPerUnit), 0);
  const laborTotal = labor.reduce((sum, item) => sum + (item.hours * item.ratePerHour), 0);
  const grandTotal = materialTotal + laborTotal + miscCosts + transportCosts;

  const updateMaterialQuantity = (id, quantity) => {
    setMaterials(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ));
  };

  const updateLaborHours = (id, hours) => {
    setLabor(prev => prev.map(item => 
      item.id === id ? { ...item, hours: Math.max(0, hours) } : item
    ));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'Bdt',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto text-black flex items-center mb-10">
      <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
            <Hammer className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Construction Cost Calculator</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Materials Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Materials</h2>
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id} className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{material.name}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(material.costPerUnit)}/{material.unit}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateMaterialQuantity(material.id, material.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={material.quantity}
                        onChange={(e) => updateMaterialQuantity(material.id, Number(e.target.value))}
                        className="w-20 text-center border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                      <button
                        onClick={() => updateMaterialQuantity(material.id, material.quantity + 1)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-600 ml-auto">
                        {formatCurrency(material.quantity * material.costPerUnit)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl border-2 border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Materials Total:</span>
                  <span className="text-xl font-bold text-blue-600">{formatCurrency(materialTotal)}</span>
                </div>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Costs</h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Miscellaneous Costs
                  </label>
                  <input
                    type="number"
                    value={miscCosts}
                    onChange={(e) => setMiscCosts(Number(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter miscellaneous costs"
                    min="0"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Costs
                  </label>
                  <input
                    type="number"
                    value={transportCosts}
                    onChange={(e) => setTransportCosts(Number(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter transport costs"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Labor Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Labor</h2>
              <div className="space-y-4">
                {labor.map((laborItem) => (
                  <div key={laborItem.id} className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{laborItem.category}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(laborItem.ratePerHour)}/hour
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateLaborHours(laborItem.id, laborItem.hours - 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={laborItem.hours}
                        onChange={(e) => updateLaborHours(laborItem.id, Number(e.target.value))}
                        className="w-20 text-center border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min="0"
                      />
                      <button
                        onClick={() => updateLaborHours(laborItem.id, laborItem.hours + 1)}
                        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-600 ml-auto">
                        {formatCurrency(laborItem.hours * laborItem.ratePerHour)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-white rounded-xl border-2 border-purple-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Labor Total:</span>
                  <span className="text-xl font-bold text-purple-600">{formatCurrency(laborTotal)}</span>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Calculator className="h-6 w-6 mr-2" />
                Cost Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Materials:</span>
                  <span>{formatCurrency(materialTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Labor:</span>
                  <span>{formatCurrency(laborTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Miscellaneous:</span>
                  <span>{formatCurrency(miscCosts)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport:</span>
                  <span>{formatCurrency(transportCosts)}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total Cost:</span>
                  <span className="text-yellow-400">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
          <NavLink to="/Counter" className="btn rounded-4xl mt-10">
            <a>Back</a>
          </NavLink>
          <NavLink to="/flat" className="btn rounded-4xl mt-10">
            <a>Flat</a>
          </NavLink>
        </div>
        </div>
        
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
  );
};

export default Constcalc;