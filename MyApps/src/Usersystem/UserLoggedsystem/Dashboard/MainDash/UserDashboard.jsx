import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  FileText,
  MessageSquare,
  User,
  Calendar,
  TrendingUp,
  AlertCircle,
  DollarSign,
  HardHat,
  Building2, 
  Calculator
} from 'lucide-react';
import DashboardLayout from '../../Dashboard/Layout/Layout';


const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-gray-100 p-3 rounded-lg">{icon}</div>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
    </div>
    <h3 className="font-semibold text-gray-700 mb-1">{label}</h3>
  </div>
);

const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    axios.get('/api/dashboard')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);
  return stats;
};

const OverviewContent = () => {
  const stats = useDashboardStats();


  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">Here’s your construction site summary for today.</p>
      </div>

      {!stats ? <p>Loading stats...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Building2 className="text-blue-600" />} label="Projects" value={stats.totalProjects} />
          <StatCard icon={<DollarSign className="text-red-600" />} label="Total Spent" value={`$${stats.totalSpent}`} />
          <StatCard icon={<DollarSign className="text-purple-600" />} label="Project Value" value={`$${stats.totalValue}`} />
          <StatCard icon={<TrendingUp className="text-green-600" />} label="Avg. Progress" value={`${stats.avgProgress}%`} />
          <StatCard icon={<HardHat className="text-orange-600" />} label="Safety Violations" value={stats.safetyViolations} />
          <StatCard icon={<User className="text-teal-600" />} label="Active Workers" value={stats.activeWorkers} />
          <StatCard icon={<CheckSquare className="text-emerald-600" />} label="Completed Tasks" value={stats.completedTasks} />
          <StatCard icon={<Clock className="text-yellow-600" />} label="Overdue Tasks" value={stats.overdueTasks} />
          <StatCard icon={<FileText className="text-indigo-600" />} label="Materials Ordered" value={stats.materialsOrdered} />
          <StatCard icon={<Building2 className="text-gray-600" />} label="Land Plots" value={stats.totalLands} />

        </div>
      )}
    </div>
  );
};

const TasksContent = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">My Tasks</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <p className="text-gray-600">Construction task management interface will be here.</p>
    </div>
  </div>
);

const UserDashboard = () => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, path: '', badge: null },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, path: '/tasks', badge: '5' },
    { id: 'timesheet', label: 'Time Logs', icon: Clock, path: '/timesheet', badge: null },
    { id: 'documents', label: 'Construction Docs', icon: FileText, path: '/documents', badge: null },
    { id: 'messages', label: 'Project Messages', icon: MessageSquare, path: '/messages', badge: '3' },
    { id: 'schedule', label: 'Whiteboard', icon: Calendar, path: '/doodles', badge: null },
    { id: 'profile', label: 'My Profile', icon: User, path: '/profile', badge: null },
    { id: 'calculator', label: 'inti Calculator', icon: Calculator, path: '/Counter', badge: null }
  ];
  

  return (
    <DashboardLayout
      menuItems={menuItems}
      userRole="Construction Worker"
      userName="John Smith"
    >
      <Routes>
        <Route path="/" element={<OverviewContent />} />
        <Route path="/tasks" element={<TasksContent />} />
        {/* Add your Calculator component route below. Replace 'div' with your actual Calculator component if available */}
        <Route path="/calculator" element={<div>Calculator Component Here</div>} />
        <Route path="*" element={<OverviewContent />} />
      </Routes>
    </DashboardLayout>
  );
};

export default UserDashboard;
