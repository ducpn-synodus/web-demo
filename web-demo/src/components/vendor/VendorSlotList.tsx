import { Search, Filter, Package, Edit, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Slot {
  id: string;
  code: string;
  campaign: string;
  campaignCode: string;
  channel: string;
  name: string;
  kpiCommitted: string;
  kpiActual?: string;
  timeline: string;
  status: 'pending_update' | 'updated' | 'accepted';
  cost?: string;
}

export default function VendorSlotList({ onUpdateSlot }: { onUpdateSlot?: (slotId: string) => void }) {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const slots: Slot[] = [
    {
      id: '1',
      code: 'PR-001',
      campaign: 'Chiến dịch Tết Nguyên Đán 2025',
      campaignCode: 'CP-2025-001',
      channel: 'PR',
      name: 'PR – VNExpress',
      kpiCommitted: '1 bài đăng',
      kpiActual: '1 bài đăng - 15.2K views',
      timeline: '10/01/2025',
      status: 'updated',
      cost: '15,000,000'
    },
    {
      id: '2',
      code: 'PR-002',
      campaign: 'Chiến dịch Tết Nguyên Đán 2025',
      campaignCode: 'CP-2025-001',
      channel: 'PR',
      name: 'PR – Vietnamnet',
      kpiCommitted: '1 bài đăng',
      timeline: '12/01/2025',
      status: 'pending_update'
    },
    {
      id: '3',
      code: 'PR-003',
      campaign: 'Chiến dịch Tết Nguyên Đán 2025',
      campaignCode: 'CP-2025-001',
      channel: 'PR',
      name: 'PR – Dân Trí',
      kpiCommitted: '1 bài đăng + PR native',
      kpiActual: '1 bài đăng - 22.5K views',
      timeline: '01/01/2025 - 07/01/2025',
      status: 'accepted',
      cost: '18,500,000'
    },
    {
      id: '4',
      code: 'PR-004',
      campaign: 'Quảng bá dịch vụ Business Class',
      campaignCode: 'CP-2025-002',
      channel: 'PR',
      name: 'PR – Thanh Niên',
      kpiCommitted: '1 bài đăng + Interview',
      kpiActual: '1 bài đăng - 18K views + Video interview',
      timeline: '15/01/2025',
      status: 'updated',
      cost: '20,000,000'
    }
  ];

  const getStatusBadge = (status: Slot['status']) => {
    switch (status) {
      case 'pending_update':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <Clock className="w-3 h-3" />
            Chờ update
          </span>
        );
      case 'updated':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <TrendingUp className="w-3 h-3" />
            Đã update
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <CheckCircle className="w-3 h-3" />
            Đã nghiệm thu
          </span>
        );
    }
  };

  const getChannelColor = (channel: string) => {
    const colors: { [key: string]: string } = {
      'PR': 'bg-purple-100 text-purple-700',
      'Digital': 'bg-blue-100 text-blue-700',
      'OOH': 'bg-orange-100 text-orange-700',
      'TVC': 'bg-red-100 text-red-700',
      'Event': 'bg-green-100 text-green-700'
    };
    return colors[channel] || 'bg-gray-100 text-gray-700';
  };

  const stats = {
    total: slots.length,
    pending: slots.filter(s => s.status === 'pending_update').length,
    updated: slots.filter(s => s.status === 'updated').length,
    accepted: slots.filter(s => s.status === 'accepted').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Slot được giao</h1>
        <p className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
          Tất cả các slot bạn phụ trách
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Tổng slot</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                {stats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Chờ update</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                {stats.pending}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Đã update</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                {stats.updated}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Đã nghiệm thu</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                {stats.accepted}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm slot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending_update">Chờ update</option>
              <option value="updated">Đã update</option>
              <option value="accepted">Đã nghiệm thu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Slots Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Mã Slot
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Chiến dịch
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Kênh
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Tên Slot
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  KPI Cam kết
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  KPI Thực tế
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Chi phí
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {slots.map((slot) => (
                <tr key={slot.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    {slot.code}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                      {slot.campaign}
                    </div>
                    <div className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                      {slot.campaignCode}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${getChannelColor(slot.channel)}`} style={{ fontSize: 'var(--text-xs)' }}>
                      {slot.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                    {slot.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                    {slot.kpiCommitted}
                  </td>
                  <td className="px-6 py-4">
                    {slot.kpiActual ? (
                      <div className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                        {slot.kpiActual}
                      </div>
                    ) : (
                      <span className="text-gray-400" style={{ fontSize: 'var(--text-sm)' }}>
                        Chưa cập nhật
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                    {slot.cost ? `${slot.cost} VNĐ` : '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                    {slot.timeline}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(slot.status)}
                  </td>
                  <td className="px-6 py-4">
                    {slot.status !== 'accepted' && (
                      <button
                        onClick={() => onUpdateSlot?.(slot.id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <Edit className="w-4 h-4" />
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
