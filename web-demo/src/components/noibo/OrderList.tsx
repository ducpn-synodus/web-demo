import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit2, Trash2, Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface OrderListProps {
  onView: (orderId: string) => void;
  onEdit: (orderId: string) => void;
  onCreateNew: () => void;
  onDelete?: (orderId: string) => void;
}

export default function OrderList({ onView, onEdit, onCreateNew, onDelete }: OrderListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const orders = [
    {
      id: 'REQ-2025-007',
      name: 'Chương trình khuyến mãi mùa hè',
      department: 'Marketing',
      status: 'rejected',
      statusText: 'Đã từ chối',
      priority: 'medium',
      createdDate: '12/01/2025',
      startDate: '01/06/2025',
      endDate: '30/06/2025',
      budget: '250,000,000 VND',
      channels: ['Facebook Ads', 'Instagram Ads'],
    },
    {
      id: 'REQ-2025-001',
      name: 'Chiến dịch Tết Nguyên Đán 2025',
      department: 'Marketing',
      status: 'under_review',
      statusText: 'Đang xem xét',
      priority: 'high',
      createdDate: '15/01/2025',
      startDate: '01/02/2025',
      endDate: '15/02/2025',
      budget: '500,000,000 VND',
      channels: ['Facebook Ads', 'Google Ads', 'PR'],
    },
    {
      id: 'REQ-2025-002',
      name: 'Quảng bá đường bay mới HAN-SYD',
      department: 'Sales',
      status: 'approved',
      statusText: 'Đã duyệt',
      priority: 'medium',
      createdDate: '18/01/2025',
      startDate: '01/03/2025',
      endDate: '31/03/2025',
      budget: '300,000,000 VND',
      channels: ['Facebook Ads', 'TikTok Ads'],
    },
    {
      id: 'REQ-2025-003',
      name: 'Chương trình ưu đãi thẻ thành viên',
      department: 'Marketing',
      status: 'under_review',
      statusText: 'Đang xem xét',
      priority: 'high',
      createdDate: '20/01/2025',
      startDate: '15/02/2025',
      endDate: '28/02/2025',
      budget: '200,000,000 VND',
      channels: ['Email Marketing', 'SMS'],
    },
    {
      id: 'REQ-2025-004',
      name: 'Khai trương phòng chờ thương gia mới',
      department: 'Customer Service',
      status: 'under_review',
      statusText: 'Đang xem xét',
      priority: 'low',
      createdDate: '22/01/2025',
      startDate: '01/04/2025',
      endDate: '30/04/2025',
      budget: '150,000,000 VND',
      channels: ['PR Báo chí'],
    },
    {
      id: 'REQ-2025-005',
      name: 'Chương trình khách hàng thân thiết Q1',
      department: 'Marketing',
      status: 'approved',
      statusText: 'Đã duyệt',
      priority: 'medium',
      createdDate: '10/01/2025',
      startDate: '01/01/2025',
      endDate: '31/03/2025',
      budget: '400,000,000 VND',
      channels: ['Facebook Ads', 'Google Ads', 'Email Marketing'],
    },
    {
      id: 'REQ-2025-006',
      name: 'Quảng cáo dịch vụ hành lý ký gửi',
      department: 'Operations',
      status: 'completed',
      statusText: 'Hoàn thành',
      priority: 'low',
      createdDate: '05/01/2025',
      startDate: '10/01/2025',
      endDate: '20/01/2025',
      budget: '100,000,000 VND',
      channels: ['Google Ads', 'Display Ads'],
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      under_review: 'bg-blue-50 text-blue-700 border-blue-200',
      approved: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
      completed: 'bg-teal-50 text-teal-700 border-teal-200',
    };
    return colors[status as keyof typeof colors] || colors.under_review;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-600',
      medium: 'bg-blue-100 text-blue-600',
      high: 'bg-red-100 text-red-600',
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'under_review', label: 'Đang xem xét' },
    { value: 'approved', label: 'Đã duyệt' },
    { value: 'rejected', label: 'Đã từ chối' },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên, mã yêu cầu, phòng ban..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 w-full sm:w-96"
            />
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {/* Filter Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">
                {statusOptions.find(opt => opt.value === selectedStatus)?.label}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showFilterDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowFilterDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedStatus(option.value);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        selectedStatus === option.value ? 'bg-blue-50 text-[#006885]' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Button
            onClick={onCreateNew}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg shadow-teal-600/20 flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo yêu cầu mới
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Mã yêu cầu</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Tên chiến dịch</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Phòng ban</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Mức độ</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Thời gian</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Ngân sách</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Không tìm thấy yêu cầu nào</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#006885]">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900 mb-1">{order.name}</p>
                        <div className="flex flex-wrap gap-1">
                          {order.channels.slice(0, 2).map((channel, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                              {channel}
                            </span>
                          ))}
                          {order.channels.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                              +{order.channels.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{order.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getPriorityColor(order.priority)}`}>
                        {order.priority === 'high' && 'Cao'}
                        {order.priority === 'medium' && 'Trung bình'}
                        {order.priority === 'low' && 'Thấp'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs border ${getStatusColor(order.status)}`}>
                        {order.statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{order.startDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{order.budget}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onView(order.id)}
                          className="inline-flex items-center justify-center p-1 text-gray-600 hover:text-gray-900 transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onEdit(order.id)}
                          className="inline-flex items-center justify-center p-1 text-gray-600 hover:text-gray-900 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(order.id)}
                            className="inline-flex items-center justify-center p-1 text-gray-600 hover:text-gray-900 transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 border rounded-lg transition-colors ${
              currentPage === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 border rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}