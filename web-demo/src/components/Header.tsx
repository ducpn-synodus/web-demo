import { Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export default function Header({ onProfileClick, onLogout }: HeaderProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
          <ImageWithFallback 
            src="https://careerfinder.vn/wp-content/uploads/2020/05/vietnam-airline-logo.jpg"
            alt="Vietnam Airlines"
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div>
          <h2 className="text-gray-600">CPMS</h2>
          <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Communication Program Management System</p>
        </div>
      </div>

      {/* Right Side - Notifications & User */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center" style={{ fontSize: 'var(--text-xs)' }}>
            5
          </span>
        </button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white" style={{ fontSize: 'var(--text-xs)' }}>
                VD
              </div>
              <div className="text-left">
                <div className="text-gray-600" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>Vendor Account</div>
                <div className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Vendor</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              <span>Hồ sơ Vendor</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}