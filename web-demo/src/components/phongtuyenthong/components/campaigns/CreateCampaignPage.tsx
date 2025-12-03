import { useState } from 'react';
import { ArrowLeft, Plus, X, Upload, Calendar, Users, Target, FileText, Trash2, Folder, FolderOpen, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

// Simple Content Planning Component
function SimpleContentPlanning() {
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    owner: '',
    expectedDate: '',
    targetReach: '',
    targetClick: '',
    targetConversion: '',
    status: 'Chưa bắt đầu',
  });

  const statusOptions = [
    { value: 'not-started', label: 'Chưa bắt đầu', color: 'bg-gray-100 text-gray-700' },
    { value: 'designing', label: 'Đang thiết kế', color: 'bg-blue-100 text-blue-700' },
    { value: 'reviewing', label: 'Đang duyệt', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'approved', label: 'Đã duyệt', color: 'bg-green-100 text-green-700' },
    { value: 'published', label: 'Đã xuất bản', color: 'bg-purple-100 text-purple-700' },
  ];

  const handleAddContent = () => {
    if (!formData.title) {
      alert('Vui lòng nhập tiêu đề nội dung');
      return;
    }

    const newItem = {
      id: `CONT-${Date.now()}`,
      ...formData,
    };

    setContentItems([...contentItems, newItem]);
    setFormData({
      title: '',
      owner: '',
      expectedDate: '',
      targetReach: '',
      targetClick: '',
      targetConversion: '',
      status: 'Chưa bắt đầu',
    });
    setShowAddDialog(false);
  };

  const handleDeleteContent = (id: string) => {
    setContentItems(contentItems.filter(item => item.id !== id));
  };

  const getStatusBadge = (status: string) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj ? (
      <Badge className={statusObj.color}>{statusObj.label}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700">{status}</Badge>
    );
  };

  return (
    <Card className="border-2" style={{ borderColor: '#006885' }}>
      <CardHeader className="pb-4" style={{ backgroundColor: 'rgba(0, 104, 133, 0.05)' }}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Calendar className="size-5" style={{ color: '#006885' }} />
            Kế hoạch nội dung
          </CardTitle>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="gap-2"
            style={{ backgroundColor: '#006885', color: 'white' }}
          >
            <Plus className="size-4" />
            Thêm nội dung
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {contentItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="size-12 mx-auto mb-3 text-gray-400" />
            <p>Chưa có nội dung nào</p>
            <p className="text-sm">Nhấn "Thêm nội dung" để bắt đầu</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-700">STT</TableHead>
                  <TableHead className="text-gray-700">Tiêu đề</TableHead>
                  <TableHead className="text-gray-700">Người phụ trách</TableHead>
                  <TableHead className="text-gray-700">Ngày dự kiến</TableHead>
                  <TableHead className="text-gray-700">Chỉ tiêu Reach</TableHead>
                  <TableHead className="text-gray-700">Chỉ tiêu Click</TableHead>
                  <TableHead className="text-gray-700">Chỉ tiêu Conversion</TableHead>
                  <TableHead className="text-gray-700">Trạng thái</TableHead>
                  <TableHead className="text-gray-700 text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentItems.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="text-gray-600">{index + 1}</TableCell>
                    <TableCell className="text-gray-900">{item.title}</TableCell>
                    <TableCell className="text-gray-600">{item.owner || '-'}</TableCell>
                    <TableCell className="text-gray-600">
                      {item.expectedDate ? new Date(item.expectedDate).toLocaleDateString('vi-VN') : '-'}
                    </TableCell>
                    <TableCell className="text-gray-600">{item.targetReach || '-'}</TableCell>
                    <TableCell className="text-gray-600">{item.targetClick || '-'}</TableCell>
                    <TableCell className="text-gray-600">{item.targetConversion || '-'}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContent(item.id)}
                          className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Dialog thêm nội dung */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-[540px] p-0 gap-0 border-gray-200">
            <DialogHeader className="px-6 pt-5 pb-4 border-b border-gray-200">
              <DialogTitle className="text-gray-900">Thêm nội dung mới</DialogTitle>
            </DialogHeader>
            <div className="px-6 py-5 space-y-3.5">
              {/* Tiêu đề - Full width */}
              <div className="space-y-1.5">
                <Label className="text-[13px] font-medium text-gray-700">
                  Tiêu đề <span className="text-red-600">*</span>
                </Label>
                <Input
                  placeholder="VD: Post khuyến mãi Tết 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-10 border-gray-300 rounded-lg placeholder:text-gray-500"
                />
              </div>

              {/* Người phụ trách & Ngày dự kiến - 2 cột */}
              <div className="grid grid-cols-2 gap-3.5 items-end">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-gray-700">Người phụ trách</Label>
                  <Input
                    placeholder="Tên người phụ trách"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    className="h-10 border-gray-300 rounded-lg placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-gray-700">Ngày dự kiến</Label>
                  <Input
                    type="date"
                    value={formData.expectedDate}
                    onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
                    className="h-10 border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* 3 Chỉ tiêu - 3 cột bằng nhau */}
              <div className="grid grid-cols-3 gap-3.5">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-gray-700">Chỉ tiêu Reach</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.targetReach}
                    onChange={(e) => setFormData({ ...formData, targetReach: e.target.value })}
                    className="h-10 border-gray-300 rounded-lg placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-gray-700">Chỉ tiêu Click</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.targetClick}
                    onChange={(e) => setFormData({ ...formData, targetClick: e.target.value })}
                    className="h-10 border-gray-300 rounded-lg placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium text-gray-700">Chỉ tiêu Conversion</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.targetConversion}
                    onChange={(e) => setFormData({ ...formData, targetConversion: e.target.value })}
                    className="h-10 border-gray-300 rounded-lg placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="px-6 py-4 border-t border-gray-200 flex gap-3 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="h-10 px-4 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </Button>
              <Button
                onClick={handleAddContent}
                className="h-10 px-4"
                style={{ backgroundColor: '#006885', color: 'white' }}
              >
                Thêm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

interface Document {
  id: string;
  name: string;
  file: File;
}

interface DocumentFolder {
  id: string;
  name: string;
  documents: Document[];
}

interface SubCampaign {
  id: string;
  name: string;
  type: string;
  objective: string;
  startDate: string;
  endDate: string;
  pic: string;
  team: string;
  channel: string;
  markets: string[];
  budget: string;
  revenue: string;
  kpiReach: string;
  kpiClick: string;
  kpiConversion: string;
  folders: DocumentFolder[];
}

interface CreateCampaignPageProps {
  onBack: () => void;
  onSave: (data: any) => void;
}

export default function CreateCampaignPage({ onBack, onSave }: CreateCampaignPageProps) {
  // Active tab
  const [activeTab, setActiveTab] = useState('info');

  // Parent campaign state
  const [parentName, setParentName] = useState('');
  const [parentObjective, setParentObjective] = useState('');
  const [parentStartDate, setParentStartDate] = useState('');
  const [parentEndDate, setParentEndDate] = useState('');
  const [parentBudget, setParentBudget] = useState('');
  const [parentPIC, setParentPIC] = useState('');
  const [approver, setApprover] = useState('');
  const [campaignCode, setCampaignCode] = useState('');
  const [expectedRevenue, setExpectedRevenue] = useState('');

  // Campaign type: 'with-sub' or 'without-sub'
  const [campaignType, setCampaignType] = useState<'with-sub' | 'without-sub'>('with-sub');

  // Extended fields for parent campaign without sub-campaigns
  const [parentType, setParentType] = useState('');
  const [parentChannel, setParentChannel] = useState('');
  const [parentMarkets, setParentMarkets] = useState<string[]>([]);
  const [parentKpiReach, setParentKpiReach] = useState('');
  const [parentKpiClick, setParentKpiClick] = useState('');
  const [parentKpiConversion, setParentKpiConversion] = useState('');

  // Document folders state
  const [folders, setFolders] = useState<DocumentFolder[]>([]);
  const [newFolderName, setNewFolderName] = useState('');

  // Sub-campaigns state
  const [subCampaigns, setSubCampaigns] = useState<SubCampaign[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state for new/edit sub-campaign
  const [formData, setFormData] = useState<SubCampaign>({
    id: '',
    name: '',
    type: '',
    objective: '',
    startDate: '',
    endDate: '',
    pic: '',
    team: '',
    channel: '',
    markets: [],
    budget: '',
    revenue: '',
    kpiReach: '',
    kpiClick: '',
    kpiConversion: '',
    folders: [],
  });

  // Form folder state (riêng cho form chiến dịch con)
  const [formNewFolderName, setFormNewFolderName] = useState('');

  const campaignTypes = [
    { value: 'media', label: 'Truyền thông' },
    { value: 'event', label: 'Sự kiện' },
    { value: 'crisis', label: 'Khủng hoảng' },
    { value: 'award', label: 'Giải thưởng' },
    { value: 'sponsor', label: 'Tài trợ' },
  ];

  const channelOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'google', label: 'Google Ads' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tv', label: 'Truyền hình' },
    { value: 'radio', label: 'Phát thanh' },
    { value: 'newspaper', label: 'Báo chí' },
    { value: 'website', label: 'Website' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'outdoor', label: 'Quảng cáo ngoài trời' },
    { value: 'other', label: 'Kênh khác' },
  ];

  const marketOptions = [
    { value: 'vietnam', label: 'Việt Nam' },
    { value: 'international', label: 'Quốc tế' },
    { value: 'asia', label: 'Châu Á' },
    { value: 'europe', label: 'Châu Âu' },
    { value: 'america', label: 'Châu Mỹ' },
    { value: 'oceania', label: 'Châu Đại Dương' },
  ];

  // Function to convert number to Vietnamese words
  const numberToVietnamese = (num: number): string => {
    if (num === 0) return 'Không đồng';
    
    const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const units = ['', 'nghìn', 'triệu', 'tỷ'];
    
    const convertThreeDigits = (n: number): string => {
      const hundred = Math.floor(n / 100);
      const ten = Math.floor((n % 100) / 10);
      const one = n % 10;
      
      let result = '';
      if (hundred > 0) result += ones[hundred] + ' trăm ';
      if (ten > 1) {
        result += ones[ten] + ' mươi ';
        if (one === 1) result += 'mốt ';
        else if (one === 5) result += 'lăm ';
        else if (one > 0) result += ones[one] + ' ';
      } else if (ten === 1) {
        result += 'mười ';
        if (one > 0) result += ones[one] + ' ';
      } else if (ten === 0 && one > 0 && hundred > 0) {
        result += 'lẻ ' + ones[one] + ' ';
      } else if (one > 0) {
        result += ones[one] + ' ';
      }
      
      return result.trim();
    };
    
    let result = '';
    let unitIndex = 0;
    
    while (num > 0) {
      const segment = num % 1000;
      if (segment > 0) {
        result = convertThreeDigits(segment) + (units[unitIndex] ? ' ' + units[unitIndex] : '') + ' ' + result;
      }
      num = Math.floor(num / 1000);
      unitIndex++;
    }
    
    return result.trim().charAt(0).toUpperCase() + result.trim().slice(1) + ' đồng';
  };

  const getBudgetInWords = (): string => {
    const budget = parseFloat(parentBudget.replace(/[,.]/g, ''));
    if (isNaN(budget) || budget === 0) return '';
    return numberToVietnamese(budget);
  };

  const getRevenueInWords = (): string => {
    const revenue = parseFloat(expectedRevenue.replace(/[,.]/g, ''));
    if (isNaN(revenue) || revenue === 0) return '';
    return numberToVietnamese(revenue);
  };

  const getFormBudgetInWords = (): string => {
    const budget = parseFloat(formData.budget.replace(/[,.]/g, ''));
    if (isNaN(budget) || budget === 0) return '';
    return numberToVietnamese(budget);
  };

  const getFormRevenueInWords = (): string => {
    const revenue = parseFloat(formData.revenue.replace(/[,.]/g, ''));
    if (isNaN(revenue) || revenue === 0) return '';
    return numberToVietnamese(revenue);
  };

  const getParentKpiReachInWords = (): string => {
    const reach = parseFloat(parentKpiReach.replace(/[,.]/g, ''));
    if (isNaN(reach) || reach === 0) return '';
    return numberToVietnamese(reach);
  };

  const getParentKpiClickInWords = (): string => {
    const click = parseFloat(parentKpiClick.replace(/[,.]/g, ''));
    if (isNaN(click) || click === 0) return '';
    return numberToVietnamese(click);
  };

  const getParentKpiConversionInWords = (): string => {
    const conversion = parseFloat(parentKpiConversion.replace(/[,.]/g, ''));
    if (isNaN(conversion) || conversion === 0) return '';
    return numberToVietnamese(conversion);
  };

  const formatBudgetInput = (value: string): string => {
    // Remove non-numeric characters
    const numeric = value.replace(/\D/g, '');
    // Format with thousand separators
    return numeric.replace(/\B(?=(\d{3})+(?!\\d))/g, ',');
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBudgetInput(e.target.value);
    setParentBudget(formatted);
  };

  const handleRevenueChange = (value: string) => {
    const formatted = formatBudgetInput(value);
    setExpectedRevenue(formatted);
  };

  const toggleParentMarket = (marketValue: string) => {
    const markets = parentMarkets.includes(marketValue)
      ? parentMarkets.filter(m => m !== marketValue)
      : [...parentMarkets, marketValue];
    setParentMarkets(markets);
  };

  // Folder management functions
  const addFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: DocumentFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        documents: [],
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
    }
  };

  const removeFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
  };

  const handleFolderFileUpload = (folderId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        name: file.name,
        file: file,
      };
      
      setFolders(folders.map(folder => 
        folder.id === folderId 
          ? { ...folder, documents: [...folder.documents, newDoc] }
          : folder
      ));
    }
  };

  const removeDocument = (folderId: string, docId: string) => {
    setFolders(folders.map(folder =>
      folder.id === folderId
        ? { ...folder, documents: folder.documents.filter(doc => doc.id !== docId) }
        : folder
    ));
  };

  // Form folder management functions (cho chiến dịch con)
  const addFormFolder = () => {
    if (formNewFolderName.trim()) {
      const newFolder: DocumentFolder = {
        id: `form-folder-${Date.now()}`,
        name: formNewFolderName.trim(),
        documents: [],
      };
      setFormData({ ...formData, folders: [...formData.folders, newFolder] });
      setFormNewFolderName('');
    }
  };

  const removeFormFolder = (folderId: string) => {
    setFormData({ 
      ...formData, 
      folders: formData.folders.filter(f => f.id !== folderId) 
    });
  };

  const handleFormFolderFileUpload = (folderId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: Document = {
        id: `form-doc-${Date.now()}`,
        name: file.name,
        file: file,
      };
      
      setFormData({
        ...formData,
        folders: formData.folders.map(folder => 
          folder.id === folderId 
            ? { ...folder, documents: [...folder.documents, newDoc] }
            : folder
        )
      });
    }
  };

  const removeFormDocument = (folderId: string, docId: string) => {
    setFormData({
      ...formData,
      folders: formData.folders.map(folder =>
        folder.id === folderId
          ? { ...folder, documents: folder.documents.filter(doc => doc.id !== docId) }
          : folder
      )
    });
  };

  // Sub-campaign functions
  const handleAddNewClick = () => {
    setFormData({
      id: '',
      name: '',
      type: '',
      objective: '',
      startDate: '',
      endDate: '',
      pic: '',
      team: '',
      channel: '',
      markets: [],
      budget: '',
      revenue: '',
      kpiReach: '',
      kpiClick: '',
      kpiConversion: '',
      folders: [],
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (sub: SubCampaign) => {
    setFormData({ ...sub });
    setEditingId(sub.id);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      type: '',
      objective: '',
      startDate: '',
      endDate: '',
      pic: '',
      team: '',
      channel: '',
      markets: [],
      budget: '',
      revenue: '',
      kpiReach: '',
      kpiClick: '',
      kpiConversion: '',
      folders: [],
    });
  };

  const handleSaveForm = () => {
    if (!formData.name || !formData.type) {
      alert('Vui lòng điền tên chiến dịch và loại chiến dịch');
      return;
    }

    if (editingId) {
      // Update existing
      setSubCampaigns(subCampaigns.map(sub => 
        sub.id === editingId ? { ...formData, id: editingId } : sub
      ));
    } else {
      // Add new
      const newSub = { ...formData, id: `sub-${Date.now()}` };
      setSubCampaigns([...subCampaigns, newSub]);
    }

    handleCancelForm();
  };

  const removeSubCampaign = (id: string) => {
    setSubCampaigns(subCampaigns.filter(sub => sub.id !== id));
  };

  const updateFormData = (field: keyof SubCampaign, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleFormMarket = (marketValue: string) => {
    const markets = formData.markets.includes(marketValue)
      ? formData.markets.filter(m => m !== marketValue)
      : [...formData.markets, marketValue];
    setFormData({ ...formData, markets });
  };

  const getCampaignTypeLabel = (value: string) => {
    return campaignTypes.find(t => t.value === value)?.label || value;
  };

  const getChannelLabel = (value: string) => {
    return channelOptions.find(c => c.value === value)?.label || value;
  };

  const getMarketsLabel = (values: string[]) => {
    return values.map(v => marketOptions.find(m => m.value === v)?.label || v).join(', ');
  };

  const handleSubmit = () => {
    // Validation
    if (!parentName || !parentObjective || !parentStartDate || !parentEndDate || !parentPIC || !approver) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
      return;
    }

    const campaignData = {
      parent: {
        name: parentName,
        objective: parentObjective,
        startDate: parentStartDate,
        endDate: parentEndDate,
        budget: parentBudget,
        pic: parentPIC,
        approver: approver,
        code: campaignCode || `CD2026${Math.floor(Math.random() * 10000)}`, // Auto-generated
        type: parentType,
        channel: parentChannel,
        markets: parentMarkets,
        kpiReach: parentKpiReach,
        kpiClick: parentKpiClick,
        kpiConversion: parentKpiConversion,
      },
      campaignType: campaignType,
      subCampaigns: campaignType === 'with-sub' ? subCampaigns : [],
      folders: folders,
    };

    onSave(campaignData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
          style={{ color: '#006885' }}
        >
          <ArrowLeft className="size-4" />
          Quay lại
        </Button>
      </div>

      {/* Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl text-gray-900">Tạo mới chiến dịch</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Campaign Type Selection - NGOÀI TABS */}
        <div className="space-y-3">
          <Label className="text-gray-700">Loại cấu trúc chiến dịch</Label>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                campaignType === 'without-sub' 
                  ? 'border-[#006885] bg-blue-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => setCampaignType('without-sub')}
            >
              <input
                type="radio"
                checked={campaignType === 'without-sub'}
                onChange={() => setCampaignType('without-sub')}
                style={{ accentColor: '#006885' }}
              />
              <div className="font-medium text-gray-900">Không bao gồm chiến dịch con</div>
            </div>

            <div 
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                campaignType === 'with-sub' 
                  ? 'border-[#006885] bg-blue-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => setCampaignType('with-sub')}
            >
              <input
                type="radio"
                checked={campaignType === 'with-sub'}
                onChange={() => setCampaignType('with-sub')}
                style={{ accentColor: '#006885' }}
              />
              <div className="font-medium text-gray-900">Có bao gồm chiến dịch con</div>
            </div>
          </div>
        </div>

        {/* Tabs - Nằm dưới radio buttons */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border-2 p-1 h-auto" style={{ borderColor: 'rgba(0, 94, 120, 0.2)' }}>
            <TabsTrigger 
              value="info" 
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <Target className="size-4" />
              Thông tin chiến dịch
            </TabsTrigger>
            <TabsTrigger 
              value="documents"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <Folder className="size-4" />
              Quản lý tài liệu
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: THÔNG TIN CHIẾN DỊCH */}
          <TabsContent value="info" className="space-y-6">
            {/* A. THÔNG TIN CHIẾN DỊCH CHA */}
            <Card className="border-2" style={{ borderColor: '#006885' }}>
              <CardHeader className="pb-4" style={{ backgroundColor: 'rgba(0, 104, 133, 0.05)' }}>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Target className="size-5" style={{ color: '#006885' }} />
                  {campaignType === 'without-sub' ? 'Thông tin chiến dịch' : 'Thông tin chiến dịch cha'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {/* Row 1: Tên chiến dịch + Mã chiến dịch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Tên chiến dịch <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      placeholder="VD: Truyền thông Tết 2026"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Mã chiến dịch <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      placeholder="VD: CPMS-2025-001"
                      value={campaignCode}
                      onChange={(e) => setCampaignCode(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                {/* Row 2: Mục tiêu tổng */}
                <div className="space-y-2">
                  <Label className="text-gray-700">
                    Mục tiêu tổng <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    placeholder="VD: Tăng nhận diện thương hiệu Vietnam Airlines dịp Tết, tăng booking 15%"
                    value={parentObjective}
                    onChange={(e) => setParentObjective(e.target.value)}
                    rows={2}
                    className="border-gray-300"
                  />
                </div>

                {/* Row 3: Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Ngày bắt đầu <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={parentStartDate}
                      onChange={(e) => setParentStartDate(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Ngày kết thúc <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={parentEndDate}
                      onChange={(e) => setParentEndDate(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                {/* Row 4: Ngân sách dự kiến tổng + Doanh thu dự kiến */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Ngân sách dự kiến tổng (VNĐ)</Label>
                    <Input
                      placeholder="Nhập số tiền"
                      value={parentBudget}
                      onChange={handleBudgetChange}
                      className="border-gray-300"
                    />
                    <p className="text-sm text-gray-500">{getBudgetInWords()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Doanh thu dự kiến (VNĐ)</Label>
                    <Input
                      placeholder="Nhập số tiền"
                      value={expectedRevenue}
                      onChange={(e) => handleRevenueChange(e.target.value)}
                      className="border-gray-300"
                    />
                    <p className="text-sm text-gray-500">{getRevenueInWords()}</p>
                  </div>
                </div>

                {/* Row 5: PIC + Approver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Người phụ trách chính <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      placeholder="Người phụ trách chính"
                      value={parentPIC}
                      onChange={(e) => setParentPIC(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Lãnh đạo phê duyệt <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      placeholder="Người phê duyệt"
                      value={approver}
                      onChange={(e) => setApprover(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                {/* Extended Fields - Chỉ hiển thị khi KHÔNG có chiến dịch con */}
                {campaignType === 'without-sub' && (
                  <>
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-6"></div>
                    {/* Loại chiến dịch + Kênh chạy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700">Loại chiến dịch</Label>
                        <Select value={parentType} onValueChange={setParentType}>
                          <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Chọn loại" />
                          </SelectTrigger>
                          <SelectContent>
                            {campaignTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700">Kênh chạy</Label>
                        <Select value={parentChannel} onValueChange={setParentChannel}>
                          <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Chọn kênh" />
                          </SelectTrigger>
                          <SelectContent>
                            {channelOptions.map((channel) => (
                              <SelectItem key={channel.value} value={channel.value}>
                                {channel.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Thị trường chạy */}
                    <div className="space-y-2">
                      <Label className="text-gray-700">Thị trường chạy</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-300 rounded-md bg-white">
                        {marketOptions.map((market) => (
                          <div key={market.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`parent-${market.value}`}
                              checked={parentMarkets.includes(market.value)}
                              onCheckedChange={() => toggleParentMarket(market.value)}
                            />
                            <label
                              htmlFor={`parent-${market.value}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {market.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dự kiến KPI */}
                    <div className="space-y-2">
                      <Label className="text-gray-700">Chỉ số KPI dự kiến</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-600">Reach (người tiếp cận)</Label>
                          <Input
                            placeholder="VD: 1,000,000"
                            value={parentKpiReach}
                            onChange={(e) => {
                              const formatted = formatBudgetInput(e.target.value);
                              setParentKpiReach(formatted);
                            }}
                            className="border-gray-300"
                          />
                          {parentKpiReach && (
                            <p className="text-xs text-gray-500">{getParentKpiReachInWords()}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-600">Click</Label>
                          <Input
                            placeholder="VD: 50,000"
                            value={parentKpiClick}
                            onChange={(e) => {
                              const formatted = formatBudgetInput(e.target.value);
                              setParentKpiClick(formatted);
                            }}
                            className="border-gray-300"
                          />
                          {parentKpiClick && (
                            <p className="text-xs text-gray-500">{getParentKpiClickInWords()}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-600">Conversion</Label>
                          <Input
                            placeholder="VD: 5,000"
                            value={parentKpiConversion}
                            onChange={(e) => {
                              const formatted = formatBudgetInput(e.target.value);
                              setParentKpiConversion(formatted);
                            }}
                            className="border-gray-300"
                          />
                          {parentKpiConversion && (
                            <p className="text-xs text-gray-500">{getParentKpiConversionInWords()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* C. KẾ HOẠCH NỘI DUNG - Chỉ hiển thị khi KHÔNG có chiến dịch con */}
            {campaignType === 'without-sub' && (
              <SimpleContentPlanning />
            )}

            {/* D. DANH SÁCH CHIẾN DỊCH CON - Hiển thị khi CÓ chiến dịch con */}
            {campaignType === 'with-sub' && (
              <Card className="border-2" style={{ borderColor: '#006885' }}>
                <CardHeader className="pb-4" style={{ backgroundColor: 'rgba(0, 104, 133, 0.05)' }}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <FileText className="size-5" style={{ color: '#006885' }} />
                      Danh sách chiến dịch con
                    </CardTitle>
                    {!showForm && (
                      <Button
                        onClick={handleAddNewClick}
                        className="gap-2"
                        style={{ backgroundColor: '#006885', color: 'white' }}
                      >
                        <Plus className="size-4" />
                        Thêm chiến dịch con
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Table view */}
                  {subCampaigns.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="size-12 mx-auto mb-3 text-gray-400" />
                      <p>Chưa có chiến dịch con nào</p>
                      <p className="text-sm">Nhấn "Thêm chiến dịch con" để bắt đầu</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-gray-700">STT</TableHead>
                            <TableHead className="text-gray-700">Tên chiến dịch</TableHead>
                            <TableHead className="text-gray-700">Loại</TableHead>
                            <TableHead className="text-gray-700">Kênh</TableHead>
                            <TableHead className="text-gray-700">Thị trường</TableHead>
                            <TableHead className="text-gray-700">Thời gian</TableHead>
                            <TableHead className="text-gray-700">Ngân sách</TableHead>
                            <TableHead className="text-gray-700">PIC</TableHead>
                            <TableHead className="text-gray-700 text-center">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subCampaigns.map((sub, index) => (
                            <TableRow key={sub.id} className="hover:bg-gray-50">
                              <TableCell className="text-gray-600">{index + 1}</TableCell>
                              <TableCell className="text-gray-900">{sub.name}</TableCell>
                              <TableCell className="text-gray-600">{getCampaignTypeLabel(sub.type)}</TableCell>
                              <TableCell className="text-gray-600">{getChannelLabel(sub.channel) || '-'}</TableCell>
                              <TableCell className="text-gray-600 max-w-[150px]">
                                <span className="text-xs truncate block">
                                  {getMarketsLabel(sub.markets) || '-'}
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-600 text-xs">
                                {sub.startDate && sub.endDate ? (
                                  <>
                                    {new Date(sub.startDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })} - {new Date(sub.endDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                                  </>
                                ) : '-'}
                              </TableCell>
                              <TableCell className="text-gray-600 text-xs">
                                {sub.budget ? `${sub.budget} VNĐ` : '-'}
                              </TableCell>
                              <TableCell className="text-gray-600">{sub.pic || '-'}</TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditClick(sub)}
                                    className="h-7 px-2"
                                    style={{ color: '#006885' }}
                                  >
                                    <Edit className="size-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSubCampaign(sub.id)}
                                    className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Dialog - Form thêm/sửa chiến dịch con */}
                  <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                      <DialogHeader>
                        <DialogTitle>
                          {editingId ? 'Chỉnh sửa chiến dịch con' : 'Thêm chiến dịch con mới'}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 hide-scrollbar">
                        {/* Tên chiến dịch + Loại */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700">
                              Tên chiến dịch <span className="text-red-600">*</span>
                            </Label>
                            <Input
                              placeholder="VD: Digital Media Phase 1"
                              value={formData.name}
                              onChange={(e) => updateFormData('name', e.target.value)}
                              className="border-gray-300 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">
                              Loại chiến dịch <span className="text-red-600">*</span>
                            </Label>
                            <Select
                              value={formData.type}
                              onValueChange={(value) => updateFormData('type', value)}
                            >
                              <SelectTrigger className="border-gray-300 bg-white">
                                <SelectValue placeholder="Chọn loại" />
                              </SelectTrigger>
                              <SelectContent>
                                {campaignTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Mục tiêu */}
                        <div className="space-y-2">
                          <Label className="text-gray-700">Mục tiêu</Label>
                          <Textarea
                            placeholder="Mô tả mục tiêu của chiến dịch này..."
                            value={formData.objective}
                            onChange={(e) => updateFormData('objective', e.target.value)}
                            rows={2}
                            className="border-gray-300 bg-white"
                          />
                        </div>

                        {/* Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700">Ngày bắt đầu</Label>
                            <Input
                              type="date"
                              value={formData.startDate}
                              onChange={(e) => updateFormData('startDate', e.target.value)}
                              className="border-gray-300 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">Ngày kết thúc</Label>
                            <Input
                              type="date"
                              value={formData.endDate}
                              onChange={(e) => updateFormData('endDate', e.target.value)}
                              className="border-gray-300 bg-white"
                            />
                          </div>
                        </div>

                        {/* PIC + Team */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700">Người phụ trách</Label>
                            <Input
                              placeholder="Người phụ trách"
                              value={formData.pic}
                              onChange={(e) => updateFormData('pic', e.target.value)}
                              className="border-gray-300 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">Thành viên</Label>
                            <Input
                              placeholder="Danh sách thành viên (phân cách bằng dấu phẩy)"
                              value={formData.team}
                              onChange={(e) => updateFormData('team', e.target.value)}
                              className="border-gray-300 bg-white"
                            />
                          </div>
                        </div>

                        {/* Kênh chạy */}
                        <div className="space-y-2">
                          <Label className="text-gray-700">Kênh chạy</Label>
                          <Select
                            value={formData.channel}
                            onValueChange={(value) => updateFormData('channel', value)}
                          >
                            <SelectTrigger className="border-gray-300 bg-white">
                              <SelectValue placeholder="Chọn kênh" />
                            </SelectTrigger>
                            <SelectContent>
                              {channelOptions.map((channel) => (
                                <SelectItem key={channel.value} value={channel.value}>
                                  {channel.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Thị trường chạy */}
                        <div className="space-y-2">
                          <Label className="text-gray-700">Thị trường chạy</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-300 rounded-md bg-white">
                            {marketOptions.map((market) => (
                              <div key={market.value} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`form-${market.value}`}
                                  checked={formData.markets.includes(market.value)}
                                  onCheckedChange={() => toggleFormMarket(market.value)}
                                />
                                <label
                                  htmlFor={`form-${market.value}`}
                                  className="text-sm text-gray-700 cursor-pointer"
                                >
                                  {market.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Ngân sách + Doanh thu dự kiến */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700">Ngân sách (VNĐ)</Label>
                            <Input
                              placeholder="Nhập số tiền"
                              value={formData.budget}
                              onChange={(e) => {
                                const formatted = formatBudgetInput(e.target.value);
                                updateFormData('budget', formatted);
                              }}
                              className="border-gray-300 bg-white"
                            />
                            {formData.budget && (
                              <p className="text-sm text-gray-500">{getFormBudgetInWords()}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">Doanh thu dự kiến (VNĐ)</Label>
                            <Input
                              placeholder="Nhập số tiền"
                              value={formData.revenue}
                              onChange={(e) => {
                                const formatted = formatBudgetInput(e.target.value);
                                updateFormData('revenue', formatted);
                              }}
                              className="border-gray-300 bg-white"
                            />
                            {formData.revenue && (
                              <p className="text-sm text-gray-500">{getFormRevenueInWords()}</p>
                            )}
                          </div>
                        </div>

                        {/* Dự kiến KPI */}
                        <div className="space-y-2">
                          <Label className="text-gray-700">Chỉ số KPI dự kiến</Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-600">Reach (người tiếp cận)</Label>
                              <Input
                                placeholder="VD: 1,000,000"
                                value={formData.kpiReach}
                                onChange={(e) => {
                                  const formatted = formatBudgetInput(e.target.value);
                                  updateFormData('kpiReach', formatted);
                                }}
                                className="border-gray-300 bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-600">Click</Label>
                              <Input
                                placeholder="VD: 50,000"
                                value={formData.kpiClick}
                                onChange={(e) => {
                                  const formatted = formatBudgetInput(e.target.value);
                                  updateFormData('kpiClick', formatted);
                                }}
                                className="border-gray-300 bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-600">Conversion</Label>
                              <Input
                                placeholder="VD: 5,000"
                                value={formData.kpiConversion}
                                onChange={(e) => {
                                  const formatted = formatBudgetInput(e.target.value);
                                  updateFormData('kpiConversion', formatted);
                                }}
                                className="border-gray-300 bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Quản lý tệp tải - Folders */}
                        <div className="space-y-3 pt-4 border-t border-gray-200 mt-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Folder className="size-4" style={{ color: '#006885' }} />
                            <Label className="text-gray-700">Quản lý thư mục tài liệu</Label>
                          </div>

                          {/* Add new folder section */}
                          <Card className="border border-gray-300 bg-gray-50">
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <Input
                                    placeholder="Nhập tên thư mục mới..."
                                    value={formNewFolderName}
                                    onChange={(e) => setFormNewFolderName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addFormFolder()}
                                    className="border-gray-300 bg-white h-9"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  onClick={addFormFolder}
                                  className="gap-2 px-4 h-9"
                                  style={{ backgroundColor: '#006885', color: 'white' }}
                                  disabled={!formNewFolderName.trim()}
                                  size="sm"
                                >
                                  <Plus className="size-3" />
                                  Tạo
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Folders list */}
                          {formData.folders.length > 0 && (
                            <div className="space-y-2">
                              {formData.folders.map((folder) => (
                                <Card key={folder.id} className="border border-gray-300 bg-white">
                                  <CardContent className="p-3">
                                    {/* Folder header */}
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <FolderOpen className="size-4 text-gray-600" />
                                        <span className="text-sm text-gray-800">{folder.name}</span>
                                        <span className="text-xs text-gray-500">({folder.documents.length})</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => document.getElementById(`folder-file-input-${folder.id}`)?.click()}
                                          className="gap-1 border-gray-300 h-7 px-2"
                                        >
                                          <Upload className="size-3" />
                                          <span className="text-xs">Tải lên</span>
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeFormFolder(folder.id)}
                                          className="text-gray-500 hover:text-red-600 hover:bg-red-50 h-7 w-7 p-0"
                                        >
                                          <Trash2 className="size-3" />
                                        </Button>
                                      </div>
                                    </div>

                                    <input
                                      id={`folder-file-input-${folder.id}`}
                                      type="file"
                                      onChange={(e) => handleFormFolderFileUpload(folder.id, e)}
                                      className="hidden"
                                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                                    />

                                    {/* Documents list */}
                                    {folder.documents.length > 0 && (
                                      <div className="space-y-1 pt-2 border-t border-gray-100">
                                        {folder.documents.map((doc) => (
                                          <div 
                                            key={doc.id} 
                                            className="flex items-center justify-between px-2 py-1.5 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors group"
                                          >
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                              <FileText className="size-3 text-gray-500 flex-shrink-0" />
                                              <span className="text-xs text-gray-700 truncate">{doc.name}</span>
                                            </div>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => removeFormDocument(folder.id, doc.id)}
                                              className="h-5 w-5 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                            >
                                              <X className="size-3" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={handleCancelForm}
                          className="border-gray-300 text-gray-700"
                        >
                          Hủy
                        </Button>
                        <Button
                          onClick={handleSaveForm}
                          style={{ backgroundColor: '#006885', color: 'white' }}
                        >
                          {editingId ? 'Cập nhật' : 'Lưu'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pb-8">
              <Button
                variant="outline"
                onClick={onBack}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: '#006885', color: 'white' }}
              >
                Lưu chiến dịch
              </Button>
            </div>
          </TabsContent>

          {/* TAB 2: QUẢN LÝ TÀI LIỆU */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="border-2" style={{ borderColor: '#006885' }}>
              <CardHeader className="pb-4" style={{ backgroundColor: 'rgba(0, 104, 133, 0.05)' }}>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Folder className="size-5" style={{ color: '#006885' }} />
                  Quản lý thư mục tài liệu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {/* Add new folder section */}
                <Card className="border border-gray-300 bg-gray-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Nhập tên thư mục mới..."
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addFolder()}
                          className="border-gray-300 bg-white h-9"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addFolder}
                        className="gap-2 px-4 h-9"
                        style={{ backgroundColor: '#006885', color: 'white' }}
                        disabled={!newFolderName.trim()}
                        size="sm"
                      >
                        <Plus className="size-3" />
                        Tạo
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Folders list */}
                {folders.length > 0 ? (
                  <div className="space-y-2">
                    {folders.map((folder) => (
                      <Card key={folder.id} className="border border-gray-300 bg-white">
                        <CardContent className="p-3">
                          {/* Folder header */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <FolderOpen className="size-4 text-gray-600" />
                              <span className="text-sm text-gray-800">{folder.name}</span>
                              <span className="text-xs text-gray-500">({folder.documents.length})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById(`doc-folder-file-input-${folder.id}`)?.click()}
                                className="gap-1 border-gray-300 h-7 px-2"
                              >
                                <Upload className="size-3" />
                                <span className="text-xs">Tải lên</span>
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFolder(folder.id)}
                                className="text-gray-500 hover:text-red-600 hover:bg-red-50 h-7 w-7 p-0"
                              >
                                <Trash2 className="size-3" />
                              </Button>
                            </div>
                          </div>

                          <input
                            id={`doc-folder-file-input-${folder.id}`}
                            type="file"
                            onChange={(e) => handleFolderFileUpload(folder.id, e)}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                          />

                          {/* Documents list */}
                          {folder.documents.length > 0 && (
                            <div className="space-y-1 pt-2 border-t border-gray-100">
                              {folder.documents.map((doc) => (
                                <div 
                                  key={doc.id} 
                                  className="flex items-center justify-between px-2 py-1.5 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors group"
                                >
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <FileText className="size-3 text-gray-500 flex-shrink-0" />
                                    <span className="text-xs text-gray-700 truncate">{doc.name}</span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeDocument(folder.id, doc.id)}
                                    className="h-5 w-5 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                  >
                                    <X className="size-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Folder className="size-12 mx-auto mb-3 text-gray-400" />
                    <p>Chưa có thư mục nào</p>
                    <p className="text-sm">Nhập tên thư mục và nhấn "Tạo" để bắt đầu</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
