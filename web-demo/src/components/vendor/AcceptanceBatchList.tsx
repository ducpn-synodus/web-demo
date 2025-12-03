import { Plus, FileText, Clock, CheckCircle, AlertCircle, Send, Eye, Edit, Trash2, Download, Search, Package, DollarSign, FileCheck, XCircle, Link as LinkIcon, Layers } from 'lucide-react';
import { useState } from 'react';

interface AcceptanceTask {
  id: string;
  taskCode: string;
  taskName: string;
  campaignCode: string;
  campaignName: string;
  subCampaignCode: string;
  subCampaignName: string;
  channel: string;
  kpiActual: string;
  actualCost: string;
  executionDate: string;
  reportLink?: string; // Link báo cáo
  acceptanceStatus: 'not_submitted' | 'draft' | 'submitted' | 'approved' | 'returned';
  draftCreatedDate?: string;
  submittedDate?: string;
  approvedDate?: string;
  returnReason?: string;
  acceptanceId?: string;
}

interface AcceptanceBatchListProps {
  onCreateAcceptance?: (taskId: string) => void;
  onView?: (acceptanceId: string) => void;
  onEdit?: (acceptanceId: string) => void;
  onDelete?: (acceptanceId: string) => void;
}

export default function AcceptanceBatchList({ onCreateAcceptance, onView, onEdit, onDelete }: AcceptanceBatchListProps) {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tasks: AcceptanceTask[] = [
    {
      id: '1',
      taskCode: 'TASK-FB-001',
      taskName: 'Bài 1: Video giới thiệu lịch bay Tết',
      campaignCode: 'CP-2025-001',
      campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
      subCampaignCode: 'SUB-001',
      subCampaignName: 'Facebook - Giai đoạn 1',
      channel: 'Facebook',
      kpiActual: '650K impressions, 28K clicks',
      actualCost: '5,000,000',
      executionDate: '01/01/2025',
      reportLink: 'https://drive.google.com/report-fb-001',
      acceptanceStatus: 'approved',
      submittedDate: '02/01/2025',
      approvedDate: '03/01/2025',
      acceptanceId: 'ACC-001'
    },
    {
      id: '2',
      taskCode: 'TASK-FB-002',
      taskName: 'Bài 2: Carousel Ads - Ưu đãi vé sớm',
      campaignCode: 'CP-2025-001',
      campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
      subCampaignCode: 'SUB-001',
      subCampaignName: 'Facebook - Giai đoạn 1',
      channel: 'Facebook',
      kpiActual: '420K impressions, 15K clicks',
      actualCost: '4,500,000',
      executionDate: '03/01/2025',
      reportLink: 'https://drive.google.com/report-fb-002',
      acceptanceStatus: 'approved',
      submittedDate: '04/01/2025',
      approvedDate: '05/01/2025',
      acceptanceId: 'ACC-002'
    },
    {
      id: '3',
      taskCode: 'TASK-FB-003',
      taskName: 'Bài 3: Post chia sẻ trải nghiệm khách hàng',
      campaignCode: 'CP-2025-001',
      campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
      subCampaignCode: 'SUB-001',
      subCampaignName: 'Facebook - Giai đoạn 1',
      channel: 'Facebook',
      kpiActual: '280K reach, 7.5K engagement',
      actualCost: '3,000,000',
      executionDate: '05/01/2025',
      reportLink: 'https://drive.google.com/report-fb-003',
      acceptanceStatus: 'returned',
      submittedDate: '06/01/2025',
      returnReason: 'Thiếu ảnh minh chứng engagement và file báo cáo chi tiết từ Facebook Insights',
      acceptanceId: 'ACC-003'
    },
    {
      id: '4',
      taskCode: 'TASK-PR-001',
      taskName: 'Bài PR VNExpress - Ra mắt lịch bay Tết',
      campaignCode: 'CP-2025-001',
      campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
      subCampaignCode: 'SUB-002',
      subCampaignName: 'PR Online - Giai đoạn 1',
      channel: 'PR',
      kpiActual: '1 bài đăng - 15.2K views',
      actualCost: '15,000,000',
      executionDate: '10/01/2025',
      reportLink: 'https://vnexpress.net/vna-tet-2025',
      acceptanceStatus: 'submitted',
      submittedDate: '12/01/2025',
      acceptanceId: 'ACC-004'
    },
    {
      id: '5',
      taskCode: 'TASK-PR-002',
      taskName: 'Bài PR Dân Trí - Ưu đãi vé dịp lễ',
      campaignCode: 'CP-2025-001',
      campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
      subCampaignCode: 'SUB-002',
      subCampaignName: 'PR Online - Giai đoạn 1',
      channel: 'PR',
      kpiActual: '1 bài đăng - 22.5K views',
      actualCost: '18,500,000',
      executionDate: '12/01/2025',
      reportLink: 'https://dantri.com.vn/vna-promotion',
      acceptanceStatus: 'draft',
      draftCreatedDate: '13/01/2025',
      acceptanceId: 'ACC-005'
    },
    {
      id: '6',
      taskCode: 'TASK-FB-004',
      taskName: 'Bài 4: Video Live - Talkshow du lịch Tết',
      campaignCode: 'CP-2025-001',
      campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
      subCampaignCode: 'SUB-001',
      subCampaignName: 'Facebook - Giai đoạn 1',
      channel: 'Facebook',
      kpiActual: '120K views, 3.5K comments',
      actualCost: '8,000,000',
      executionDate: '15/01/2025',
      reportLink: null,
      acceptanceStatus: 'not_submitted'
    },
    {
      id: '7',
      taskCode: 'TASK-PR-003',
      taskName: 'Bài PR Thanh Niên - Business Class mới',
      campaignCode: 'CP-2025-002',
      campaignName: 'Quảng bá dịch vụ Business Class',
      subCampaignCode: 'SUB-003',
      subCampaignName: 'PR Online - Quý 1/2025',
      channel: 'PR',
      kpiActual: '1 bài đăng - 18K views + Video interview',
      actualCost: '20,000,000',
      executionDate: '20/01/2025',
      reportLink: null,
      acceptanceStatus: 'not_submitted'
    },
    {
      id: '8',
      taskCode: 'TASK-FB-005',
      taskName: 'Bài 5: Post giới thiệu điểm đến mới',
      campaignCode: 'CP-2025-001',
      campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
      subCampaignCode: 'SUB-001',
      subCampaignName: 'Facebook - Giai đoạn 1',
      channel: 'Facebook',
      kpiActual: '380K reach, 12K engagement',
      actualCost: '4,000,000',
      executionDate: '18/01/2025',
      reportLink: 'https://drive.google.com/report-fb-005',
      acceptanceStatus: 'submitted',
      submittedDate: '19/01/2025',
      acceptanceId: 'ACC-006'
    }
  ];

  const getStatusBadge = (status: AcceptanceTask['acceptanceStatus']) => {
    switch (status) {
      case 'not_submitted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <XCircle className="w-3 h-3" />
            Chưa nghiệm thu
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <FileText className="w-3 h-3" />
            Bản nháp
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <Send className="w-3 h-3" />
            Chờ duyệt
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <CheckCircle className="w-3 h-3" />
            Đã duyệt
          </span>
        );
      case 'returned':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
            <AlertCircle className="w-3 h-3" />
            Yêu cầu bổ sung
          </span>
        );
    }
  };

  const getChannelColor = (channel: string) => {
    const colors: { [key: string]: string } = {
      'PR': 'bg-purple-100 text-purple-700',
      'Facebook': 'bg-blue-100 text-blue-700',
      'Digital': 'bg-cyan-100 text-cyan-700',
      'OOH': 'bg-orange-100 text-orange-700',
      'TVC': 'bg-red-100 text-red-700',
      'Event': 'bg-green-100 text-green-700'
    };
    return colors[channel] || 'bg-gray-100 text-gray-700';
  };

  const stats = {
    total: tasks.length,
    notSubmitted: tasks.filter(t => t.acceptanceStatus === 'not_submitted').length,
    draft: tasks.filter(t => t.acceptanceStatus === 'draft').length,
    submitted: tasks.filter(t => t.acceptanceStatus === 'submitted').length,
    approved: tasks.filter(t => t.acceptanceStatus === 'approved').length,
    returned: tasks.filter(t => t.acceptanceStatus === 'returned').length,
    totalValue: tasks.reduce((sum, t) => sum + parseInt(t.actualCost.replace(/,/g, '')), 0),
    approvedValue: tasks.filter(t => t.acceptanceStatus === 'approved').reduce((sum, t) => sum + parseInt(t.actualCost.replace(/,/g, '')), 0)
  };

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.acceptanceStatus !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return task.taskCode.toLowerCase().includes(term) || 
             task.taskName.toLowerCase().includes(term) ||
             task.campaignCode.toLowerCase().includes(term) ||
             task.campaignName.toLowerCase().includes(term) ||
             task.subCampaignCode.toLowerCase().includes(term) ||
             task.subCampaignName.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Biên bản nghiệm thu</h1>
          {/* Removed subtitle text */}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Tổng task</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                {stats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Chưa NT</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                {stats.notSubmitted}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Bản nháp</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                {stats.draft}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Chờ duyệt</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                {stats.submitted}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Đã duyệt</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                {stats.approved}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Trả về</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                {stats.returned}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Tổng giá trị</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                {(stats.totalValue / 1000000).toFixed(0)}M
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
              placeholder="Tìm kiếm theo mã task, tên task, sub-campaign, hoặc campaign..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="not_submitted">Chưa nghiệm thu</option>
              <option value="draft">Bản nháp</option>
              <option value="submitted">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="returned">Yêu cầu bổ sung</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-xl border-2 ${
              task.acceptanceStatus === 'returned' ? 'border-red-300' : 
              task.acceptanceStatus === 'not_submitted' ? 'border-amber-200' :
              'border-gray-200'
            } p-5 hover:shadow-lg transition-all`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded ${getChannelColor(task.channel)}`} style={{ fontSize: 'var(--text-xs)' }}>
                    {task.channel}
                  </span>
                  <h3 className="text-gray-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                    {task.taskCode} - {task.taskName}
                  </h3>
                  {getStatusBadge(task.acceptanceStatus)}
                </div>
                
                {/* Campaign & Sub-campaign hierarchy */}
                <div className="flex items-start gap-2 mb-3 text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                  <Layers className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5">
                      <span className="text-gray-900" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        {task.campaignCode}
                      </span>
                      <span className="text-gray-500">{task.campaignName}</span>
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-teal-50 rounded">
                      <span className="text-teal-700" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        {task.subCampaignCode}
                      </span>
                      <span className="text-teal-600">{task.subCampaignName}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span>Chi phí: <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{task.actualCost} VNĐ</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Thực hiện: <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{task.executionDate}</span></span>
                  </div>
                  {task.reportLink && (
                    <div className="flex items-center gap-1.5 col-span-2">
                      <LinkIcon className="w-4 h-4 text-blue-600" />
                      <a 
                        href={task.reportLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-700 hover:underline truncate"
                      >
                        {task.reportLink}
                      </a>
                    </div>
                  )}
                  {task.approvedDate && (
                    <div className="flex items-center gap-1.5 text-green-600 col-span-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Đã duyệt: <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{task.approvedDate}</span></span>
                    </div>
                  )}
                </div>

                {/* Return Reason */}
                {task.acceptanceStatus === 'returned' && task.returnReason && (
                  <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700" style={{ fontSize: 'var(--text-sm)' }}>
                      <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Lý do trả về:</span> {task.returnReason}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {task.acceptanceStatus === 'not_submitted' && (
                  <button
                    onClick={() => onCreateAcceptance?.(task.id)}
                    className="flex items-center gap-2 px-3 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                    style={{ fontSize: 'var(--text-sm)', backgroundColor: '#006885' }}
                  >
                    <FileCheck className="w-4 h-4" />
                    Lập yêu cầu NT
                  </button>
                )}
                {task.acceptanceStatus === 'draft' && (
                  <>
                    <button
                      onClick={() => onEdit?.(task.acceptanceId!)}
                      className="p-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(task.acceptanceId!)}
                      className="p-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
                {task.acceptanceStatus === 'returned' && (
                  <button
                    onClick={() => onEdit?.(task.acceptanceId!)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <Edit className="w-4 h-4" />
                    Sửa và gửi lại
                  </button>
                )}
                {(task.acceptanceStatus === 'submitted' || task.acceptanceStatus === 'approved') && (
                  <button
                    className="p-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Tải PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                {task.acceptanceId && (
                  <button
                    onClick={() => onView?.(task.acceptanceId!)}
                    className="flex items-center gap-2 px-3 py-2 text-white rounded-lg hover:opacity-90 transition-all"
                    style={{ fontSize: 'var(--text-sm)', backgroundColor: '#006885' }}
                  >
                    <Eye className="w-4 h-4" />
                    Xem
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Không tìm thấy task</h3>
          <p className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
            {searchTerm || filter !== 'all' 
              ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
              : 'Chưa có task nào cần nghiệm thu'}
          </p>
        </div>
      )}
    </div>
  );
}
