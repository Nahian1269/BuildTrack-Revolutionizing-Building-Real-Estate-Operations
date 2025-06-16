import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Hammer, User, Code, Truck, Building2 } from 'lucide-react';

const RoleSelector = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'user',
      title: 'Project User',
      description: 'Access your projects, tasks, and documentation',
      icon: User,
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/user_dash'
    },
    {
      id: 'developer',
      title: 'Developer',
      description: 'Manage projects, teams, and development resources',
      icon: Code,
      color: 'bg-green-500 hover:bg-green-600',
      path: '/dev_dash'
    },
    {
      id: 'supplier',
      title: 'Construction Supplier',
      description: 'Manage inventory, orders, and delivery tracking',
      icon: Truck,
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/supply_dash'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Hammer className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            BuildTracks
          </h1>
          <p className="text-xl text-slate-300">
            Select your role to access your account
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => navigate(role.path)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-8"
              >
                <div className={`${role.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;