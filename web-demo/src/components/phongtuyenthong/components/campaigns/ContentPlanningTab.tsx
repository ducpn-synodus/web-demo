import { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  Link as LinkIcon,
  Building,
  Users,
  Image as ImageIcon,
  Video,
  MoreHorizontal,
  Search,
  XCircle,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';



// Mock data for Facebook Ads campaign
const mockContentItems = [
  {
    id: 'FBAD-2026-001',
    type: 'FB Single Image',
    channel: 'Facebook News Feed',
    title: 'Khuyến mãi vé Tết - Giảm 30%',
    owner: 'Lan Anh',
    ownerAvatar: 'LA',
    publishDate: '05/01/2026',
    status: 'Đang thiết kế KV',
    priority: 'High',
    slot: 'FB-SLOT-001',
    wave: 'Wave 1 - Pre-Tết',
    format: 'Single Image',
    objective: 'Conversion - Bán vé',
    adSet: 'AdSet Miền Bắc',
  },
  {
    id: 'FBAD-2026-002',
    type: 'FB Carousel',
    channel: 'Facebook News Feed',
    title: 'Top 5 điểm đến Tết 2026',
    owner: 'Minh Hằng',
    ownerAvatar: 'MH',
    publishDate: '02/01/2026',
    status: 'Đã duyệt',
    priority: 'Medium',
    slot: 'FB-SLOT-002',
    wave: 'Wave 1 - Pre-Tết',
    format: 'Carousel (5 cards)',
    objective: 'Traffic',
    adSet: 'AdSet Toàn quốc',
  },
  {
    id: 'FBAD-2026-003',
    type: 'FB Video',
    channel: 'Facebook News Feed + Stories',
    title: 'Video 15s - Về nhà ăn Tết',
    owner: 'Hoàng Nam',
    ownerAvatar: 'HN',
    publishDate: '10/01/2026',
    status: 'Đang sản xuất',
    priority: 'High',
    slot: 'FB-SLOT-003',
    wave: 'Wave 2 - Cận Tết',
    format: 'Video 15s',
    objective: 'Video Views',
    vendor: 'KOL Agency',
  },
  {
    id: 'FBAD-2026-004',
    type: 'FB Lead Gen',
    channel: 'Facebook Lead Ads',
    title: 'Đăng ký nhận ưu đãi Tết',
    owner: 'Thu Hà',
    ownerAvatar: 'TH',
    publishDate: '06/01/2026',
    status: 'Chờ duyệt LĐ',
    priority: 'High',
    slot: 'FB-SLOT-004',
    wave: 'Wave 1 - Pre-Tết',
    format: 'Lead Form',
    objective: 'Lead Generation',
    adSet: 'AdSet Retargeting',
  },
  {
    id: 'FBAD-2026-005',
    type: 'FB Stories',
    channel: 'Facebook Stories',
    title: 'Stories Flash Sale 24h',
    owner: 'Minh Hằng',
    ownerAvatar: 'MH',
    publishDate: '03/01/2026',
    status: 'Đang thiết kế KV',
    priority: 'Medium',
    slot: null,
    wave: 'Wave 1 - Pre-Tết',
    format: 'Stories Vertical',
    objective: 'Conversion',
    adSet: 'AdSet Mobile Only',
  },
  {
    id: 'FBAD-2026-006',
    type: 'FB Instant Experience',
    channel: 'Facebook Canvas',
    title: 'Canvas Hành trình Tết VNA',
    owner: 'Lan Anh',
    ownerAvatar: 'LA',
    publishDate: '28/12/2025',
    status: 'Đã xuất bản',
    priority: 'High',
    slot: 'FB-SLOT-005',
    wave: 'Wave 1 - Pre-Tết',
    format: 'Instant Experience',
    objective: 'Brand Awareness',
    adSet: 'AdSet LAL',
  },
  {
    id: 'FBAD-2026-007',
    type: 'FB Single Image',
    channel: 'Facebook Right Column',
    title: 'Retargeting - Bỏ giỏ hàng',
    owner: 'Thu Hà',
    ownerAvatar: 'TH',
    publishDate: '07/01/2026',
    status: 'Draft',
    priority: 'Medium',
    slot: null,
    wave: 'Wave 2 - Cận Tết',
    format: 'Single Image',
    objective: 'Conversion',
    adSet: 'AdSet Retargeting Cart',
  },
  {
    id: 'FBAD-2026-008',
    type: 'FB Collection',
    channel: 'Facebook News Feed',
    title: 'Collection Deals Tết 2026',
    owner: 'Hoàng Nam',
    ownerAvatar: 'HN',
    publishDate: '04/01/2026',
    status: 'Đã duyệt',
    priority: 'Low',
    slot: 'FB-SLOT-006',
    wave: 'Wave 1 - Pre-Tết',
    format: 'Collection',
    objective: 'Catalog Sales',
    adSet: 'AdSet DPA',
  },
  {
    id: 'FBAD-2026-009',
    type: 'FB Video',
    channel: 'Facebook In-Stream',
    title: 'Video 6s Bumper - VNA Tết',
    owner: 'Lan Anh',
    ownerAvatar: 'LA',
    publishDate: '08/01/2026',
    status: 'Đang viết',
    priority: 'Medium',
    slot: null,
    wave: 'Wave 2 - Cận Tết',
    format: 'Video 6s',
    objective: 'Reach',
    adSet: 'AdSet Mass Reach',
  },
  {
    id: 'FBAD-2026-010',
    type: 'FB Carousel',
    channel: 'Facebook Marketplace',
    title: 'Carousel Khuyến mãi Marketplace',
    owner: 'Minh Hằng',
    ownerAvatar: 'MH',
    publishDate: '09/01/2026',
    status: 'Đang thiết kế KV',
    priority: 'High',
    slot: 'FB-SLOT-007',
    wave: 'Wave 2 - Cận Tết',
    format: 'Carousel (4 cards)',
    objective: 'Conversion',
    adSet: 'AdSet Marketplace',
  },
];

export default function ContentPlanningTab() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWave, setFilterWave] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkFormat, setBulkFormat] = useState('');
  const [bulkWave, setBulkWave] = useState('');

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { bg: string; color: string; icon: any }> = {
      'Draft': { bg: '#f3f4f6', color: '#6b7280', icon: FileText },
      'Đang viết': { bg: '#fef3c7', color: '#92400e', icon: Edit },
      'Đang thiết kế KV': { bg: '#ddd6fe', color: '#5b21b6', icon: ImageIcon },
      'Đang sản xuất': { bg: '#fecaca', color: '#991b1b', icon: Video },
      'Chờ duyệt LĐ': { bg: '#fed7aa', color: '#9a3412', icon: Clock },
      'Đã duyệt': { bg: '#bbf7d0', color: '#166534', icon: CheckCircle2 },
      'Đã xuất bản': { bg: '#a5f3fc', color: '#164e63', icon: Zap },
      'Hủy': { bg: '#fecaca', color: '#991b1b', icon: XCircle },
    };

    const config = configs[status] || configs['Draft'];
    const Icon = config.icon;

    return (
      <Badge className="gap-1 border-0" style={{ backgroundColor: config.bg, color: config.color }}>
        <Icon className="size-3" />
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const configs: Record<string, { bg: string; color: string }> = {
      'High': { bg: '#fee2e2', color: '#991b1b' },
      'Medium': { bg: '#fef3c7', color: '#92400e' },
      'Low': { bg: '#e0e7ff', color: '#3730a3' },
    };

    const config = configs[priority] || configs['Medium'];

    return (
      <Badge variant="outline" style={{ borderColor: config.color, color: config.color, backgroundColor: config.bg }}>
        {priority}
      </Badge>
    );
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  // Filter logic
  const filteredItems = mockContentItems.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterWave !== 'all' && item.wave !== filterWave) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Stats
  const stats = {
    total: mockContentItems.length,
    draft: mockContentItems.filter(i => i.status === 'Draft').length,
    inProgress: mockContentItems.filter(i => ['Đang viết', 'Đang thiết kế KV', 'Đang sản xuất'].includes(i.status)).length,
    pending: mockContentItems.filter(i => i.status === 'Chờ duyệt LĐ').length,
    approved: mockContentItems.filter(i => i.status === 'Đã duyệt').length,
    published: mockContentItems.filter(i => i.status === 'Đã xuất bản').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-2" style={{ borderColor: 'rgba(0, 94, 120, 0.2)', backgroundColor: 'rgba(0, 94, 120, 0.03)' }}>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-2xl mb-1" style={{ color: '#005e78' }}>{stats.total}</div>
              <div className="text-xs text-gray-600">Tổng nội dung</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2" style={{ borderColor: 'rgba(107, 114, 128, 0.2)', backgroundColor: 'rgba(107, 114, 128, 0.03)' }}>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-2xl text-gray-600 mb-1">{stats.draft}</div>
              <div className="text-xs text-gray-600">Draft</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-200" style={{ backgroundColor: 'rgba(234, 179, 8, 0.05)' }}>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-2xl text-yellow-600 mb-1">{stats.inProgress}</div>
              <div className="text-xs text-gray-600">Đang thực hiện</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-orange-200" style={{ backgroundColor: 'rgba(249, 115, 22, 0.05)' }}>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-2xl text-orange-600 mb-1">{stats.pending}</div>
              <div className="text-xs text-gray-600">Chờ duyệt</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-green-200" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-2xl text-green-600 mb-1">{stats.approved}</div>
              <div className="text-xs text-gray-600">Đã duyệt</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-blue-200" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="text-2xl text-blue-600 mb-1">{stats.published}</div>
              <div className="text-xs text-gray-600">Đã xuất bản</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Kế hoạch nội dung Facebook Ads - Chiến dịch Tết 2026</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkDialog(true)}
                >
                  <Zap className="size-4 mr-2" />
                  Tạo hàng loạt
                </Button>
                <Button
                  size="sm"
                  style={{ backgroundColor: '#005e78' }}
                  onClick={() => setShowCreateDialog(true)}
                >
                  <Plus className="size-4 mr-2" />
                  Thêm nội dung
                </Button>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Tìm theo mã hoặc tiêu đề..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Loại FB Ad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="FB Single Image">FB Single Image</SelectItem>
                  <SelectItem value="FB Carousel">FB Carousel</SelectItem>
                  <SelectItem value="FB Video">FB Video</SelectItem>
                  <SelectItem value="FB Stories">FB Stories</SelectItem>
                  <SelectItem value="FB Lead Gen">FB Lead Gen</SelectItem>
                  <SelectItem value="FB Collection">FB Collection</SelectItem>
                  <SelectItem value="FB Instant Experience">FB Instant Experience</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Đang viết">Đang viết</SelectItem>
                  <SelectItem value="Đang thiết kế KV">Đang thiết kế KV</SelectItem>
                  <SelectItem value="Chờ duyệt LĐ">Chờ duyệt LĐ</SelectItem>
                  <SelectItem value="Đã duyệt">Đã duyệt</SelectItem>
                  <SelectItem value="Đã xuất bản">Đã xuất bản</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterWave} onValueChange={setFilterWave}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Nhóm nội dung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhóm</SelectItem>
                  <SelectItem value="Wave 1 - Pre-Tết">Wave 1 - Pre-Tết</SelectItem>
                  <SelectItem value="Wave 2 - Cận Tết">Wave 2 - Cận Tết</SelectItem>
                  <SelectItem value="Wave 3 - Hậu Tết">Wave 3 - Hậu Tết</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Download className="size-4 mr-2" />
                Xuất Excel
              </Button>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm text-gray-900">
                  Đã chọn {selectedItems.length} mục
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <User className="size-4 mr-2" />
                    Gán người phụ trách
                  </Button>
                  <Button size="sm" variant="outline">
                    <CheckCircle2 className="size-4 mr-2" />
                    Đổi trạng thái
                  </Button>
                  <Button size="sm" variant="outline">
                    <LinkIcon className="size-4 mr-2" />
                    Gắn Slot/Vendor
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedItems([])}
                  >
                    <XCircle className="size-4 mr-2" />
                    Bỏ chọn
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>MÃ</TableHead>
                  <TableHead>LOẠI</TableHead>
                  <TableHead>KÊNH</TableHead>
                  <TableHead>TIÊU ĐỀ DỰ KIẾN</TableHead>
                  <TableHead>NGƯỜI PHỤ TRÁCH</TableHead>
                  <TableHead>NHÓM</TableHead>
                  <TableHead>NGÀY XUẤT BẢN</TableHead>
                  <TableHead>ĐỘ ƯU TIÊN</TableHead>
                  <TableHead>TRẠNG THÁI</TableHead>
                  <TableHead>AD SET / SLOT</TableHead>
                  <TableHead className="text-right">THAO TÁC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-900">{item.id}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{item.channel}</span>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="text-sm text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.format} • {item.objective}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#005e78' }}>
                          {item.ownerAvatar}
                        </div>
                        <span className="text-sm text-gray-900">{item.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{item.wave}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Calendar className="size-3" />
                        {item.publishDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(item.priority)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {(item as any).adSet && (
                          <Badge variant="outline" className="gap-1 text-xs" style={{ borderColor: '#1877f2', color: '#1877f2' }}>
                            <Users className="size-3" />
                            {(item as any).adSet}
                          </Badge>
                        )}
                        {item.slot && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <LinkIcon className="size-3" />
                            {item.slot}
                          </Badge>
                        )}
                        {item.vendor && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <Building className="size-3" />
                            {item.vendor}
                          </Badge>
                        )}
                        {!(item as any).adSet && !item.slot && !item.vendor && (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="size-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <FileText className="size-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Không tìm thấy nội dung phù hợp</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog - Simple version for now */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo nội dung mới</DialogTitle>
            <DialogDescription>
              Điền thông tin chi tiết cho nội dung cần sản xuất
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Form will be implemented here */}
            <p className="text-sm text-gray-600">Form tạo nội dung chi tiết sẽ được triển khai ở đây...</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Hủy
              </Button>
              <Button style={{ backgroundColor: '#005e78' }}>
                Tạo nội dung
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Create Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tạo nhiều Facebook Ads nhanh</DialogTitle>
            <DialogDescription>
              Tạo nhiều ads cùng format và targeting một lúc
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Format Facebook Ads</Label>
              <Select value={bulkFormat} onValueChange={setBulkFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">FB Single Image</SelectItem>
                  <SelectItem value="carousel">FB Carousel</SelectItem>
                  <SelectItem value="video">FB Video</SelectItem>
                  <SelectItem value="stories">FB Stories</SelectItem>
                  <SelectItem value="collection">FB Collection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Số lượng ads</Label>
              <Input type="number" placeholder="Nhập số lượng" defaultValue="5" />
            </div>

            <div className="space-y-2">
              <Label>Danh sách Ad Sets (mỗi Ad Set một dòng)</Label>
              <Textarea
                placeholder="AdSet Miền Bắc&#10;AdSet Miền Nam&#10;AdSet Miền Trung&#10;AdSet Retargeting&#10;AdSet LAL"
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label>Nhóm nội dung (Wave)</Label>
              <Select value={bulkWave} onValueChange={setBulkWave}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn wave" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wave1">Wave 1 - Pre-Tết</SelectItem>
                  <SelectItem value="wave2">Wave 2 - Cận Tết</SelectItem>
                  <SelectItem value="wave3">Wave 3 - Hậu Tết</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowBulkDialog(false)}>
                Hủy
              </Button>
              <Button style={{ backgroundColor: '#005e78' }}>
                <Zap className="size-4 mr-2" />
                Tạo {5} nội dung
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
