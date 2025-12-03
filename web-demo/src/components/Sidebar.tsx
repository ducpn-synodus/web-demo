import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  Megaphone,
  Calendar,
  Target
} from 'lucide-react';

interface SidebarProps {
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'campaigns', icon: Megaphone, label: 'Chiến dịch' },
  { id: 'orders', icon: ShoppingCart, label: 'Đơn hàng' },
  { id: 'calendar', icon: Calendar, label: 'Lịch trình' },
  { id: 'targets', icon: Target, label: 'Mục tiêu' },
  { id: 'products', icon: Package, label: 'Sản phẩm' },
  { id: 'team', icon: Users, label: 'Đội ngũ' },
  { id: 'reports', icon: BarChart3, label: 'Báo cáo' },
  { id: 'documents', icon: FileText, label: 'Tài liệu' },
  { id: 'settings', icon: Settings, label: 'Cài đặt' },
];

export default function Sidebar({ activeMenu = 'orders', onMenuChange }: SidebarProps) {
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
