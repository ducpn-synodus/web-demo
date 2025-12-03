import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
  onLogout?: () => void;
}

export default function Layout({ children, activeMenu = 'orders', onMenuChange, onLogout }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header onLogout={onLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeMenu={activeMenu} onMenuChange={onMenuChange} />
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}