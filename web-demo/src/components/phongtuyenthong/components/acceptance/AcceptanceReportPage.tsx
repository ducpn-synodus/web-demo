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
  XCircle,
  Eye,
  Filter,
  Download,
  FileCheck,
  Search,
  Building,
  FileText,
  Layers,
  Target,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/tabs';

interface AcceptanceRecord {
  id: string;
  recordCode: string;
  campaignName: string;
  vendorName: string;
  slotCount: number;
  totalApprovedCost: number;
  acceptanceDate: string;
  readyForPayment: boolean;
  isPaid: boolean;
  approver: string;
}

interface RecordByCampaign {
  campaignName: string;
  totalRecords: number;
  totalSlots: number;
  totalCost: number;
  vendors: string[];
  readyForPayment: boolean;
  isPaid: boolean;
}

interface RecordBySlot {
  slotCode: string;
  campaignName: string;
  vendorName: string;
  recordCode: string;
  approvedCost: number;
  readyForPayment: boolean;
  paymentStatus: string;
}

// Mock data - accepted records
const mockRecords: AcceptanceRecord[] = [
  {
    id: '1',
    recordCode: 'BBNT-2026-001',
    campaignName: 'Tết 2026 – Digital',
    vendorName: 'Admicro',
    slotCount: 4,
    totalApprovedCost: 42000000,
    acceptanceDate: '07/02/2026',
    readyForPayment: true,
    isPaid: false,
    approver: 'Lê Minh',
  },
  {
    id: '2',
    recordCode: 'BBNT-2026-002',
    campaignName: 'Tết 2026 – PR',
    vendorName: 'NovaOn',
    slotCount: 2,
    totalApprovedCost: 25000000,
    acceptanceDate: '08/02/2026',
    readyForPayment: true,
    isPaid: false,
    approver: 'Minh Thảo',
  },
  {
    id: '3',
    recordCode: 'BBNT-2026-003',
    campaignName: 'Mùa Hè 2026',
    vendorName: 'MediaCorp',
    slotCount: 3,
    totalApprovedCost: 35000000,
    acceptanceDate: '09/02/2026',
    readyForPayment: true,
    isPaid: true,
    approver: 'Trần Hương',
  },
  {
    id: '4',
    recordCode: 'BBNT-2026-004',
    campaignName: 'Tết 2026 – Digital',
    vendorName: 'PR Plus Agency',
    slotCount: 2,
    totalApprovedCost: 18000000,
    acceptanceDate: '10/02/2026',
    readyForPayment: false,
    isPaid: false,
    approver: 'Nguyễn Thảo',
  },
];

// Mock data for campaign view
const mockByCampaign: RecordByCampaign[] = [
  {
    campaignName: 'Tết 2026 – Digital',
    totalRecords: 2,
    totalSlots: 6,
    totalCost: 60000000,
    vendors: ['Admicro', 'PR Plus Agency'],
    readyForPayment: true,
    isPaid: false,
  },
  {
    campaignName: 'Tết 2026 – PR',
    totalRecords: 1,
    totalSlots: 2,
    totalCost: 25000000,
    vendors: ['NovaOn'],
    readyForPayment: true,
    isPaid: false,
  },
  {
    campaignName: 'Mùa Hè 2026',
    totalRecords: 1,
    totalSlots: 3,
    totalCost: 35000000,
    vendors: ['MediaCorp'],
    readyForPayment: true,
    isPaid: true,
  },
];

// Mock data for slot view
const mockBySlot: RecordBySlot[] = [
  {
    slotCode: 'Slot-FB-001',
    campaignName: 'Tết 2026 – Digital',
    vendorName: 'Admicro',
    recordCode: 'BBNT-2026-001',
    approvedCost: 10500000,
    readyForPayment: true,
    paymentStatus: 'Chờ thanh toán',
  },
  {
    slotCode: 'Slot-FB-002',
    campaignName: 'Tết 2026 – Digital',
    vendorName: 'Admicro',
    recordCode: 'BBNT-2026-001',
    approvedCost: 11500000,
    readyForPayment: true,
    paymentStatus: 'Đã thanh toán',
  },
  {
    slotCode: 'Slot-PR-001',
    campaignName: 'Tết 2026 – PR',
    vendorName: 'NovaOn',
    recordCode: 'BBNT-2026-002',
    approvedCost: 15000000,
    readyForPayment: true,
    paymentStatus: 'Chờ thanh toán',
  },
];

interface AcceptanceReportPageProps {
  onViewDetail?: (reportId: string) => void;
}

export default function AcceptanceReportPage({ onViewDetail }: AcceptanceReportPageProps) {
  const [viewMode, setViewMode] = useState<'record' | 'campaign' | 'slot'>('record');
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [vendorFilter, setVendorFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value / 1000000) + 'M';
  };

  const filteredRecords = mockRecords.filter(record => {
    const matchSearch = record.recordCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       record.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       record.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCampaign = campaignFilter === 'all' || record.campaignName === campaignFilter;
    const matchVendor = vendorFilter === 'all' || record.vendorName === vendorFilter;
    const matchPayment = paymentFilter === 'all' || 
                        (paymentFilter === 'ready' && record.readyForPayment && !record.isPaid) ||
                        (paymentFilter === 'paid' && record.isPaid);
    return matchSearch && matchCampaign && matchVendor && matchPayment;
  });

  const filteredByCampaign = mockByCampaign.filter(item => {
    const matchSearch = item.campaignName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCampaign = campaignFilter === 'all' || item.campaignName === campaignFilter;
    return matchSearch && matchCampaign;
  });

  const filteredBySlot = mockBySlot.filter(item => {
    const matchSearch = item.slotCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.campaignName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCampaign = campaignFilter === 'all' || item.campaignName === campaignFilter;
    const matchVendor = vendorFilter === 'all' || item.vendorName === vendorFilter;
    return matchSearch && matchCampaign && matchVendor;
  });

  const stats = {
    total: mockRecords.length,
    readyForPayment: mockRecords.filter(r => r.readyForPayment && !r.isPaid).length,
    paid: mockRecords.filter(r => r.isPaid).length,
    totalCost: mockRecords.reduce((sum, r) => sum + r.totalApprovedCost, 0),
    totalSlots: mockRecords.reduce((sum, r) => sum + r.slotCount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <Card className="border-2" style={{ borderColor: '#006885' }}>
            <CardContent className="pt-3 pb-2 px-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Tổng biên bản</div>
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
                  <div className="text-xs text-gray-600 mb-0.5">Tổng slot</div>
                  <div className="text-xl text-gray-900">{stats.totalSlots}</div>
                </div>
                <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                  <Layers className="size-4 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="pt-3 pb-2 px-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Tổng chi phí</div>
                  <div className="text-xl text-gray-900">{formatCurrency(stats.totalCost)}</div>
                </div>
                <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                  <FileText className="size-4 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="pt-3 pb-2 px-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 mb-0.5">Chờ thanh toán</div>
                  <div className="text-xl text-gray-900">{stats.readyForPayment}</div>
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
                  <div className="text-xs text-gray-600 mb-0.5">Đã thanh toán</div>
                  <div className="text-xl text-gray-900">{stats.paid}</div>
                </div>
                <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                  <CheckCircle2 className="size-4 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm..."
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
                  <SelectItem value="Tết 2026 – Digital">Tết 2026 – Digital</SelectItem>
                  <SelectItem value="Tết 2026 – PR">Tết 2026 – PR</SelectItem>
                  <SelectItem value="Mùa Hè 2026">Mùa Hè 2026</SelectItem>
                </SelectContent>
              </Select>

              {viewMode !== 'campaign' && (
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
                  </SelectContent>
                </Select>
              )}

              {viewMode === 'record' && (
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trạng thái thanh toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="ready">Chờ thanh toán</SelectItem>
                    <SelectItem value="paid">Đã thanh toán</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tables based on view mode */}
        {viewMode === 'record' && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>BIÊN BẢN ID</TableHead>
                      <TableHead>CHIẾN DỊCH</TableHead>
                      <TableHead>VENDOR</TableHead>
                      <TableHead>SỐ SLOT</TableHead>
                      <TableHead>TỔNG CHI PHÍ DUYỆT</TableHead>
                      <TableHead>NGÀY NGHIỆM THU</TableHead>
                      <TableHead>NGƯỜI DUYỆT</TableHead>
                      <TableHead>TRẠNG THÁI TT</TableHead>
                      <TableHead className="text-right">THAO TÁC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="font-medium" style={{ color: '#006885' }}>{record.recordCode}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900">{record.campaignName}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Building className="size-4 text-gray-600" />
                            </div>
                            <div className="text-gray-900">{record.vendorName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900">{record.slotCount} slot</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900 font-medium">{formatCurrency(record.totalApprovedCost)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-600">{record.acceptanceDate}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#006885' }}>
                              {record.approver.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="text-sm text-gray-700">{record.approver.split(' ').slice(-1)[0]}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {record.isPaid ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Đã thanh toán
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Chờ thanh toán
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              style={{ color: '#006885' }}
                              onClick={() => onViewDetail?.(record.id)}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button size="sm" variant="ghost" style={{ color: '#006885' }}>
                              <Download className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === 'campaign' && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>CHIẾN DỊCH</TableHead>
                      <TableHead>VENDORS</TableHead>
                      <TableHead>SỐ BIÊN BẢN</TableHead>
                      <TableHead>TỔNG CHI PHÍ</TableHead>
                      <TableHead>TỔNG SLOT</TableHead>
                      <TableHead>CHỜ THANH TOÁN</TableHead>
                      <TableHead>ĐÃ THANH TOÁN</TableHead>
                      <TableHead className="text-right">THAO TÁC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredByCampaign.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="font-medium text-gray-900">{item.campaignName}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.vendors.map((vendor, i) => (
                              <Badge key={i} variant="outline">{vendor}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900">{item.totalRecords}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900 font-medium">{formatCurrency(item.totalCost)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900">{item.totalSlots} slot</div>
                        </TableCell>
                        <TableCell>
                          {item.readyForPayment ? (
                            <CheckCircle2 className="size-5 text-amber-600" />
                          ) : (
                            <XCircle className="size-5 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell>
                          {item.isPaid ? (
                            <CheckCircle2 className="size-5 text-green-600" />
                          ) : (
                            <XCircle className="size-5 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" style={{ color: '#006885' }}>
                            <Eye className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === 'slot' && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>SLOT ID</TableHead>
                      <TableHead>CHIẾN DỊCH</TableHead>
                      <TableHead>VENDOR</TableHead>
                      <TableHead>BIÊN BẢN ID</TableHead>
                      <TableHead>CHI PHÍ ĐƯỢC DUYỆT</TableHead>
                      <TableHead>CHỜ THANH TOÁN</TableHead>
                      <TableHead>TRẠNG THÁI TT</TableHead>
                      <TableHead className="text-right">THAO TÁC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBySlot.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="font-medium text-gray-900">{item.slotCode}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900">{item.campaignName}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Building className="size-4 text-gray-600" />
                            </div>
                            <div className="text-gray-900">{item.vendorName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium" style={{ color: '#006885' }}>{item.recordCode}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900 font-medium">{formatCurrency(item.approvedCost)}</div>
                        </TableCell>
                        <TableCell>
                          {item.readyForPayment ? (
                            <CheckCircle2 className="size-5 text-amber-600" />
                          ) : (
                            <XCircle className="size-5 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell>
                          {item.paymentStatus === 'Đã thanh toán' ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Đã thanh toán
                            </Badge>
                          ) : item.paymentStatus === 'Chờ thanh toán' ? (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Chờ thanh toán
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                              {item.paymentStatus}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" style={{ color: '#006885' }}>
                            <Eye className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}