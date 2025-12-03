import { useState } from 'react';
import { FileText, Target, ChevronLeft, ChevronRight, FileCheck, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
}

export default function Sidebar({ activeMenu = 'orders', onMenuChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'orders',
      label: 'Quản lý Nhu cầu',
      icon: FileText,
    },
    {
      id: 'campaigns-parent',
      label: 'Quản lý Chiến dịch',
      icon: Target,
    },
    {
      id: 'acceptance',
      label: 'Quản lý Nghiệm thu',
      icon: FileCheck,
    },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col relative`}>
      {/* Menu Items */}
      <div className="flex-1 py-6 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onMenuChange?.(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-600'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : ''}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                {!collapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-20 -right-3 p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-600 transition-colors z-10"
        title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}