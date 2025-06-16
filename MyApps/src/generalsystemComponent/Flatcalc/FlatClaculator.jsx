import React, { useState } from "react";
import { Building, Calculator, MapPin, Home, Star } from "lucide-react";
import Calculate from "../Calculator/Calculate";
import NotePad from "../Note/NotePad";
import { NavLink } from "react-router-dom";
const FlatClaculator = () => {
  const [flatDetails, setFlatDetails] = useState({
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    floor: 0,
    totalFloors: 10,
    age: 0,
    pricePerSqFt: 0,
  });

  const [location, setLocation] = useState("metro");
  const [amenities, setAmenities] = useState({
    parking: false,
    gym: false,
    pool: false,
    security: false,
    elevator: false,
    garden: false,
  });

  const calculateBasePrice = () => {
    return flatDetails.area * flatDetails.pricePerSqFt;
  };

  const calculateLocationMultiplier = () => {
    const multipliers = {
      metro: 1.0,
      suburban: 0.8,
      rural: 0.6,
      prime: 1.7,
    };
    return multipliers[location] || 1.0;
  };

  const calculateFloorMultiplier = () => {
    if (flatDetails.floor <= 2) return 0.95;
    if (flatDetails.floor >= flatDetails.totalFloors - 2) return 1.05;
    return 1.0;
  };

  const calculateAgeDepreciation = () => {
    if (flatDetails.age <= 2) return 1.0;
    if (flatDetails.age <= 5) return 0.95;
    if (flatDetails.age <= 10) return 0.9;
    return 0.85;
  };

  const calculateAmenitiesValue = () => {
    const amenityValues = {
      parking: 500000,
      gym: 500000,
      pool: 750000,
      security: 250000,
      elevator: 30000,
      garden: 40000,
    };

    return Object.entries(amenities).reduce((total, [key, enabled]) => {
      return total + (enabled ? amenityValues[key] || 0 : 0);
    }, 0);
  };

  const finalPrice = () => {
    const basePrice = calculateBasePrice();
    const locationAdjusted = basePrice * calculateLocationMultiplier();
    const floorAdjusted = locationAdjusted * calculateFloorMultiplier();
    const ageAdjusted = floorAdjusted * calculateAgeDepreciation();
    const amenitiesValue = calculateAmenitiesValue();

    return ageAdjusted + amenitiesValue;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatLakhs = (amount) => {
    const lakhs = amount / 100000;
    return `BDT${lakhs.toFixed(2)} Lakhs`;
  };

  const updateFlatDetail = (key, value) => {
    setFlatDetails((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (amenity) => {
    setAmenities((prev) => ({ ...prev, [amenity]: !prev[amenity] }));
  };

  return (
    <div className=" text-black flex mb-10">
      <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl">
            <Building className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Flat Cost Calculator
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Flat Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carpet Area (sq ft)
                </label>
                <input
                  type="number"
                  value={flatDetails.area}
                  onChange={(e) =>
                    updateFlatDetail("area", Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={flatDetails.bedrooms}
                    onChange={(e) =>
                      updateFlatDetail("bedrooms", Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} BHK
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={flatDetails.bathrooms}
                    onChange={(e) =>
                      updateFlatDetail("bathrooms", Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor
                  </label>
                  <input
                    type="number"
                    value={flatDetails.floor}
                    onChange={(e) =>
                      updateFlatDetail("floor", Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Floors
                  </label>
                  <input
                    type="number"
                    value={flatDetails.totalFloors}
                    onChange={(e) =>
                      updateFlatDetail("totalFloors", Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Age (years)
                </label>
                <input
                  type="number"
                  value={flatDetails.age}
                  onChange={(e) =>
                    updateFlatDetail("age", Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Sq Ft (₹)
                </label>
                <input
                  type="number"
                  value={flatDetails.pricePerSqFt}
                  onChange={(e) =>
                    updateFlatDetail("pricePerSqFt", Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location
              </h2>
              <div className="space-y-3">
                {[
                  {
                    value: "prime",
                    label: "Prime Location (+30%)",
                    multiplier: "+30%",
                  },
                  { value: "metro", label: "Metro City", multiplier: "Base" },
                  {
                    value: "suburban",
                    label: "Suburban (-20%)",
                    multiplier: "-20%",
                  },
                  {
                    value: "rural",
                    label: "Rural Area (-40%)",
                    multiplier: "-40%",
                  },
                ].map((loc) => (
                  <label
                    key={loc.value}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="location"
                      value={loc.value}
                      checked={location === loc.value}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <span className="flex-1">{loc.label}</span>
                    <span className="text-sm text-gray-500">
                      {loc.multiplier}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Amenities
              </h2>
              <div className="space-y-3">
                {[
                  { key: "parking", label: "Car Parking", value: "BDT 5L" },
                  { key: "gym", label: "Gymnasium", value: "BDT50K" },
                  { key: "pool", label: "Swimming Pool", value: "BDT75K" },
                  { key: "security", label: "24/7 Security", value: "BDT25K" },
                  { key: "elevator", label: "Elevator", value: "BDT30K" },
                  { key: "garden", label: "Garden/Park", value: "BDT40K" },
                ].map((amenity) => (
                  <label
                    key={amenity.key}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={amenities[amenity.key]}
                      onChange={() => toggleAmenity(amenity.key)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="flex-1">{amenity.label}</span>
                    <span className="text-sm text-gray-500">
                      {amenity.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2" />
              Price Breakdown
            </h2>

            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span>Base Price:</span>
                  <span>{formatCurrency(calculateBasePrice())}</span>
                </div>
                <div className="text-sm text-gray-300">
                  {flatDetails.area} sq ft × BDT{flatDetails.pricePerSqFt}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Location Adjustment:</span>
                  <span>
                    {(calculateLocationMultiplier() * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Floor Premium:</span>
                  <span>{(calculateFloorMultiplier() * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Age Depreciation:</span>
                  <span>{(calculateAgeDepreciation() * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Amenities Value:</span>
                  <span>{formatCurrency(calculateAmenitiesValue())}</span>
                </div>
              </div>

              <hr className="border-gray-600" />

              <div className="bg-yellow-500 bg-opacity-20 p-4 rounded-xl">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Final Price:</span>
                  <span className="text-yellow-400">
                    {formatLakhs(finalPrice())}
                  </span>
                </div>
                <div className="text-right text-sm text-gray-300 mt-1">
                  {formatCurrency(finalPrice())}
                </div>
              </div>

              <div className="text-center text-sm text-gray-400 mt-4">
                Price per sq ft: BDT
                {Math.round(finalPrice() / flatDetails.area)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <NavLink to="/Counter" className="btn rounded-4xl mt-10">
            <a>Back</a>
          </NavLink>
          <NavLink to="/Construction" className="btn rounded-4xl mt-10">
            <a>Construction</a>
          </NavLink>
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
export default FlatClaculator;
