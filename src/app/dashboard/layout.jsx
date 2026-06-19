import { DeshboardSidebar } from '@/components/deshboard/DeshboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
  return (
    <div className=' flex min-h-screen'>
      <DeshboardSidebar></DeshboardSidebar>
      <div className=' flex-1'>{children}</div>
    </div>
  );
};

export default DashboardLayout;