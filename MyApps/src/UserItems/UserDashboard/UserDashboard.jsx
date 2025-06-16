
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Clock, 
  FileText, 
  MessageSquare, 
  User,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';
const UserDashboard = () => {
   const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '', badge: null },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, path: '/tasks', badge: '5' },
    { id: 'timesheet', label: 'Time Tracking', icon: Clock, path: '/timesheet', badge: null },
    { id: 'documents', label: 'Documents', icon: FileText, path: '/documents', badge: null },
    { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/messages', badge: '3' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/schedule', badge: null },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile', badge: null }
  ];

  const OverviewContent = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckSquare className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Active Tasks</h3>
          <p className="text-sm text-gray-500">5 due this week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">85%</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Completion Rate</h3>
          <p className="text-sm text-gray-500">+5% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">42h</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Hours This Week</h3>
          <p className="text-sm text-gray-500">8h today</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Urgent Items</h3>
          <p className="text-sm text-gray-500">Requires attention</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
          <div className="space-y-4">
            {[
              { task: 'Review foundation blueprints', status: 'In Progress', priority: 'High' },
              { task: 'Update material specifications', status: 'Pending', priority: 'Medium' },
              { task: 'Site safety inspection', status: 'Completed', priority: 'High' },
              { task: 'Submit progress report', status: 'In Progress', priority: 'Low' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.task}</p>
                  <p className="text-sm text-gray-500">{item.status}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.priority === 'High' ? 'bg-red-100 text-red-700' :
                  item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Schedule</h3>
          <div className="space-y-4">
            {[
              { event: 'Team Meeting', time: '9:00 AM', date: 'Today' },
              { event: 'Site Visit - Project A', time: '2:00 PM', date: 'Today' },
              { event: 'Client Presentation', time: '10:00 AM', date: 'Tomorrow' },
              { event: 'Safety Training', time: '3:00 PM', date: 'Friday' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.event}</p>
                  <p className="text-sm text-gray-500">{item.time} • {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TasksContent = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Tasks</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Task management interface would be implemented here.</p>
      </div>
    </div>
  );

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      userRole="user" 
      userName="John Smith"
    >
      <Routes>
        <Route path="/" element={<OverviewContent />} />
        <Route path="/tasks" element={<TasksContent />} />
        <Route path="*" element={<OverviewContent />} />
      </Routes>
    </DashboardLayout>
  );
};

export default UserDashboard;