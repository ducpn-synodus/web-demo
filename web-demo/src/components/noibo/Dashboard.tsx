import { useState } from 'react';
import { Home, FileText, LogOut, Menu, X, ChevronDown, Bell } from 'lucide-react';
import OrderList from './OrderList';
import OrderCreate from './OrderCreate';
import OrderDetail from './OrderDetail';
import OverviewDashboard from './OverviewDashboard';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DashboardProps {
  onLogout: () => void;
}

type Screen = 'home' | 'order-list' | 'order-create' | 'order-detail' | 'order-edit';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  


  // // Filter states
  // const [filterStartDate, setFilterStartDate] = useState('2025-01-01');
  // const [filterEndDate, setFilterEndDate] = useState('2025-03-31');
  // const [filterStatus, setFilterStatus] = useState<string[]>([]);
  // const [filterChannels, setFilterChannels] = useState<string[]>([]);
  // const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentScreen('order-detail');
    setSidebarOpen(false);
  };

  const handleEditOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentScreen('order-edit');
    setSidebarOpen(false);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa yêu cầu ${orderId}?`)) {
      // Logic xóa yêu cầu sẽ được thực hiện ở đây
      // Trong môi trường production, sẽ gọi API để xóa
      console.log('Deleting order:', orderId);
      alert(`Đã xóa yêu cầu ${orderId} thành công!`);
    }
  };

  const handleCreateNew = () => {
    setSelectedOrderId(null);
    setCurrentScreen('order-create');
    setSidebarOpen(false);
  };

  // const recentOrders = [
  //   { id: 'REQ-2025-001', name: 'Chiến dịch Tết Nguyên Đán 2025', status: 'under_review', date: '15/01/2025' },
  //   { id: 'REQ-2025-002', name: 'Quảng bá đường bay mới HAN-SYD', status: 'approved', date: '18/01/2025' },
  //   { id: 'REQ-2025-003', name: 'Chương trình ưu đãi thẻ thành viên', status: 'under_review', date: '20/01/2025' },
  //   { id: 'REQ-2025-004', name: 'Khai trương phòng chờ thương gia mới', status: 'under_review', date: '22/01/2025' },
  // ];

  // const channelStats = [
  //   { name: 'Facebook Ads', count: 8, percentage: 32, color: 'bg-blue-500' },
  //   { name: 'Google Ads', count: 6, percentage: 24, color: 'bg-red-500' },
  //   { name: 'PR Báo chí', count: 5, percentage: 20, color: 'bg-purple-500' },
  //   { name: 'TikTok Ads', count: 4, percentage: 16, color: 'bg-pink-500' },
  //   { name: 'Khác', count: 2, percentage: 8, color: 'bg-gray-400' },
  // ];

  const renderContent = () => {
    switch (currentScreen) {
      case 'order-list':
        return <OrderList onView={handleViewOrder} onEdit={handleEditOrder} onDelete={handleDeleteOrder} onCreateNew={handleCreateNew} />;
      case 'order-create':
      case 'order-edit':
        return (
          <OrderCreate
            orderId={currentScreen === 'order-edit' ? selectedOrderId : null}
            onBack={() => setCurrentScreen('order-list')}
            onSuccess={() => setCurrentScreen('order-list')}
          />
        );
      case 'order-detail':
        return (
          <OrderDetail
            orderId={selectedOrderId}
            onBack={() => setCurrentScreen('order-list')}
// (remove the onEdit prop entirely)
          />
        );
      case 'home':
      default:
        return (
          <OverviewDashboard
            onViewOrder={handleViewOrder}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header - Full Width */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="w-10 h-10 flex-shrink-0">
              <ImageWithFallback
                src="https://careerfinder.vn/wp-content/uploads/2020/05/vietnam-airline-logo.jpg"
                alt="Vietnam Airlines"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-gray-900 font-bold">CPMS</div>
              <div className="text-xs text-gray-500 leading-tight">Communication Program Management System</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Thông báo"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center px-1">
                  <span className="text-white text-xs">3</span>
                </div>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-gray-700" />
                          <span className="text-sm text-gray-900">Thông báo</span>
                        </div>
                        <div className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">3 mới</div>
                      </div>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {/* Notification Item 1 */}
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          handleViewOrder('REQ-2025-002');
                        }}
                        className="w-full px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 mb-1">Yêu cầu đã được duyệt</p>
                            <p className="text-xs text-gray-600 mb-1">REQ-2025-002 - Quảng bá đường bay mới HAN-SYD</p>
                            <p className="text-xs text-gray-500">10 phút trước</p>
                          </div>
                        </div>
                      </button>

                      {/* Notification Item 2 */}
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          handleViewOrder('REQ-2025-002');
                        }}
                        className="w-full px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 mb-1">Yêu cầu đã được duyệt</p>
                            <p className="text-xs text-gray-600 mb-1">REQ-2025-002 - Quảng bá đường bay mới HAN-SYD</p>
                            <p className="text-xs text-gray-500">2 giờ trước</p>
                          </div>
                        </div>
                      </button>

                      {/* Notification Item 3 */}
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          handleViewOrder('REQ-2025-001');
                        }}
                        className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 mb-1">Yêu cầu đang được xem xét</p>
                            <p className="text-xs text-gray-600 mb-1">REQ-2025-001 - Chiến dịch Tết Nguyên Đán 2025</p>
                            <p className="text-xs text-gray-500">1 ngày trước</p>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                      <button className="w-full text-center text-xs text-[#0891b2] hover:underline">
                        Xem tất cả thông báo
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors pl-3 pr-2 py-2"
              >
                <div className="w-9 h-9 bg-[#0891b2] rounded-full flex items-center justify-center text-white">
                  <span className="text-sm">NT</span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm text-gray-900">Nguyễn Thảo</div>
                  <div className="text-xs text-gray-500">Phòng Nội Bộ</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-sm text-gray-900">Nguyễn Thảo</div>
                      <div className="text-xs text-gray-500">nguyenthao@vietnamairlines.com</div>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Đăng xuất</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content Area with Sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 shadow-lg lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } ${sidebarCollapsed ? 'lg:w-20' : 'w-64'} lg:top-0`}
        >
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto pt-5">
              <button
                onClick={() => {
                  setCurrentScreen('home');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  currentScreen === 'home'
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                } ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
                title={sidebarCollapsed ? 'Tổng quan' : ''}
              >
                <Home className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Tổng quan</span>}
              </button>

              <button
                onClick={() => {
                  setCurrentScreen('order-list');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  currentScreen === 'order-list' || currentScreen === 'order-detail' || currentScreen === 'order-create' || currentScreen === 'order-edit'
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                } ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
                title={sidebarCollapsed ? 'Danh sách yêu cầu' : ''}
              >
                <FileText className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">Danh sách yêu cầu</span>}
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Subheader - Page Title */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <p className="text-gray-900 text-xl font-bold">
              {currentScreen === 'home' && 'Tổng quan'}
              {currentScreen === 'order-list' && 'Danh sách yêu cầu truyền thông'}
              {currentScreen === 'order-create' && 'Tạo yêu cầu mới'}
              {currentScreen === 'order-edit' && 'Chỉnh sửa yêu cầu'}
              {currentScreen === 'order-detail' && 'Chi tiết yêu cầu'}
            </p>
          </div>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}