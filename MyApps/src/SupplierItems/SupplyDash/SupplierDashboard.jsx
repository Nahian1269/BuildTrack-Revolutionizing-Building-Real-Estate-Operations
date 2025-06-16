import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Truck, 
  FileText, 
  Package2, 
  UserCheck,
  BarChart3,
  MapPin,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';

const SupplierDashboard = () => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '', badge: null },
    { id: 'orders', label: 'Orders & Inventory', icon: ShoppingCart, path: '/orders', badge: '12' },
    { id: 'delivery', label: 'Delivery Tracking', icon: Truck, path: '/delivery', badge: null },
    { id: 'invoices', label: 'Invoice Management', icon: FileText, path: '/invoices', badge: '5' },
    { id: 'catalog', label: 'Product Catalog', icon: Package2, path: '/catalog', badge: null },
    { id: 'customers', label: 'Customer Relations', icon: UserCheck, path: '/customers', badge: null },
    { id: 'analytics', label: 'Supply Analytics', icon: BarChart3, path: '/analytics', badge: null },
    { id: 'logistics', label: 'Supply Chain', icon: MapPin, path: '/logistics', badge: null }
  ];

  const OverviewContent = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Dashboard</h1>
        <p className="text-gray-600">Manage your construction supply operations and logistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">$284K</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Monthly Revenue</h3>
          <p className="text-sm text-gray-500">+18% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">147</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Active Orders</h3>
          <p className="text-sm text-gray-500">32 pending delivery</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Truck className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">96%</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">On-Time Delivery</h3>
          <p className="text-sm text-gray-500">Excellent performance</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package2 className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">1,284</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Inventory Items</h3>
          <p className="text-sm text-gray-500">89 low stock alerts</p>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { id: 'ORD-2024-001', customer: 'BuildTech Solutions', amount: '$45,200', status: 'Processing', items: 'Concrete, Steel Rebar' },
              { id: 'ORD-2024-002', customer: 'Urban Development Corp', amount: '$23,800', status: 'Shipped', items: 'Lumber, Insulation' },
              { id: 'ORD-2024-003', customer: 'Metro Construction', amount: '$67,400', status: 'Delivered', items: 'Heavy Machinery Parts' },
              { id: 'ORD-2024-004', customer: 'Skyline Builders', amount: '$31,600', status: 'Pending', items: 'Electrical Components' }
            ].map((order, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{order.id}</h4>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{order.items}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Status</h3>
          <div className="space-y-4">
            {[
              { vehicle: 'Truck #001', driver: 'Mike Johnson', route: 'Downtown Construction', eta: '2:30 PM', status: 'En Route' },
              { vehicle: 'Truck #003', driver: 'Sarah Davis', route: 'Industrial District', eta: '4:15 PM', status: 'Loading' },
              { vehicle: 'Truck #005', driver: 'Tom Wilson', route: 'Residential Area', eta: '11:45 AM', status: 'Delivered' },
              { vehicle: 'Truck #007', driver: 'Lisa Brown', route: 'Commercial Zone', eta: '5:30 PM', status: 'Scheduled' }
            ].map((delivery, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{delivery.vehicle}</h4>
                    <p className="text-sm text-gray-600">{delivery.driver}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{delivery.eta}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      delivery.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      delivery.status === 'En Route' ? 'bg-blue-100 text-blue-700' :
                      delivery.status === 'Loading' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {delivery.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">To: {delivery.route}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { item: 'Portland Cement', current: 45, minimum: 100, unit: 'bags' },
              { item: 'Steel Rebar (10mm)', current: 23, minimum: 50, unit: 'tons' },
              { item: 'Insulation Panels', current: 156, minimum: 200, unit: 'sq ft' },
              { item: 'PVC Pipes (4")', current: 12, minimum: 30, unit: 'meters' }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{item.item}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium text-orange-600">{item.current} {item.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Minimum:</span>
                  <span className="font-medium text-gray-900">{item.minimum} {item.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const OrdersContent = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders & Inventory</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Orders and inventory management interface would be implemented here.</p>
      </div>
    </div>
  );

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      userRole="supplier" 
      userName="Robert Chen"
    >
      <Routes>
        <Route path="/" element={<OverviewContent />} />
        <Route path="/orders" element={<OrdersContent />} />
        <Route path="*" element={<OverviewContent />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SupplierDashboard;