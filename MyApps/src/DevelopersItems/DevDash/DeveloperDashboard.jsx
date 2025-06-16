import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Package, 
  BarChart3, 
  DollarSign,
  Shield,
  Settings,
  Activity,
  Building,
  Target,
  AlertTriangle
} from 'lucide-react';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';

const DeveloperDashboard = () => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '', badge: null },
    { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects', badge: '8' },
    { id: 'team', label: 'Team Management', icon: Users, path: '/team', badge: null },
    { id: 'resources', label: 'Resources', icon: Package, path: '/resources', badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics', badge: null },
    { id: 'budget', label: 'Budget Tracking', icon: DollarSign, path: '/budget', badge: '2' },
    { id: 'quality', label: 'Quality Control', icon: Shield, path: '/quality', badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', badge: null }
  ];

  const OverviewContent = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Dashboard</h1>
        <p className="text-gray-600">Manage your construction projects and development pipeline.</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">24</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Active Projects</h3>
          <p className="text-sm text-gray-500">3 starting this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">78%</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">On-Time Delivery</h3>
          <p className="text-sm text-gray-500">+12% improvement</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">156</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Team Members</h3>
          <p className="text-sm text-gray-500">Across all projects</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">7</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Issues</h3>
          <p className="text-sm text-gray-500">Requires attention</p>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Pipeline</h3>
          <div className="space-y-4">
            {[
              { name: 'Residential Complex A', progress: 85, status: 'On Track', budget: '$2.4M' },
              { name: 'Commercial Tower B', progress: 62, status: 'Delayed', budget: '$5.1M' },
              { name: 'Infrastructure Project C', progress: 34, status: 'On Track', budget: '$3.8M' },
              { name: 'Mixed-Use Development', progress: 91, status: 'Ahead', budget: '$4.2M' }
            ].map((project, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'On Track' ? 'bg-green-100 text-green-700' :
                    project.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">{project.progress}% Complete</span>
                  <span className="text-sm font-medium text-gray-900">{project.budget}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Allocation</h3>
          <div className="space-y-4">
            {[
              { resource: 'Construction Crews', allocated: 12, total: 15, utilization: 80 },
              { resource: 'Heavy Machinery', allocated: 8, total: 10, utilization: 80 },
              { resource: 'Project Managers', allocated: 6, total: 8, utilization: 75 },
              { resource: 'Safety Inspectors', allocated: 4, total: 5, utilization: 80 }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{item.resource}</h4>
                  <span className="text-sm text-gray-600">{item.allocated}/{item.total}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${item.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.utilization}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsContent = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Project Management</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Project management interface would be implemented here.</p>
      </div>
    </div>
  );

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      userRole="developer" 
      userName="Sarah Johnson"
    >
      <Routes>
        <Route path="/" element={<OverviewContent />} />
        <Route path="/projects" element={<ProjectsContent />} />
        <Route path="*" element={<OverviewContent />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DeveloperDashboard;