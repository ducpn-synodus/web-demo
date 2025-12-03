import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
  FileCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Download,
  AlertCircle,
  TrendingUp,
  Building,
  Plus,
  ExternalLink,
} from 'lucide-react';

interface AcceptanceTabProps {
  campaignName: string;
}

// Mock data - acceptance requests for this campaign
const mockAcceptanceData = [
  {
    id: '1',
    code: 'NT-2026-001',
    slot: 'Slot-FB-001',
    slotType: 'Facebook Ads',
    vendor: 'Admicro',
    submittedDate: '04/02/2026',
    actualCost: 28000000,
    plannedCost: 30000000,
    kpiAchievement: 108,
    status: 'approved',
    reportLink: 'https://business.facebook.com/adsmanager/report/...',
  },
  {
    id: '2',
    code: 'NT-2026-003',
    slot: 'Slot-FB-003',
    slotType: 'Facebook Ads',
    vendor: 'Admicro',
    submittedDate: '05/02/2026',
    actualCost: 32000000,
    plannedCost: 30000000,
    kpiAchievement: 95,
    status: 'pending',
    reportLink: 'https://business.facebook.com/adsmanager/report/...',
  },
  {
    id: '3',
    code: 'NT-2026-007',
    slot: 'Slot-FB-007',
    slotType: 'Facebook Ads',
    vendor: 'Admicro',
    submittedDate: '06/02/2026',
    actualCost: 29000000,
    plannedCost: 30000000,
    kpiAchievement: 132,
    status: 'reviewing',
    reportLink: 'https://business.facebook.com/adsmanager/report/...',
  },
];

export default function AcceptanceTab({ campaignName }: AcceptanceTabProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value / 1000000) + 'M';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'Chờ duyệt', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Clock },
      'reviewing': { label: 'Đang rà soát', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: AlertCircle },
      'approved': { label: 'Đã duyệt', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: CheckCircle2 },
      'rejected': { label: 'Từ chối', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`${config.color} border gap-1`}>
        <Icon className="size-3" />
        {config.label}
      </Badge>
    );
  };

  const getKpiColor = (achievement: number) => {
    return 'text-gray-900';
  };

  const stats = {
    total: mockAcceptanceData.length,
    approved: mockAcceptanceData.filter(r => r.status === 'approved').length,
    pending: mockAcceptanceData.filter(r => r.status === 'pending').length,
    reviewing: mockAcceptanceData.filter(r => r.status === 'reviewing').length,
    totalPlannedCost: mockAcceptanceData.reduce((sum, r) => sum + r.plannedCost, 0),
    totalActualCost: mockAcceptanceData.reduce((sum, r) => sum + r.actualCost, 0),
  };

  const completionRate = (stats.approved / stats.total) * 100;
  const costVariance = stats.totalActualCost - stats.totalPlannedCost;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="border-2" style={{ borderColor: '#006885' }}>
          <CardContent className="pt-3 pb-2 px-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-0.5">Tổng slot</div>
                <div className="text-xl" style={{ color: '#006885' }}>{stats.total}</div>
              </div>
              <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 104, 133, 0.1)' }}>
                <FileCheck className="size-4" style={{ color: '#006885' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="pt-3 pb-2 px-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-0.5">Đã nghiệm thu</div>
                <div className="text-xl text-gray-900">{stats.approved}</div>
              </div>
              <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                <CheckCircle2 className="size-4 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="pt-3 pb-2 px-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-0.5">Chờ xử lý</div>
                <div className="text-xl text-gray-900">{stats.pending + stats.reviewing}</div>
              </div>
              <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                <Clock className="size-4 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="pt-3 pb-2 px-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-0.5">Chi phí thực tế</div>
                <div className="text-xl text-gray-900">{formatCurrency(stats.totalActualCost)}</div>
              </div>
              <div className="size-8 rounded-lg flex items-center justify-center border border-gray-200">
                <TrendingUp className="size-4 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acceptance Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-bold">Danh sách yêu cầu nghiệm thu</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="size-4 mr-2" />
                Xuất Excel
              </Button>
              <Button size="sm" style={{ backgroundColor: '#006885' }}>
                <Plus className="size-4 mr-2" />
                Tạo yêu cầu mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>MÃ YÊU CẦU</TableHead>
                  <TableHead>SLOT</TableHead>
                  <TableHead>LOẠI</TableHead>
                  <TableHead>VENDOR</TableHead>
                  <TableHead>NGÀY GỬI</TableHead>
                  <TableHead>CHI PHÍ KH</TableHead>
                  <TableHead>CHI PHÍ TT</TableHead>
                  <TableHead>CHÊNH LỆCH</TableHead>
                  <TableHead>KPI ĐT</TableHead>
                  <TableHead>LINK BÁO CÁO</TableHead>
                  <TableHead>TRẠNG THÁI</TableHead>
                  <TableHead className="text-right">THAO TÁC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAcceptanceData.map((request) => {
                  const variance = request.actualCost - request.plannedCost;
                  const variancePercent = (variance / request.plannedCost) * 100;
                  
                  return (
                    <TableRow key={request.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium" style={{ color: '#006885' }}>{request.code}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{request.slot}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.slotType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="size-7 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Building className="size-4 text-gray-600" />
                          </div>
                          <div className="text-gray-900">{request.vendor}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-600">{request.submittedDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-600">{formatCurrency(request.plannedCost)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900 font-medium">{formatCurrency(request.actualCost)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">
                          {variance > 0 ? '+' : ''}{formatCurrency(Math.abs(variance))}
                        </div>
                        <div className="text-xs text-gray-600">
                          {variancePercent > 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${getKpiColor(request.kpiAchievement)}`}>
                          {request.kpiAchievement}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <a 
                          href={request.reportLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm hover:underline"
                        >
                          <ExternalLink className="size-3.5" />
                          <span>Xem báo cáo</span>
                        </a>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(request.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" style={{ color: '#006885' }}>
                          <Eye className="size-4 mr-2" />
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border border-gray-200">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <FileCheck className="size-5 text-gray-600 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-2">Quy trình nghiệm thu</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>1. Vendor gửi yêu cầu nghiệm thu với file chứng minh và KPI thực tế</div>
                <div>2. Ban Truyền thông kiểm tra và phê duyệt/từ chối</div>
                <div>3. Sau khi tất cả slot được phê duyệt → tự động chuyển sang "Ready for Payment"</div>
                <div>4. Dữ liệu được đồng bộ với module Thanh toán & Hợp đồng</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}