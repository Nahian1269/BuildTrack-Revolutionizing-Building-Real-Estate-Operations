import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const DashboardLayout = ({ children, menuItems, userRole, userName }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        menuItems={menuItems} 
        userRole={userRole} 
        userName={userName} 
      />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;