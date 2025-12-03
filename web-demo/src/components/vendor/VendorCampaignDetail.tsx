import { ArrowLeft, Calendar, User, Package, TrendingUp, Edit, DollarSign, Target, Users, FileText, Download, CheckCircle, Clock, AlertCircle, ExternalLink, Upload, MessageSquare, FileCheck } from 'lucide-react';
import { useState } from 'react';

interface Slot {
  id: string;
  code: string;
  channel: string;
  name: string;
  kpiCommitted: string;
  kpiActual?: string;
  timeline: string;
  budget: string;
  usedBudget?: string;
  status: 'pending_update' | 'updated' | 'accepted';
  startDate: string;
  endDate: string;
  deliverable: string;
}

interface CampaignDetailProps {
  onBack?: () => void;
  onUpdateSlot?: (slotId: string) => void;
  onCreateAcceptance?: (slotId: string) => void;
}

export default function VendorCampaignDetail({ onBack, onUpdateSlot, onCreateAcceptance }: CampaignDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'slots' | 'timeline'>('info');

  const campaign = {
    id: '1',
    code: 'CP-2025-001',
    name: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    startDate: '01/01/2025',
    endDate: '15/02/2025',
    picName: 'Nguyễn Văn A',
    picEmail: 'nguyenvana@vietnamairlines.com',
    picPhone: '0901 234 567',
    totalBudget: '100,000,000',
    usedBudget: '65,000,000',
    remainingBudget: '35,000,000',
    targetAudience: 'Hành khách nội địa, gia đình, người đi công tác 25-45 tuổi',
    channels: ['Facebook'],
    objectives: [
      'Tăng 30% lượng booking vé Tết qua kênh online',
      'Reach 2 triệu người dùng Facebook trong tháng 1-2/2025',
      'Tăng 25% engagement rate so với các chiến dịch trước'
    ],
    brief: 'Chiến dịch quảng bá chương trình bán vé máy bay Tết Bính Ngọ 2026 trên Facebook, tập trung vào việc thu hút khách hàng đặt vé sớm với các ưu đãi hấp dẫn. Nội dung cảm xúc về đoàn viên gia đình và hành trình về quê ăn Tết.',
    kpiTarget: 100,
    kpiActual: 125,
    documents: [
      { name: 'Brief Chiến dịch Tết 2026.pdf', size: '3.2 MB', date: '15/12/2024' },
      { name: 'Facebook Content Calendar.xlsx', size: '850 KB', date: '18/12/2024' },
      { name: 'Creative Assets Package.zip', size: '120 MB', date: '15/12/2024' }
    ]
  };

  const slots: Slot[] = [
    {
      id: '1',
      code: 'FB-001',
      channel: 'Facebook',
      name: 'Facebook Ads - Video campaign Đoàn viên Tết',
      kpiCommitted: '500K impressions, 20K clicks',
      kpiActual: '650K impressions, 28K clicks',
      timeline: '01/01/2025 - 10/01/2025',
      startDate: '01/01/2025',
      endDate: '10/01/2025',
      budget: '25,000,000',
      usedBudget: '25,000,000',
      status: 'accepted',
      deliverable: 'Video ads + Campaign report + Analytics'
    },
    {
      id: '2',
      code: 'FB-002',
      channel: 'Facebook',
      name: 'Facebook Post - Khuyến mãi vé Tết sớm',
      kpiCommitted: '200K reach, 5K engagement',
      kpiActual: '280K reach, 7.5K engagement',
      timeline: '05/01/2025',
      startDate: '05/01/2025',
      endDate: '05/01/2025',
      budget: '15,000,000',
      usedBudget: '15,000,000',
      status: 'accepted',
      deliverable: 'Post content + Screenshot + Engagement report'
    },
    {
      id: '3',
      code: 'FB-003',
      channel: 'Facebook',
      name: 'Facebook Carousel Ads - Điểm đến Tết',
      kpiCommitted: '300K impressions, 10K clicks',
      kpiActual: '350K impressions, 12K clicks',
      timeline: '10/01/2025 - 20/01/2025',
      startDate: '10/01/2025',
      endDate: '20/01/2025',
      budget: '20,000,000',
      usedBudget: '20,000,000',
      status: 'updated',
      deliverable: 'Carousel ads + Performance metrics'
    },
    {
      id: '4',
      code: 'FB-004',
      channel: 'Facebook',
      name: 'Facebook Live - Talkshow du lịch Tết',
      kpiCommitted: '100K views, 3K comments',
      timeline: '25/01/2025',
      startDate: '25/01/2025',
      endDate: '25/01/2025',
      budget: '18,000,000',
      status: 'pending_update',
      deliverable: 'Live session + Recording + Analytics'
    },
    {
      id: '5',
      code: 'FB-005',
      channel: 'Facebook',
      name: 'Facebook Stories - Countdown Tết',
      kpiCommitted: '150K impressions, 8K taps',
      timeline: '01/02/2025 - 10/02/2025',
      startDate: '01/02/2025',
      endDate: '10/02/2025',
      budget: '12,000,000',
      status: 'pending_update',
      deliverable: 'Stories series + Analytics report'
    }
  ];

  const timelineEvents = [
    { date: '01/01/2025', type: 'start', title: 'Khởi động chiến dịch', description: 'Chiến dịch chính thức bắt đầu' },
    { date: '01/01/2025', type: 'slot', slotCode: 'FB-001', title: 'Facebook Ads - Video Đoàn viên Tết', status: 'accepted' },
    { date: '05/01/2025', type: 'slot', slotCode: 'FB-002', title: 'Facebook Post - Khuyến mãi vé', status: 'accepted' },
    { date: '10/01/2025', type: 'slot', slotCode: 'FB-003', title: 'Facebook Carousel Ads - Điểm đến', status: 'updated' },
    { date: '25/01/2025', type: 'slot', slotCode: 'FB-004', title: 'Facebook Live - Talkshow', status: 'pending_update' },
    { date: '01/02/2025', type: 'slot', slotCode: 'FB-005', title: 'Facebook Stories - Countdown', status: 'pending_update' },
    { date: '31/01/2025', type: 'milestone', title: 'Review giữa kỳ', description: 'Đánh giá hiệu quả chiến dịch và điều chỉnh nội dung' },
    { date: '10/02/2025', type: 'milestone', title: 'Sprint cuối', description: 'Tăng cường quảng cáo vào tuần lễ Tết' },
    { date: '15/02/2025', type: 'end', title: 'Kết thúc chiến dịch', description: 'Nghiệm thu toàn bộ deliverables và báo cáo tổng kết' }
  ];

  const getStatusBadge = (status: Slot['status']) => {
    switch (status) {
      case 'pending_update':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
            <Clock className="w-3 h-3" />
            Chờ update
          </span>
        );
      case 'updated':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
            <Upload className="w-3 h-3" />
            Đã update
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
            <CheckCircle className="w-3 h-3" />
            Đã nghiệm thu
          </span>
        );
    }
  };

  const getTimelineIcon = (type: string, status?: string) => {
    if (type === 'start') return { icon: CheckCircle, color: 'bg-green-500' };
    if (type === 'end') return { icon: Clock, color: 'bg-gray-400' };
    if (type === 'milestone') return { icon: Target, color: 'bg-blue-500' };
    if (type === 'slot') {
      if (status === 'accepted') return { icon: CheckCircle, color: 'bg-green-500' };
      if (status === 'updated') return { icon: Upload, color: 'bg-blue-500' };
      return { icon: Clock, color: 'bg-amber-500' };
    }
    return { icon: Calendar, color: 'bg-gray-400' };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        style={{ fontSize: 'var(--text-sm)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </button>

      {/* Header with Campaign Name */}
      <div className="bg-white border border-gray-200 rounded-lg px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
              {campaign.code}
            </span>
            <span className="text-gray-300">|</span>
            <h1 className="text-gray-900">{campaign.name}</h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Đang chạy
            </span>
          </div>
        </div>
      </div>

      {/* Stats Overview - Compact */}
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-blue-300 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <Package className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-blue-600 mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {slots.length}
            </p>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Tổng slot</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-orange-300 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-5 h-5 text-orange-600 mb-2" />
            <p className="text-orange-600 mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {slots.filter(s => s.status === 'pending_update').length}
            </p>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Chờ update</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-cyan-300 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <Upload className="w-5 h-5 text-cyan-600 mb-2" />
            <p className="text-cyan-600 mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {slots.filter(s => s.status === 'updated').length}
            </p>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Đã update</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-green-300 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-green-600 mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {slots.filter(s => s.status === 'accepted').length}
            </p>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Đã nghiệm thu</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-teal-300 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <DollarSign className="w-5 h-5 text-teal-600 mb-2" />
            <p className="text-teal-600 mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              500M
            </p>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Tổng NS</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-purple-300 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-purple-600 mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              {campaign.kpiActual}%
            </p>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>KPI</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 hover:border-amber-300 hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <Calendar className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-amber-600 mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
              30
            </p>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Ngày còn lại</p>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 ${activeTab === 'info' ? 'bg-white border-b-2 text-gray-900' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', borderColor: activeTab === 'info' ? '#006885' : 'transparent' }}
            >
              Thông tin chiến dịch
            </button>
            <button
              onClick={() => setActiveTab('slots')}
              className={`px-6 py-3 ${activeTab === 'slots' ? 'bg-white border-b-2 text-gray-900' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', borderColor: activeTab === 'slots' ? '#006885' : 'transparent' }}
            >
              Danh sách Slot ({slots.length})
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-3 ${activeTab === 'timeline' ? 'bg-white border-b-2 text-gray-900' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', borderColor: activeTab === 'timeline' ? '#006885' : 'transparent' }}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Campaign Info Table */}
              <div>
                <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Thông tin cơ bản</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-600 bg-gray-50" style={{ fontSize: 'var(--text-sm)', width: '200px' }}>
                          Thời gian triển khai
                        </td>
                        <td className="px-4 py-2.5 text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                          {campaign.startDate} - {campaign.endDate} <span className="text-gray-500">(46 ngày)</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-600 bg-gray-50" style={{ fontSize: 'var(--text-sm)' }}>
                          PIC Vietnam Airlines
                        </td>
                        <td className="px-4 py-2.5 text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                          {campaign.picName} • {campaign.picEmail} • {campaign.picPhone}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-600 bg-gray-50" style={{ fontSize: 'var(--text-sm)' }}>
                          Đối tượng mục tiêu
                        </td>
                        <td className="px-4 py-2.5 text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                          {campaign.targetAudience}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-600 bg-gray-50" style={{ fontSize: 'var(--text-sm)' }}>
                          Kênh truyền thông
                        </td>
                        <td className="px-4 py-2.5" style={{ fontSize: 'var(--text-sm)' }}>
                          <div className="flex flex-wrap gap-2">
                            {campaign.channels.map((channel, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
                                {channel}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Budget & KPI */}
              <div>
                <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Ngân sách & KPI</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>Ngân sách</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Tổng phân bổ</span>
                        <span className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{campaign.totalBudget} VND</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Đã sử dụng</span>
                        <span className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{campaign.usedBudget} VND</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Còn lại</span>
                        <span className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{campaign.remainingBudget} VND</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-gray-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>KPI Performance</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>KPI mục tiêu</span>
                        <span className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{campaign.kpiTarget}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>KPI thực tế</span>
                        <span className="text-green-600" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{campaign.kpiActual}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Đạt được</span>
                        <span className="text-green-600" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>+{campaign.kpiActual - campaign.kpiTarget}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '104%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Mục tiêu chiến dịch</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <ul className="space-y-2.5">
                    {campaign.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                          {objective}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Brief */}
              <div>
                <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Brief chiến dịch</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                    {campaign.brief}
                  </p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-gray-900 mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Tài liệu đính kèm</h3>
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {campaign.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{doc.name}</p>
                          <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'slots' && (
            <div className="space-y-4">
              {/* Slots List - Card Style */}
              <div className="space-y-3">
                {slots.map((slot, index) => (
                  <div 
                    key={slot.id} 
                    className="border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Slot Header */}
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-white border border-gray-300 text-gray-900 rounded" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                            {slot.code}
                          </span>
                          <h4 className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {slot.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(slot.status)}
                          {slot.status === 'pending_update' && (
                            <button
                              onClick={() => onUpdateSlot?.(slot.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-white rounded hover:opacity-90 transition-all"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', backgroundColor: '#006885' }}
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Cập nhật KPI
                            </button>
                          )}
                          {slot.status === 'updated' && (
                            <button
                              onClick={() => onCreateAcceptance?.(slot.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-white rounded hover:opacity-90 transition-all"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', backgroundColor: '#006885' }}
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                              Lập biên bản NT
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Slot Content */}
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-3">
                          {/* Timeline */}
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                                Thời gian thực hiện
                              </span>
                            </div>
                            <p className="text-gray-900 pl-6" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {slot.timeline}
                            </p>
                          </div>

                          {/* Budget */}
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                                Ngân sách
                              </span>
                            </div>
                            <div className="pl-6">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Phân bổ:</span>
                                <span className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {slot.budget} VND
                                </span>
                              </div>
                              {slot.usedBudget && (
                                <>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Đã sử dụng:</span>
                                    <span className="text-green-600" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                      {slot.usedBudget} VND
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-green-600 h-1.5 rounded-full transition-all" 
                                      style={{ width: slot.usedBudget === slot.budget ? '100%' : '0%' }}
                                    ></div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Deliverable */}
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                                Deliverable yêu cầu
                              </span>
                            </div>
                            <p className="text-gray-700 pl-6" style={{ fontSize: 'var(--text-sm)' }}>
                              {slot.deliverable}
                            </p>
                          </div>
                        </div>

                        {/* Right Column - KPI */}
                        <div className="space-y-3">
                          {/* KPI Committed */}
                          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-600" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                KPI Cam kết
                              </span>
                            </div>
                            <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {slot.kpiCommitted}
                            </p>
                          </div>

                          {/* KPI Actual */}
                          <div className={`border rounded-lg p-3 ${
                            slot.kpiActual 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-amber-200 bg-amber-50'
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              {slot.kpiActual ? (
                                <>
                                  <TrendingUp className="w-4 h-4 text-green-600" />
                                  <span className="text-green-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    KPI Thực tế
                                  </span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-4 h-4 text-amber-600" />
                                  <span className="text-amber-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    KPI Thực tế
                                  </span>
                                </>
                              )}
                            </div>
                            {slot.kpiActual ? (
                              <p className="text-green-700" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                {slot.kpiActual}
                              </p>
                            ) : (
                              <p className="text-amber-600" style={{ fontSize: 'var(--text-sm)' }}>
                                Chưa cập nhật - vui lòng cập nhật kết quả thực tế
                              </p>
                            )}
                          </div>

                          {/* Performance Indicator */}
                          {slot.kpiActual && (
                            <div className="flex items-center gap-2 p-2 bg-green-100 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-700" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                                Vượt chỉ tiêu cam kết
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-500 mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                  Chú thích trạng thái:
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
                      <CheckCircle className="w-3 h-3" />
                      Đã nghiệm thu
                    </span>
                    <span className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>- VNA đã xác nhận và chấp nhận deliverable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
                      <Upload className="w-3 h-3" />
                      Đã update
                    </span>
                    <span className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>- Chờ VNA review và nghiệm thu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
                      <Clock className="w-3 h-3" />
                      Chờ update
                    </span>
                    <span className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>- Cần cập nhật KPI thực tế</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Lịch sử triển khai chiến dịch</h3>
                <div className="flex items-center gap-2 text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                  <Calendar className="w-4 h-4" />
                  {campaign.startDate} - {campaign.endDate}
                </div>
              </div>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Timeline Events */}
                <div className="space-y-6">
                  {timelineEvents.map((event, idx) => {
                    const { icon: Icon, color } = getTimelineIcon(event.type, event.status);
                    return (
                      <div key={idx} className="relative flex items-start gap-4 pl-10">
                        {/* Icon Circle */}
                        <div className={`absolute left-0 w-8 h-8 ${color} rounded-full flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-all">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {event.slotCode && (
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    {event.slotCode}
                                  </span>
                                )}
                                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                  {event.title}
                                </p>
                              </div>
                              {event.description && (
                                <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                                  {event.description}
                                </p>
                              )}
                              {event.status && (
                                <div className="mt-2">
                                  {getStatusBadge(event.status as Slot['status'])}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                              <Clock className="w-3.5 h-3.5" />
                              {event.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}