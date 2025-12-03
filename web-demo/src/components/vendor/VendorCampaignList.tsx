import { Search, Filter, Calendar, Package, Eye, DollarSign, TrendingUp, CheckCircle, Clock, FileText, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Campaign {
  id: string;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  slotCount: number;
  completedSlots: number;
  pendingSlots: number;
  totalBudget: string;
  usedBudget: string;
  remainingBudget: string;
  kpiAchievement: number;
  status: 'running' | 'completed' | 'pending_acceptance';
  picName: string;
  channel: string;
  daysRemaining?: number;
}

export default function VendorCampaignList({ onViewDetail }: { onViewDetail?: (id: string) => void }) {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const campaigns: Campaign[] = [
    {
      id: '1',
      code: 'CP-2025-001',
      name: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
      startDate: '01/01/2025',
      endDate: '15/02/2025',
      slotCount: 5,
      completedSlots: 3,
      pendingSlots: 2,
      totalBudget: '100,000,000',
      usedBudget: '65,000,000',
      remainingBudget: '35,000,000',
      kpiAchievement: 125,
      status: 'running',
      picName: 'Nguyễn Văn A',
      channel: 'Facebook',
      daysRemaining: 30
    },
    {
      id: '2',
      code: 'CP-2025-002',
      name: 'Quảng bá dịch vụ Business Class',
      startDate: '10/01/2025',
      endDate: '31/01/2025',
      slotCount: 4,
      completedSlots: 2,
      pendingSlots: 2,
      totalBudget: '80,000,000',
      usedBudget: '45,000,000',
      remainingBudget: '35,000,000',
      kpiAchievement: 110,
      status: 'running',
      picName: 'Trần Thị B',
      channel: 'Instagram'
    },
    {
      id: '3',
      code: 'CP-2024-089',
      name: 'PR Digital Q4/2024',
      startDate: '01/12/2024',
      endDate: '31/12/2024',
      slotCount: 3,
      completedSlots: 3,
      pendingSlots: 0,
      totalBudget: '60,000,000',
      usedBudget: '60,000,000',
      remainingBudget: '0',
      kpiAchievement: 140,
      status: 'pending_acceptance',
      picName: 'Lê Văn C',
      channel: 'LinkedIn'
    }
  ];

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'running':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Đang chạy
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
            Hoàn thành
          </span>
        );
      case 'pending_acceptance':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            Chờ nghiệm thu
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Chiến dịch của tôi</h1>
      </div>

      {/* Stats Overview - Compact Design with More Metrics */}
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-blue-600 mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {campaigns.length}
            </p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Tổng chiến dịch</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-green-300 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-green-600 mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {campaigns.filter(c => c.status === 'running').length}
            </p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Đang chạy</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-orange-300 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-orange-600 mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {campaigns.reduce((sum, c) => sum + c.pendingSlots, 0)}
            </p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Slot cần cập nhật</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-amber-300 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center mb-3">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-amber-600 mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {campaigns.filter(c => c.status === 'pending_acceptance').length}
            </p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Chờ nghiệm thu</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-teal-300 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-teal-600" />
            </div>
            <p className="text-teal-600 mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
              240M
            </p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Tổng ngân sách</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-purple-300 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-purple-600 mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
              125%
            </p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>KPI trung bình</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-cyan-300 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-cyan-600" />
            </div>
            <p className="text-cyan-600 mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {campaigns.filter(c => c.status === 'completed').length}
            </p>
            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Hoàn thành</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm chiến dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="running">Đang chạy</option>
              <option value="completed">Hoàn thành</option>
              <option value="pending_acceptance">Chờ nghiệm thu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:border-teal-200 transition-all overflow-hidden"
          >
            {/* Header Section - Ultra Compact */}
            <div className="bg-white border-b border-gray-200 px-4 py-2">
              <div className="flex items-center justify-between gap-3">
                {/* Left: Code + Name + Status */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded flex-shrink-0" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {campaign.code}
                  </span>
                  <h3 className="text-gray-900 truncate" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {campaign.name}
                  </h3>
                  {getStatusBadge(campaign.status)}
                </div>
                
                {/* Right: Days + Button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {campaign.daysRemaining && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
                      <Clock className="w-3 h-3" />
                      {campaign.daysRemaining}d
                    </span>
                  )}
                  <button
                    onClick={() => onViewDetail?.(campaign.id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-white rounded hover:opacity-90 transition-all"
                    style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', backgroundColor: '#006885' }}
                  >
                    <Eye className="w-3 h-3" />
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 py-2.5">
              {/* Meta Info + Slot Stats - All in one line */}
              <div className="flex items-center justify-between gap-4 pb-2 mb-2 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-700" style={{ fontSize: 'var(--text-xs)' }}>
                      {campaign.startDate} - {campaign.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-700" style={{ fontSize: 'var(--text-xs)' }}>
                      {campaign.picName}
                    </span>
                  </div>
                </div>
                
                {/* Slot stats inline - no boxes */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Slot:</span>
                    <span className="text-blue-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {campaign.slotCount}
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {campaign.completedSlots}
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {campaign.pendingSlots}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar - Thin */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                    Tiến độ
                  </span>
                  <span className="text-teal-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                    {Math.round((campaign.completedSlots / campaign.slotCount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full" style={{ height: '4px' }}>
                  <div
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full transition-all"
                    style={{ width: `${(campaign.completedSlots / campaign.slotCount) * 100}%`, height: '4px' }}
                  />
                </div>
              </div>

              {/* Budget & KPI - No boxes, inline */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                {/* Budget inline */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Phân bổ:</span>
                    <span className="text-gray-900" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {campaign.totalBudget}đ
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Sử dụng:</span>
                    <span className="text-teal-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {campaign.usedBudget}đ
                    </span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Còn lại:</span>
                    <span className="text-gray-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {campaign.remainingBudget}đ
                    </span>
                  </div>
                </div>

                {/* KPI inline - no box */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`w-3.5 h-3.5 ${campaign.kpiAchievement >= 100 ? 'text-green-600' : 'text-amber-600'}`} />
                    <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>KPI:</span>
                  </div>
                  {campaign.kpiAchievement >= 100 ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                  <span className={`${campaign.kpiAchievement >= 100 ? 'text-green-600' : 'text-amber-600'}`} style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                    {campaign.kpiAchievement}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {campaigns.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Chưa có chiến dịch nào</p>
        </div>
      )}
    </div>
  );
}