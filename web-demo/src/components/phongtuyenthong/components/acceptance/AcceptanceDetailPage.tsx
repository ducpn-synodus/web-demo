import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Edit3,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Video,
  AlertCircle,
  MessageSquare,
  Clock,
  DollarSign,
  Target,
  Calendar,
  Building,
  User,
  Send,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';

interface AcceptanceDetailPageProps {
  requestId: string;
  onBack: () => void;
}

interface SlotItem {
  id: string;
  slotCode: string;
  slotName: string;
  channel: string;
  kpiPlan: string;
  kpiActual: string;
  kpiPercent: number;
  costPlan: number;
  costActual: number;
  status: 'pending' | 'approved' | 'rejected';
  evidenceCount: number;
  taskName?: string;
  vendorNote?: string;
}

interface Comment {
  id: string;
  author: string;
  role: 'vna' | 'vendor';
  content: string;
  timestamp: string;
}

interface StatusHistory {
  id: string;
  status: string;
  actor: string;
  timestamp: string;
  note?: string;
}

// Mock data
const mockBatchDetail = {
  id: '1',
  batchCode: 'ACPT-2026-001',
  campaignName: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
  subCampaignName: 'Flash Sale Vé Tết - Facebook',
  vendorName: 'Admicro',
  vendorTaxCode: '0123456789',
  vendorContact: 'Nguyễn Văn A - 0912345678 - nguyenvana@admicro.vn',
  periodFrom: '01/02/2026',
  periodTo: '15/02/2026',
  totalCost: 42000000,
  submittedDate: '05/02/2026',
  status: 'reviewing',
  assignee: 'Minh Thảo',
};

const mockSlots: SlotItem[] = [
  {
    id: '1',
    slotCode: 'Slot-FB-001',
    slotName: 'Quảng cáo Facebook Reach - Tuần 1 tháng 1',
    channel: 'Facebook Ads',
    kpiPlan: '1M reach',
    kpiActual: '1.2M reach',
    kpiPercent: 120,
    costPlan: 10000000,
    costActual: 10500000,
    status: 'pending',
    evidenceCount: 5,
    taskName: 'Chạy quảng cáo Facebook Ads - Tuần 1',
    vendorNote: 'Chiến dịch đạt 120% KPI, vượt mục tiêu ban đầu. Đã gửi đầy đủ screenshot từ Facebook Ads Manager.',
  },
  {
    id: '2',
    slotCode: 'Slot-FB-002',
    slotName: 'Video Engagement Campaign - Tết 2026',
    channel: 'Facebook Ads',
    kpiPlan: '500K views',
    kpiActual: '480K views',
    kpiPercent: 96,
    costPlan: 12000000,
    costActual: 11500000,
    status: 'pending',
    evidenceCount: 4,
    taskName: 'Chạy quảng cáo Facebook Ads - Tuần 2',
    vendorNote: 'Đạt 96% KPI, tiết kiệm 500K so với budget. Minh chứng kèm báo cáo chi tiết.',
  },
  {
    id: '3',
    slotCode: 'Slot-FB-003',
    slotName: 'Facebook Video Ads - New Route Launch',
    channel: 'Facebook Video',
    kpiPlan: '2M views',
    kpiActual: '1.8M views',
    kpiPercent: 90,
    costPlan: 10000000,
    costActual: 10000000,
    status: 'pending',
    evidenceCount: 6,
    taskName: 'Video Ads - Tuần 1',
    vendorNote: 'Đạt 90% KPI, engagement rate tốt 8.5%. Đã upload đầy đủ video và screenshot metrics.',
  },
  {
    id: '4',
    slotCode: 'Slot-FB-004',
    slotName: 'Click Campaign - Promotion Q1',
    channel: 'Facebook Ads',
    kpiPlan: '100K clicks',
    kpiActual: '105K clicks',
    kpiPercent: 105,
    costPlan: 10000000,
    costActual: 10000000,
    status: 'pending',
    evidenceCount: 3,
    taskName: 'Chạy quảng cáo Facebook Ads - Tuần 3',
    vendorNote: 'Vượt KPI 5%, CTR đạt 3.2%. Minh chứng đính kèm file Excel và PDF report.',
  },
];

const mockEvidence = [
  { id: '1', slotId: '1', type: 'image', name: 'Screenshot_Report_01.png', url: '#' },
  { id: '2', slotId: '1', type: 'pdf', name: 'FB_Ads_Report.pdf', url: '#' },
  { id: '3', slotId: '1', type: 'link', name: 'Link báo cáo Facebook', url: 'https://business.facebook.com/...' },
  { id: '4', slotId: '2', type: 'excel', name: 'KPI_Report.xlsx', url: '#' },
  { id: '5', slotId: '2', type: 'image', name: 'Evidence_01.png', url: '#' },
];

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Nguyễn Văn A (Admicro)',
    role: 'vendor',
    content: 'Đã gửi đầy đủ minh chứng cho 4 slots, KPI đạt trung bình 102.75%. Xin VNA xem xét duyệt.',
    timestamp: '05/02/2026 09:30',
  },
  {
    id: '2',
    author: 'Minh Thảo (VNA)',
    role: 'vna',
    content: 'Đã nhận yêu cầu, đang rà soát minh chứng. Dự kiến hoàn thành trong 2 ngày làm việc.',
    timestamp: '05/02/2026 14:15',
  },
];

const mockHistory: StatusHistory[] = [
  { id: '1', status: 'Tạo batch', actor: 'Nguyễn Văn A (Vendor)', timestamp: '05/02/2026 09:00' },
  { id: '2', status: 'Gửi yêu cầu nghiệm thu', actor: 'Nguyễn Văn A (Vendor)', timestamp: '05/02/2026 09:30' },
  { id: '3', status: 'Chuyển sang rà soát', actor: 'Minh Thảo (VNA)', timestamp: '05/02/2026 14:15', note: 'Đã nhận và bắt đầu xử lý' },
];

export default function AcceptanceDetailPage({ requestId, onBack }: AcceptanceDetailPageProps) {
  const [slotStatuses, setSlotStatuses] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>(
    Object.fromEntries(mockSlots.map(slot => [slot.id, slot.status]))
  );
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [revisionNote, setRevisionNote] = useState('');
  const [showSlotDetailDialog, setShowSlotDetailDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);
  const [slotRejectReason, setSlotRejectReason] = useState('');
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [signaturePassword, setSignaturePassword] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value / 1000000) + 'M';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'submitted': { label: 'Chờ duyệt', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Clock },
      'reviewing': { label: 'Đang rà soát', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle },
      'need_revision': { label: 'Cần chỉnh sửa', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Edit3 },
      'approved': { label: 'Đã duyệt', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: CheckCircle2 },
      'rejected': { label: 'Từ chối', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted;
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`${config.color} border gap-1`}>
        <Icon className="size-3" />
        {config.label}
      </Badge>
    );
  };

  const getSlotStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'Chờ xử lý', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      'approved': { label: 'Đã duyệt', color: 'bg-green-50 text-green-700 border-green-200' },
      'rejected': { label: 'Từ chối', color: 'bg-red-50 text-red-700 border-red-200' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge variant="outline" className={`${config.color} border`}>
        {config.label}
      </Badge>
    );
  };

  const handleViewSlotDetail = (slot: SlotItem) => {
    setSelectedSlot(slot);
    setShowSlotDetailDialog(true);
  };

  const handleApproveSlot = (slotId: string) => {
    setSlotStatuses({ ...slotStatuses, [slotId]: 'approved' });
    setShowSlotDetailDialog(false);
  };

  const handleRejectSlot = (slotId: string) => {
    setSlotStatuses({ ...slotStatuses, [slotId]: 'rejected' });
    setShowSlotDetailDialog(false);
    setSlotRejectReason('');
  };

  const handleApproveAllQualified = () => {
    const newStatuses = { ...slotStatuses };
    mockSlots.forEach(slot => {
      if (slot.kpiPercent >= 85) {
        newStatuses[slot.id] = 'approved';
      }
    });
    setSlotStatuses(newStatuses);
  };

  const handleRejectBatch = () => {
    console.log('Reject batch:', rejectReason);
    setShowRejectDialog(false);
    setRejectReason('');
  };

  const handleRequestRevision = () => {
    console.log('Request revision:', revisionNote);
    setShowRevisionDialog(false);
    setRevisionNote('');
  };

  const handleApproveBatch = () => {
    setShowApproveDialog(false);
    setShowSignDialog(true);
  };

  const handleSign = () => {
    console.log('Signed with password:', signaturePassword);
    setShowSignDialog(false);
    setSignaturePassword('');
    // Logic ký số và hoàn thành nghiệm thu
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="size-4 text-blue-600" />;
      case 'video': return <Video className="size-4 text-purple-600" />;
      case 'pdf': return <FileText className="size-4 text-red-600" />;
      case 'excel': return <FileText className="size-4 text-green-600" />;
      case 'link': return <ExternalLink className="size-4 text-gray-600" />;
      default: return <FileText className="size-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Frame 1: Button Quay lại */}
      <div className="bg-gray-50">
        <div className="max-w-[1800px] mx-auto px-8 py-3">
          <Button variant="ghost" onClick={onBack} size="sm">
            <ArrowLeft className="size-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>

      {/* Frame 2: Header với tên + trạng thái + ngày */}
      <div className="border-b bg-white" style={{ borderColor: 'rgba(0, 104, 133, 0.1)' }}>
        <div className="max-w-[1800px] mx-auto px-8 py-5">
          <h1 className="text-2xl text-gray-900 mb-2 font-bold">{mockBatchDetail.batchCode}</h1>
          <div className="flex items-center gap-3">
            {getStatusBadge(mockBatchDetail.status)}
            <div className="text-sm text-gray-600">
              Gửi ngày {mockBatchDetail.submittedDate}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6 space-y-6">
        {/* Block 1: Thông tin chung */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Thông tin chung</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Target className="size-4 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">Chiến dịch</div>
                    <div className="text-sm text-gray-900">{mockBatchDetail.campaignName}</div>
                    {mockBatchDetail.subCampaignName && (
                      <div className="text-xs text-gray-600 mt-0.5">→ {mockBatchDetail.subCampaignName}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building className="size-4 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">Vendor</div>
                    <div className="text-sm text-gray-900">{mockBatchDetail.vendorName}</div>
                    <div className="text-xs text-gray-600 mt-0.5">MST: {mockBatchDetail.vendorTaxCode}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{mockBatchDetail.vendorContact}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="size-4 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">Khoảng thời gian nghiệm thu</div>
                    <div className="text-sm text-gray-900">{mockBatchDetail.periodFrom} → {mockBatchDetail.periodTo}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="size-4 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">Tổng chi phí yêu cầu</div>
                    <div className="text-lg text-gray-900 font-medium">{formatCurrency(mockBatchDetail.totalCost)}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="size-4 text-gray-600 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-600 mb-0.5">Người xử lý</div>
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#006885' }}>
                        {mockBatchDetail.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-sm text-gray-900">{mockBatchDetail.assignee}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Block 2: Danh sách slot trong batch */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Danh sách slot cần duyệt ({mockSlots.length} slot)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Tên slot</TableHead>
                    <TableHead>Kênh</TableHead>
                    <TableHead>KPI kế hoạch</TableHead>
                    <TableHead>KPI thực tế</TableHead>
                    <TableHead>% đạt</TableHead>
                    <TableHead>Chi phí kế hoạch</TableHead>
                    <TableHead>Chi phí thực tế</TableHead>
                    <TableHead>Minh chứng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSlots.map((slot) => (
                    <TableRow key={slot.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium text-gray-900">{slot.slotName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{slot.slotCode}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{slot.channel}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{slot.kpiPlan}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{slot.kpiActual}</div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${slot.kpiPercent >= 100 ? 'text-gray-900' : slot.kpiPercent >= 85 ? 'text-gray-900' : 'text-gray-900'}`}>
                          {slot.kpiPercent}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-600">{formatCurrency(slot.costPlan)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900 font-medium">{formatCurrency(slot.costActual)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">{slot.evidenceCount} file</div>
                      </TableCell>
                      <TableCell>
                        {getSlotStatusBadge(slotStatuses[slot.id])}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewSlotDetail(slot)}
                        >
                          <ExternalLink className="size-4 mr-1.5" />
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>



        {/* Block 4: Comment & Lịch sử xử lý */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ghi chú của vendor */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ghi chú của vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockComments.map((comment) => (
                  <div key={comment.id} className={`p-3 rounded-lg ${comment.role === 'vna' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900">{comment.author}</div>
                      <div className="text-xs text-gray-500">{comment.timestamp}</div>
                    </div>
                    <div className="text-sm text-gray-700">{comment.content}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lịch sử xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistory.map((history, index) => (
                  <div key={history.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-8 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#006885' }}>
                        {index + 1}
                      </div>
                      {index < mockHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-sm font-medium text-gray-900">{history.status}</div>
                      <div className="text-xs text-gray-600 mt-1">{history.actor}</div>
                      <div className="text-xs text-gray-500 mt-1">{history.timestamp}</div>
                      {history.note && (
                        <div className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">{history.note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons - Fixed Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg" style={{ borderColor: 'rgba(0, 104, 133, 0.1)' }}>
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowRevisionDialog(true)}>
              <Edit3 className="size-4 mr-2" />
              Yêu cầu bổ sung
            </Button>
            <Button variant="outline" onClick={() => setShowRejectDialog(true)}>
              <XCircle className="size-4 mr-2" />
              Từ chối
            </Button>
            <Button onClick={() => setShowApproveDialog(true)} style={{ backgroundColor: '#006885' }}>
              <CheckCircle2 className="size-4 mr-2" />
              Duyệt nghiệm thu
            </Button>
          </div>
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Từ chối nghiệm thu</DialogTitle>
            <DialogDescription className="mt-1">
              Vui lòng nhập lý do từ chối nghiệm thu {mockBatchDetail.batchCode}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-1">
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">Lý do từ chối</label>
              <textarea
                placeholder="Nhập lý do từ chối..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full h-[136px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)} className="h-11">
              Hủy
            </Button>
            <Button onClick={handleRejectBatch} className="h-11 bg-red-600 hover:bg-red-700 text-white">
              <XCircle className="size-4 mr-2" />
              Từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Revision Dialog */}
      <Dialog open={showRevisionDialog} onOpenChange={setShowRevisionDialog}>
        <DialogContent className="max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Yêu cầu bổ sung</DialogTitle>
            <DialogDescription className="mt-1">
              Gửi yêu cầu bổ sung tài liệu/thông tin cho {mockBatchDetail.batchCode}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-1">
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">Nội dung yêu cầu bổ sung</label>
              <textarea
                placeholder="Nhập nội dung cần vendor bổ sung..."
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                className="w-full h-[136px] px-3 py-2.5 text-sm border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRevisionDialog(false)} className="h-11">
              Hủy
            </Button>
            <Button onClick={handleRequestRevision} style={{ backgroundColor: '#006885' }} className="h-11 text-white">
              <Edit3 className="size-4 mr-2" />
              Gửi yêu cầu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Xác nhận duyệt nghiệm thu</DialogTitle>
            <DialogDescription className="mt-1">
              Bạn có chắc chắn muốn duyệt nghiệm thu {mockBatchDetail.batchCode}?
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-1">
            <div className="p-4 bg-[#F3F8FF] rounded-lg">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Tổng số slot:</span>
                  <span className="text-gray-900">{mockSlots.length} slot</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Đã duyệt:</span>
                  <span className="text-green-600">{Object.values(slotStatuses).filter(s => s === 'approved').length} slot</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Từ chối:</span>
                  <span className="text-red-600">{Object.values(slotStatuses).filter(s => s === 'rejected').length} slot</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Chờ xử lý:</span>
                  <span className="text-orange-600">{Object.values(slotStatuses).filter(s => s === 'pending').length} slot</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)} className="h-11">
              Hủy
            </Button>
            <Button onClick={handleApproveBatch} style={{ backgroundColor: '#006885' }} className="h-11 text-white">
              <CheckCircle2 className="size-4 mr-2" />
              Xác nhận & Ký số
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sign Dialog */}
      <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
        <DialogContent className="max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Ký số nghiệm thu</DialogTitle>
            <DialogDescription className="mt-1">
              Nhập mật khẩu chữ ký số để hoàn tất nghiệm thu
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 space-y-4 pb-1">
            <div className="p-3.5 bg-[#FFF7E6] rounded-lg border border-amber-200">
              <div className="flex gap-2.5">
                <AlertCircle className="size-5 flex-shrink-0 mt-0.5 text-amber-600" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  Sau khi ký số, nghiệm thu sẽ được hoàn tất và không thể chỉnh sửa. Vui lòng kiểm tra kỹ trước khi ký.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">Mật khẩu chữ ký số</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu chữ ký số..."
                value={signaturePassword}
                onChange={(e) => setSignaturePassword(e.target.value)}
                className="w-full h-11 px-3 text-sm border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSignDialog(false)} className="h-11">
              Hủy
            </Button>
            <Button 
              onClick={handleSign} 
              disabled={!signaturePassword}
              style={{ backgroundColor: '#006885' }} 
              className="h-11 text-white disabled:opacity-50"
            >
              <CheckCircle2 className="size-4 mr-2" />
              Ký số & Hoàn tất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Slot Detail Dialog */}
      <Dialog open={showSlotDetailDialog} onOpenChange={setShowSlotDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0 overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          {/* Header - Fixed */}
          <div className="px-6 py-5 border-b border-gray-200">
            <DialogTitle className="text-xl text-gray-900">
              Chi tiết slot: {selectedSlot?.slotCode}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Xem thông tin chi tiết, minh chứng và đưa ra quyết định nghiệm thu
            </DialogDescription>
          </div>
          
          {/* Scrollable Content */}
          <div className="px-6 overflow-y-auto max-h-[calc(80vh-180px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {selectedSlot && (
              <div className="py-4 space-y-4">
                {/* Thông tin cơ bản - 2 cột */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Mã slot</div>
                    <div className="font-medium text-gray-900">{selectedSlot.slotCode}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Kênh truyền thông</div>
                    <Badge variant="outline" className="font-normal">{selectedSlot.channel}</Badge>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">KPI kế hoạch</div>
                    <div className="font-medium text-gray-900">{selectedSlot.kpiPlan}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">KPI thực tế</div>
                    <div className="font-medium text-gray-900">{selectedSlot.kpiActual}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">% Đạt KPI</div>
                    <div className={`text-xl font-bold ${selectedSlot.kpiPercent >= 100 ? 'text-green-600' : selectedSlot.kpiPercent >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedSlot.kpiPercent}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Trạng thái</div>
                    {getSlotStatusBadge(slotStatuses[selectedSlot.id])}
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Chi phí kế hoạch</div>
                    <div className="font-medium text-gray-700">{formatCurrency(selectedSlot.costPlan)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Chi phí thực tế</div>
                    <div className="font-medium text-gray-900">{formatCurrency(selectedSlot.costActual)}</div>
                  </div>
                </div>

                {/* Chênh lệch chi phí */}
                {selectedSlot.costActual !== selectedSlot.costPlan && (
                  <div className={`px-4 py-2.5 rounded-lg text-sm font-medium ${selectedSlot.costActual < selectedSlot.costPlan ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {selectedSlot.costActual < selectedSlot.costPlan ? '↓' : '↑'} {Math.abs(selectedSlot.costActual - selectedSlot.costPlan).toLocaleString('vi-VN')} VNĐ
                    {selectedSlot.costActual < selectedSlot.costPlan ? ' (Tiết kiệm)' : ' (Vượt chi phí)'}
                  </div>
                )}

                {/* Task */}
                {selectedSlot.taskName && (
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Task liên quan</div>
                    <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-sm text-gray-900">{selectedSlot.taskName}</div>
                    </div>
                  </div>
                )}

                {/* Ghi chú vendor */}
                {selectedSlot.vendorNote && (
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Ghi chú của vendor</div>
                    <div className="px-4 py-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="text-sm text-gray-700 leading-relaxed">{selectedSlot.vendorNote}</div>
                    </div>
                  </div>
                )}

                {/* Minh chứng */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-900">Minh chứng đính kèm</div>
                    <Badge variant="outline" className="text-xs">{mockEvidence.filter(e => e.slotId === selectedSlot.id).length} file</Badge>
                  </div>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 bg-white">
                    {mockEvidence
                      .filter(e => e.slotId === selectedSlot.id)
                      .map((evidence, index) => (
                        <div key={evidence.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div className="size-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            {getEvidenceIcon(evidence.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-900 truncate">{evidence.name}</div>
                            {evidence.type === 'link' && (
                              <div className="text-xs text-blue-600 truncate mt-0.5">{evidence.url}</div>
                            )}
                          </div>
                          <Button size="sm" variant="ghost" className="flex-shrink-0">
                            <Download className="size-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Lý do từ chối */}
                {slotStatuses[selectedSlot.id] === 'pending' && (
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Lý do từ chối (tùy chọn)</div>
                    <Textarea
                      placeholder="Nhập lý do nếu từ chối slot này..."
                      value={slotRejectReason}
                      onChange={(e) => setSlotRejectReason(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer - Fixed */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setShowSlotDetailDialog(false)}>
              Đóng
            </Button>
            {selectedSlot && slotStatuses[selectedSlot.id] === 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleRejectSlot(selectedSlot.id)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="size-4 mr-2" />
                  Từ chối
                </Button>
                <Button
                  onClick={() => handleApproveSlot(selectedSlot.id)}
                  style={{ backgroundColor: '#006885' }}
                  className="text-white"
                >
                  <CheckCircle2 className="size-4 mr-2" />
                  Duyệt slot
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}