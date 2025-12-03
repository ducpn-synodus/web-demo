import { Briefcase, Package, Clock, CheckCircle, AlertCircle, Send, FileX, Edit, Eye, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useState } from 'react';

interface CompactCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
  bgColor: string;
  urgent?: boolean;
}

function CompactCard({ icon: Icon, label, value, subtitle, color, bgColor, urgent }: CompactCardProps) {
  return (
    <div className={`bg-white rounded-lg p-3 border ${urgent ? 'border-red-300' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 mb-0.5" style={{ fontSize: '11px' }}>
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'var(--font-weight-semibold)', lineHeight: '1' }}>
              {value}
            </p>
            {urgent && (
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded" style={{ fontSize: '9px', fontWeight: 'var(--font-weight-semibold)' }}>
                URGENT
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-gray-600 mt-0.5 truncate" style={{ fontSize: '10px' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approval' | 'returned'>('pending');

  // Work Items - Compact metrics
  const workItems = [
    {
      icon: Briefcase,
      label: 'Chiến dịch tham gia',
      value: 3,
      subtitle: '2 active, 1 done',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Package,
      label: 'Tổng slot được giao',
      value: 12,
      subtitle: 'Workload hiện tại',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      icon: AlertCircle,
      label: 'Chưa cập nhật',
      value: 5,
      subtitle: '3 slot đến hạn 3 ngày',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      urgent: true
    },
    {
      icon: Clock,
      label: 'Chờ nghiệm thu',
      value: 4,
      subtitle: 'Sẵn sàng lập NT',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Send,
      label: 'Chờ VNA duyệt',
      value: 2,
      subtitle: 'NT-001, NT-003',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: FileX,
      label: 'Bị trả về',
      value: 1,
      subtitle: 'NT-001 thiếu ảnh',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      urgent: true
    },
    {
      icon: CheckCircle,
      label: 'Đã nghiệm thu',
      value: 8,
      subtitle: '66.7% tổng slot',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingUp,
      label: 'KPI trung bình',
      value: '105%',
      subtitle: 'Vượt 5% cam kết',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // Slot Status Distribution
  const slotStatusData = [
    { name: 'Chưa update', value: 5, color: '#ef4444' },
    { name: 'Đã update', value: 4, color: '#f59e0b' },
    { name: 'Đang NT', value: 2, color: '#06b6d4' },
    { name: 'Đã duyệt', value: 1, color: '#10b981' }
  ];

  // KPI Achievement by Slot
  const kpiAchievement = [
    { slot: 'PR-001', kpi: 152, target: 100 },
    { slot: 'PR-002', kpi: 95, target: 100 },
    { slot: 'PR-003', kpi: 110, target: 100 },
    { slot: 'PR-004', kpi: 98, target: 100 },
    { slot: 'PR-005', kpi: 88, target: 100 }
  ];

  // Monthly Acceptance Trend
  const monthlyAcceptance = [
    { month: 'T8', batches: 2, slots: 8, value: 180 },
    { month: 'T9', batches: 3, slots: 10, value: 220 },
    { month: 'T10', batches: 2, slots: 12, value: 250 },
    { month: 'T11', batches: 2, slots: 11, value: 240 },
    { month: 'T12', batches: 1, slots: 9, value: 200 },
    { month: 'T1', batches: 2, slots: 12, value: 250 }
  ];

  // Budget vs Actual
  const budgetData = [
    { name: 'Tết 2025', budget: 120, actual: 95, complete: 79 },
    { name: 'Business', budget: 80, actual: 60, complete: 75 },
    { name: 'PR Q4', budget: 50, actual: 30, complete: 60 }
  ];

  // Pending Updates List (Compact)
  const pendingUpdates = [
    { id: '1', code: 'PR-001', name: 'VNExpress', campaign: 'Tết 2025', deadline: '05/01', days: -2, priority: 'high' },
    { id: '2', code: 'PR-002', name: 'Vietnamnet', campaign: 'Tết 2025', deadline: '06/01', days: 3, priority: 'high' },
    { id: '3', code: 'PR-005', name: 'Tuổi Trẻ', campaign: 'Business', deadline: '10/01', days: 7, priority: 'normal' },
    { id: '4', code: 'PR-008', name: 'Zing News', campaign: 'Business', deadline: '12/01', days: 9, priority: 'normal' },
    { id: '5', code: 'PR-010', name: 'Thanh Niên', campaign: 'Business', deadline: '15/01', days: 12, priority: 'normal' }
  ];

  // Pending Approvals (Compact)
  const pendingApprovals = [
    { id: '1', code: 'NT-001', name: 'Đợt 1 - Giai đoạn đầu', slots: 4, date: '10/01/2025', status: 'Chờ duyệt' },
    { id: '2', code: 'NT-003', name: 'Đợt 3 - Cuối tháng', slots: 2, date: '28/12/2024', status: 'Chờ duyệt' }
  ];

  // Returned Batches (Compact)
  const returnedBatches = [
    { id: '1', code: 'NT-002', name: 'Đợt 2 - Giữa tháng', reason: 'Thiếu ảnh minh chứng slot PR-003', date: '02/01/2025' }
  ];

  const getDaysColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 3) return 'text-amber-600';
    return 'text-gray-600';
  };

  const getTabStyle = (tab: typeof activeTab) => {
    return activeTab === tab
      ? 'px-4 py-2 border-b-2 border-teal-600 text-teal-600'
      : 'px-4 py-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900';
  };

  const getTabCount = (tab: typeof activeTab) => {
    switch (tab) {
      case 'pending':
        return pendingUpdates.length;
      case 'approval':
        return pendingApprovals.length;
      case 'returned':
        return returnedBatches.length;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header - Compact */}
      <div className="mb-2">
        <h1 className="text-gray-900" style={{ fontSize: '1.5rem' }}>Bảng điều khiển công việc</h1>
        <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
          Tổng quan công việc cần làm và trạng thái slot
        </p>
      </div>

      {/* Compact KPI Cards - 4x2 Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {workItems.map((item, index) => (
          <CompactCard key={index} {...item} />
        ))}
      </div>

      {/* Charts Grid - 2x2 Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Slot Status - Donut */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
            Trạng thái slot
          </h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={slotStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {slotStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {slotStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700" style={{ fontSize: '12px' }}>{item.name}</span>
                  </div>
                  <span className="text-gray-900" style={{ fontSize: '13px', fontWeight: 'var(--font-weight-semibold)' }}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700" style={{ fontSize: '12px', fontWeight: 'var(--font-weight-semibold)' }}>Tổng</span>
                  <span className="text-gray-900" style={{ fontSize: '13px', fontWeight: 'var(--font-weight-semibold)' }}>
                    {slotStatusData.reduce((sum, item) => sum + item.value, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Achievement */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
            KPI đạt được theo slot
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={kpiAchievement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="slot" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 160]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[4, 4, 0, 0]} />
              <Bar dataKey="kpi" fill="#0d9488" name="Actual" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid - 2x2 Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Budget Progress */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
            Ngân sách & Thực hiện (triệu VNĐ)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="budget" fill="#94a3b8" name="Budget" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#0d9488" name="Thực hiện" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
            Xu hướng 6 tháng (slot & giá trị)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyAcceptance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area yAxisId="left" type="monotone" dataKey="slots" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} name="Số slot" />
              <Area yAxisId="right" type="monotone" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} name="Giá trị (M)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Unified Worklist Card with Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Tabs Header */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('pending')}
              className={`${getTabStyle('pending')} transition-colors flex items-center gap-2`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
            >
              <AlertCircle className="w-4 h-4" />
              Slot cần update
              <span className={`ml-1 px-2 py-0.5 rounded-full ${
                activeTab === 'pending' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
              }`} style={{ fontSize: '10px' }}>
                {getTabCount('pending')}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('approval')}
              className={`${getTabStyle('approval')} transition-colors flex items-center gap-2`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
            >
              <Send className="w-4 h-4" />
              Chờ duyệt
              <span className={`ml-1 px-2 py-0.5 rounded-full ${
                activeTab === 'approval' ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-600'
              }`} style={{ fontSize: '10px' }}>
                {getTabCount('approval')}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('returned')}
              className={`${getTabStyle('returned')} transition-colors flex items-center gap-2`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
            >
              <FileX className="w-4 h-4" />
              Bị trả về
              <span className={`ml-1 px-2 py-0.5 rounded-full ${
                activeTab === 'returned' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
              }`} style={{ fontSize: '10px' }}>
                {getTabCount('returned')}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {/* Pending Updates */}
          {activeTab === 'pending' && (
            <div className="overflow-x-auto hide-scrollbar">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-600" style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)' }}>
                      Slot
                    </th>
                    <th className="px-3 py-2 text-left text-gray-600" style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)' }}>
                      Chiến dịch
                    </th>
                    <th className="px-3 py-2 text-left text-gray-600" style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)' }}>
                      Deadline
                    </th>
                    <th className="px-3 py-2 text-center text-gray-600" style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)' }}>
                      Còn lại
                    </th>
                    <th className="px-3 py-2 text-center text-gray-600" style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingUpdates.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900" style={{ fontSize: '12px', fontWeight: 'var(--font-weight-semibold)' }}>
                            {item.name}
                          </p>
                          {item.priority === 'high' && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-500" style={{ fontSize: '10px' }}>{item.code}</p>
                      </td>
                      <td className="px-3 py-3 text-gray-700" style={{ fontSize: '12px' }}>
                        {item.campaign}
                      </td>
                      <td className="px-3 py-3 text-gray-700" style={{ fontSize: '12px' }}>
                        {item.deadline}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`${getDaysColor(item.days)}`} style={{ fontSize: '12px', fontWeight: 'var(--font-weight-semibold)' }}>
                          {item.days < 0 ? `Quá ${Math.abs(item.days)}d` : `${item.days}d`}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button className="px-3 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors" style={{ fontSize: '11px' }}>
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pending Approvals */}
          {activeTab === 'approval' && (
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900" style={{ fontSize: '13px', fontWeight: 'var(--font-weight-semibold)' }}>
                          {item.code} - {item.name}
                        </p>
                        <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full" style={{ fontSize: '10px' }}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-600" style={{ fontSize: '11px' }}>
                        {item.slots} slot • Gửi ngày {item.date}
                      </p>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-teal-600 border border-teal-600 rounded hover:bg-teal-50 transition-colors" style={{ fontSize: '11px' }}>
                      <Eye className="w-3 h-3" />
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Returned Batches */}
          {activeTab === 'returned' && (
            <div className="space-y-3">
              {returnedBatches.map((item) => (
                <div key={item.id} className="p-4 border-2 border-orange-300 rounded-lg bg-orange-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2" style={{ fontSize: '13px', fontWeight: 'var(--font-weight-semibold)' }}>
                        {item.code} - {item.name}
                      </p>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-orange-700" style={{ fontSize: '12px', fontWeight: 'var(--font-weight-medium)' }}>
                            Lý do: {item.reason}
                          </p>
                          <p className="text-gray-600 mt-1" style={{ fontSize: '11px' }}>
                            Trả về: {item.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2" style={{ fontSize: '12px', fontWeight: 'var(--font-weight-semibold)' }}>
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa và gửi lại
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}