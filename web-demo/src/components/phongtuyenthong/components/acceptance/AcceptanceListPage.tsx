import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  CheckCircle2,
  Clock,
  XCircle,
  Edit3,
  Eye,
  Filter,
  Download,
  FileCheck,
  AlertCircle,
  Search,
  Building,
} from 'lucide-react';

interface AcceptanceBatch {
  id: string;
  batchCode: string;
  campaignName: string;
  vendorName: string;
  slotCount: number;
  totalCost: number;
  status: 'submitted' | 'need_revision' | 'approved' | 'rejected';
  submittedDate: string;
  assignee: string | null;
}

interface AcceptanceListPageProps {
  onViewDetail: (batchId: string) => void;
}

// Mock data - acceptance batches from vendors
const mockBatches: AcceptanceBatch[] = [
  {
    id: '1',
    batchCode: 'ACPT-2026-001',
    campaignName: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    vendorName: 'Admicro',
    slotCount: 4,
    totalCost: 42000000,
    status: 'submitted',
    submittedDate: '05/02/2026',
    assignee: null,
  },
  {
    id: '2',
    batchCode: 'ACPT-2026-002',
    campaignName: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    vendorName: 'NovaOn',
    slotCount: 3,
    totalCost: 30000000,
    status: 'need_revision',
    submittedDate: '06/02/2026',
    assignee: 'Minh Thảo',
  },
  {
    id: '3',
    batchCode: 'ACPT-2026-003',
    campaignName: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    vendorName: 'Admicro',
    slotCount: 2,
    totalCost: 25000000,
    status: 'approved',
    submittedDate: '03/02/2026',
    assignee: 'Lê Minh',
  },
  {
    id: '4',
    batchCode: 'ACPT-2026-004',
    campaignName: 'Mùa Hè 2026',
    vendorName: 'MediaCorp',
    slotCount: 5,
    totalCost: 55000000,
    status: 'need_revision',
    submittedDate: '04/02/2026',
    assignee: 'Trần Hương',
  },
  {
    id: '5',
    batchCode: 'ACPT-2026-005',
    campaignName: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    vendorName: 'PR Plus Agency',
    slotCount: 2,
    totalCost: 18000000,
    status: 'rejected',
    submittedDate: '02/02/2026',
    assignee: 'Nguyễn Thảo',
  },
  {
    id: '6',
    batchCode: 'ACPT-2026-006',
    campaignName: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    vendorName: 'VietAd Media',
    slotCount: 6,
    totalCost: 65000000,
    status: 'submitted',
    submittedDate: '07/02/2026',
    assignee: null,
  },
  {
    id: '7',
    batchCode: 'ACPT-2026-007',
    campaignName: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    vendorName: 'Digital Hub',
    slotCount: 3,
    totalCost: 38000000,
    status: 'approved',
    submittedDate: '01/02/2026',
    assignee: 'Phạm Linh',
  },
];

export default function AcceptanceListPage({ onViewDetail }: AcceptanceListPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [vendorFilter, setVendorFilter] = useState<string>('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value / 1000000) + 'M';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'submitted': { label: 'Chờ duyệt', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
      'need_revision': { label: 'Cần bổ sung', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Edit3 },
      'approved': { label: 'Đã duyệt', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 },
      'rejected': { label: 'Từ chối', color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
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

  const filteredBatches = mockBatches.filter(batch => {
    const matchSearch = batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       batch.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       batch.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || batch.status === statusFilter;
    const matchCampaign = campaignFilter === 'all' || batch.campaignName === campaignFilter;
    const matchVendor = vendorFilter === 'all' || batch.vendorName === vendorFilter;
    return matchSearch && matchStatus && matchCampaign && matchVendor;
  });

  const stats = {
    total: mockBatches.length,
    submitted: mockBatches.filter(r => r.status === 'submitted').length,
    approved: mockBatches.filter(r => r.status === 'approved').length,
    rejected: mockBatches.filter(r => r.status === 'rejected').length,
    needRevision: mockBatches.filter(r => r.status === 'need_revision').length,
  };

  return (
    <div>
      <div className="max-w-[1800px] mx-auto px-6 pt-3 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <Card className="border-2" style={{ borderColor: '#006885' }}>
            <CardContent className="pt-3 pb-2 px-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Tổng batch</div>
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
                  <div className="text-xs text-gray-600 mb-0.5">Chờ duyệt</div>
                  <div className="text-xl text-gray-900">{stats.submitted}</div>
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
                  <div className="text-xs text-gray-600 mb-0.5">Cần bổ sung</div>
                  <div className="text-xl text-gray-900">{stats.needRevision}</div>
                </div>
                <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                  <Edit3 className="size-4 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="pt-3 pb-2 px-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Đã duyệt</div>
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
                  <div className="text-xs text-gray-600 mb-0.5">Từ chối</div>
                  <div className="text-xl text-gray-900">{stats.rejected}</div>
                </div>
                <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                  <XCircle className="size-4 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Tìm theo batch ID, chiến dịch, vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Theo chiến dịch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả chiến dịch</SelectItem>
                  <SelectItem value="Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026">Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026</SelectItem>
                  <SelectItem value="Mùa Hè 2026">Mùa Hè 2026</SelectItem>
                </SelectContent>
              </Select>

              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Theo vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả vendor</SelectItem>
                  <SelectItem value="Admicro">Admicro</SelectItem>
                  <SelectItem value="NovaOn">NovaOn</SelectItem>
                  <SelectItem value="MediaCorp">MediaCorp</SelectItem>
                  <SelectItem value="PR Plus Agency">PR Plus Agency</SelectItem>
                  <SelectItem value="VietAd Media">VietAd Media</SelectItem>
                  <SelectItem value="Digital Hub">Digital Hub</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="submitted">Chờ duyệt</SelectItem>
                  <SelectItem value="need_revision">Cần bổ sung</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>BATCH ID</TableHead>
                    <TableHead>CHIẾN DỊCH</TableHead>
                    <TableHead>VENDOR</TableHead>
                    <TableHead>SỐ SLOT</TableHead>
                    <TableHead>TỔNG CHI PHÍ</TableHead>
                    <TableHead>TRẠNG THÁI</TableHead>
                    <TableHead>NGÀY GỬI</TableHead>
                    <TableHead>NGƯỜI XỬ LÝ</TableHead>
                    <TableHead className="text-right">THAO TÁC</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.map((batch) => (
                    <TableRow key={batch.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium" style={{ color: '#006885' }}>{batch.batchCode}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{batch.campaignName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="size-7 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Building className="size-4 text-gray-600" />
                          </div>
                          <div className="text-gray-900">{batch.vendorName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900">{batch.slotCount} slot</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-900 font-medium">{formatCurrency(batch.totalCost)}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(batch.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-600">{batch.submittedDate}</div>
                      </TableCell>
                      <TableCell>
                        {batch.assignee ? (
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#006885' }}>
                              {batch.assignee.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="text-sm text-gray-700">{batch.assignee.split(' ').slice(-1)[0]}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">(chưa gán)</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onViewDetail(batch.id)}
                          style={{ color: '#006885' }}
                        >
                          <Eye className="size-4 mr-2" />
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}