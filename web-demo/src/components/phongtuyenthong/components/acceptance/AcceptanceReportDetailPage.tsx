import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
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
  Download,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  Calendar,
  User,
  CreditCard,
  FileCheck,
  ShieldCheck,
  Clock,
  Eye,
  Image as ImageIcon,
  Link as LinkIcon,
  FileDown,
} from 'lucide-react';

interface AcceptanceReportDetailPageProps {
  reportId: string;
  onBack: () => void;
}

interface SlotDetail {
  slotId: string;
  channel: string;
  description: string;
  kpiPlanned: string;
  kpiActual: string;
  achievementPercent: number;
  estimatedCost: number;
  approvedCost: number;
  vnaNote: string;
  evidences: Evidence[];
}

interface Evidence {
  type: 'link' | 'image' | 'file';
  name: string;
  url: string;
}

interface TimelineEvent {
  date: string;
  time: string;
  event: string;
  user?: string;
}

// Mock data for report detail
const mockReportDetailData = {
  reportCode: 'BBNT-2026-001',
  batchCode: 'ACPT-2026-001',
  campaignName: 'Tết Bính Ngọ 2026 – Digital',
  vendorName: 'Công ty TNHH Admicro',
  vendorTaxCode: '0100123456',
  vendorAddress: '125 Lang Ha, Dong Da, Ha Noi',
  vendorBankAccount: '1234567890',
  vendorBank: 'Vietcombank - CN Ha Noi',
  acceptanceDate: '07/02/2026',
  statusVNA: 'approved', // approved | rejected | pending
  readyForPayment: true,
  isPaid: false,
  approver: 'Le Van Minh',
  approverTitle: 'Truong phong Truyen thong',
  totalApprovedCost: 67000000,
  totalEstimatedCost: 70000000,
};

const mockSlots: SlotDetail[] = [
  {
    slotId: 'SLOT-PR-001',
    channel: 'PR Báo',
    description: 'VNExpress – 1 bài PR',
    kpiPlanned: '1 bài',
    kpiActual: '1 bài',
    achievementPercent: 100,
    estimatedCost: 40000000,
    approvedCost: 42000000,
    vnaNote: 'Tăng giá theo yêu cầu của báo VNExpress',
    evidences: [
      { type: 'link', name: 'Link bài viết', url: 'https://vnexpress.net/...' },
      { type: 'image', name: 'Screenshot bài viết', url: '#' },
    ],
  },
  {
    slotId: 'SLOT-AD-003',
    channel: 'Display Ads',
    description: 'Admicro Banner – 1M impressions',
    kpiPlanned: '1,000,000 view',
    kpiActual: '800,000 view',
    achievementPercent: 80,
    estimatedCost: 30000000,
    approvedCost: 25000000,
    vnaNote: 'Underdeliver 20%, giảm thanh toán tương ứng',
    evidences: [
      { type: 'file', name: 'Báo cáo Admicro Feb 2026.xlsx', url: '#' },
      { type: 'image', name: 'Screenshot dashboard', url: '#' },
    ],
  },
];

const mockTimeline: TimelineEvent[] = [
  { date: '05/02/2026', time: '09:30', event: 'Vendor gửi yêu cầu nghiệm thu (ACPT-2026-001)' },
  { date: '06/02/2026', time: '14:15', event: 'VNA kiểm tra & chỉnh chi phí slot SLOT-AD-003', user: 'Lê Văn Minh' },
  { date: '07/02/2026', time: '10:00', event: 'VNA phê duyệt & phát hành BBNT-2026-001', user: 'Lê Văn Minh' },
  { date: '07/02/2026', time: '10:15', event: 'Biên bản được ký số & đánh dấu Chờ thanh toán', user: 'Lê Văn Minh' },
];

export default function AcceptanceReportDetailPage({ reportId, onBack }: AcceptanceReportDetailPageProps) {
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(mockReportDetailData.isPaid);
  
  const mockReportDetail = {
    ...mockReportDetailData,
    isPaid: isPaid,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  const formatCurrencyShort = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value / 1000000) + 'M';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="size-3 mr-1" />
            Đã duyệt
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="size-3 mr-1" />
            Bị từ chối
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="size-3 mr-1" />
            Đang xử lý
          </Badge>
        );
    }
  };

  const toggleSlot = (slotId: string) => {
    setExpandedSlot(expandedSlot === slotId ? null : slotId);
  };

  const handleDownloadPDF = () => {
    // Create a simple PDF-like content
    const pdfContent = `
BIÊN BẢN NGHIỆM THU
${mockReportDetail.reportCode}

Chiến dịch: ${mockReportDetail.campaignName}
Vendor: ${mockReportDetail.vendorName}
Ngày nghiệm thu: ${mockReportDetail.acceptanceDate}
Người duyệt: ${mockReportDetail.approver}

Tổng chi phí được duyệt: ${formatCurrency(mockReportDetail.totalApprovedCost)}
Trạng thái: ${mockReportDetail.isPaid ? 'Đã thanh toán' : 'Chờ thanh toán'}
    `.trim();

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mockReportDetail.reportCode}_signed.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleMarkAsPaid = () => {
    setIsPaid(true);
    alert('Đã đánh dấu biên bản này là "Đã thanh toán"');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 py-3">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="size-4" />
            Quay lại
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Chi tiết biên bản nghiệm thu</h1>
              <div className="flex items-center gap-3">
                <span className="text-lg" style={{ color: '#006885' }}>{mockReportDetail.reportCode}</span>
                {mockReportDetail.isPaid ? (
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    Đã thanh toán
                  </Badge>
                ) : (
                  <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                    Chờ thanh toán
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleDownloadPDF}
              >
                <Download className="size-4" />
                Tải PDF
              </Button>
              {!mockReportDetail.isPaid && (
                <Button 
                  style={{ backgroundColor: '#006885' }} 
                  className="text-white gap-2"
                  onClick={handleMarkAsPaid}
                >
                  <CheckCircle2 className="size-4" />
                  Đánh dấu đã thanh toán
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6 space-y-6">
        {/* Header Info Block - Simple Layout */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Biên bản nghiệm thu</div>
                <div className="text-gray-900">{mockReportDetail.reportCode}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Thuộc lần nghiệm thu</div>
                <div className="text-gray-900">{mockReportDetail.batchCode}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Chiến dịch</div>
                <div className="text-gray-900">{mockReportDetail.campaignName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Ngày nghiệm thu</div>
                <div className="text-gray-900">{mockReportDetail.acceptanceDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Vendor</div>
                <div className="text-gray-900">{mockReportDetail.vendorName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Mã số thuế</div>
                <div className="text-gray-900">{mockReportDetail.vendorTaxCode}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Địa chỉ</div>
                <div className="text-gray-900">{mockReportDetail.vendorAddress}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Tài khoản ngân hàng</div>
                <div className="text-gray-900">{mockReportDetail.vendorBankAccount}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Ngân hàng</div>
                <div className="text-gray-900">{mockReportDetail.vendorBank}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Người duyệt</div>
                <div className="text-gray-900">{mockReportDetail.approver} - {mockReportDetail.approverTitle}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Tổng dự toán</div>
                <div className="text-gray-900">{formatCurrency(mockReportDetail.totalEstimatedCost)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Tổng được duyệt</div>
                <div className="text-gray-900" style={{ color: '#006885' }}>{formatCurrency(mockReportDetail.totalApprovedCost)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Bảng tổng hợp slot */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg text-gray-900">Bảng tổng hợp slot trong biên bản</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>SLOT ID</TableHead>
                  <TableHead>KÊNH</TableHead>
                  <TableHead>MÔ TẢ SLOT</TableHead>
                  <TableHead>KPI KẾ HOẠCH</TableHead>
                  <TableHead>KPI THỰC TẾ</TableHead>
                  <TableHead>% ĐẠT</TableHead>
                  <TableHead>CHI PHÍ DỰ KIẾN</TableHead>
                  <TableHead>CHI PHÍ ĐƯỢC DUYỆT</TableHead>
                  <TableHead>GHI CHÚ VNA</TableHead>
                  <TableHead className="text-right">MINH CHỨNG</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSlots.map((slot) => (
                  <>
                    <TableRow key={slot.slotId} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium" style={{ color: '#006885' }}>{slot.slotId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{slot.channel}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900 max-w-xs">{slot.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-700">{slot.kpiPlanned}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{slot.kpiActual}</div>
                      </TableCell>
                      <TableCell>
                        <div className={slot.achievementPercent >= 100 ? 'text-green-600' : slot.achievementPercent >= 80 ? 'text-orange-600' : 'text-red-600'}>
                          {slot.achievementPercent}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-700">{formatCurrencyShort(slot.estimatedCost)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{formatCurrencyShort(slot.approvedCost)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 max-w-xs">{slot.vnaNote}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleSlot(slot.slotId)}
                          style={{ color: '#006885' }}
                        >
                          <Eye className="size-4 mr-2" />
                          {expandedSlot === slot.slotId ? 'Ẩn' : 'Xem'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedSlot === slot.slotId && (
                      <TableRow className="bg-blue-50/30">
                        <TableCell colSpan={10}>
                          <div className="p-4">
                            <div className="text-sm text-gray-700 mb-3">Minh chứng cho {slot.slotId}:</div>
                            <div className="space-y-2">
                              {slot.evidences.map((evidence, index) => (
                                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="flex items-center gap-3">
                                    {evidence.type === 'link' && <LinkIcon className="size-4 text-blue-600" />}
                                    {evidence.type === 'image' && <ImageIcon className="size-4 text-purple-600" />}
                                    {evidence.type === 'file' && <FileDown className="size-4 text-gray-600" />}
                                    <div>
                                      <div className="text-sm text-gray-900">{evidence.name}</div>
                                      {evidence.type === 'link' && (
                                        <div className="text-xs text-blue-600">{evidence.url}</div>
                                      )}
                                    </div>
                                  </div>
                                  <Button size="sm" variant="ghost" style={{ color: '#006885' }}>
                                    <Download className="size-4 mr-2" />
                                    Tải
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Section 2: PDF & Ký số */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg text-gray-900 mb-4">File PDF & Ký số</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div>
                    <span className="text-xs text-gray-500 mr-2">Tên file PDF:</span>
                    <span className="text-gray-900">{mockReportDetail.reportCode}_signed.pdf</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 mr-2">Trạng thái:</span>
                    <span className="text-gray-900">Đã ký số</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleDownloadPDF}
                >
                  <Download className="size-4" />
                  Tải PDF
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vendor Signature */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-900 mb-3">Ký bởi Vendor</div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Tổ chức</div>
                    <div className="text-sm text-gray-900">{mockReportDetail.vendorName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Mã số thuế</div>
                    <div className="text-sm text-gray-900">{mockReportDetail.vendorTaxCode}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Thời gian ký</div>
                    <div className="text-sm text-gray-900">07/02/2026, 10:15</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Nhà cung cấp chữ ký số</div>
                    <div className="text-sm text-gray-900">VNPT-CA</div>
                  </div>
                </div>
              </div>

              {/* VNA Signature */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-900 mb-3">Ký bởi Vietnam Airlines</div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Người ký</div>
                    <div className="text-sm text-gray-900">{mockReportDetail.approver}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Chức vụ</div>
                    <div className="text-sm text-gray-900">{mockReportDetail.approverTitle}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Thời gian ký</div>
                    <div className="text-sm text-gray-900">07/02/2026, 10:20</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Nhà cung cấp chữ ký số</div>
                    <div className="text-sm text-gray-900">FPT-CA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg text-gray-900 mb-4">Lịch sử & Timeline</h2>
          <div className="space-y-4">
            {mockTimeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: index === mockTimeline.length - 1 ? '#006885' : '#D1D5DB' }}
                  />
                  {index < mockTimeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-900">{item.date}</span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <div className="text-sm text-gray-700">{item.event}</div>
                  {item.user && (
                    <div className="text-xs text-gray-500 mt-1">Bởi: {item.user}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
