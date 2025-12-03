import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
} from 'lucide-react';

export type VendorMenuId = 'dashboard' | 'campaigns' | 'acceptance' | 'reports' | 'profile';

interface MenuItem {
  id: VendorMenuId;
  label: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Quản lý nghiệm thu', icon: Briefcase },
  { id: 'acceptance', label: 'Lập yêu cầu nghiệm thu', icon: FileText }
];

interface VendorSidebarProps {
  activeMenu?: VendorMenuId;
  onMenuChange?: (menuId: VendorMenuId) => void;
}

export default function VendorSidebar({ activeMenu = 'dashboard', onMenuChange }: VendorSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto hide-scrollbar">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange?.(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate" style={{ fontSize: 'var(--text-sm)' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
