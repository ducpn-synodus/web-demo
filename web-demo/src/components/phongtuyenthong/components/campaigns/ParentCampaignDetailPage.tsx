import { useState } from 'react';
import { ArrowLeft, Calendar, Users, DollarSign, Target, Plus, Eye, Edit, ChevronRight, ChevronDown, FolderOpen, File, Facebook, Instagram, Youtube, Mail, Tv, Radio, Newspaper, MapPin, PartyPopper } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
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

interface ParentCampaignDetailPageProps {
  campaignId: string;
  onBack: () => void;
  onViewSubCampaignDetail: (subCampaignId: string) => void;
}

interface TreeNode {
  id: string;
  code: string;
  name: string;
  channel?: string;
  market?: string;
  budget: number;
  budgetUsed: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
  pic: string;
  children?: TreeNode[];
}

interface SubCampaignFormData {
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
}

export default function ParentCampaignDetailPage({ campaignId, onBack, onViewSubCampaignDetail }: ParentCampaignDetailPageProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2'])); // Expand first 2 nodes by default
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set()); // Track expanded folders
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<SubCampaignFormData>({
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
  });

  // Mock data - kế hoạch tổng
  const campaign = {
    id: campaignId,
    code: 'CD20260001',
    name: 'Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026',
    objective: 'Tăng doanh số bán vé máy bay dịp Tết Bính Ngọ 2026, đạt 150,000 vé và tăng 25% doanh thu so với Tết năm trước',
    startDate: '2026-01-01',
    endDate: '2026-02-28',
    budget: 5000000000,
    budgetUsed: 3200000000,
    pic: 'Nguyễn Văn A',
    picEmail: 'nguyen.van.a@vietnamairlines.com',
    picPhone: '0912345678',
    approver: 'Trần Thị B',
    approverEmail: 'tran.thi.b@vietnamairlines.com',
    status: 'active',
    createdAt: '2025-12-01',
    createdBy: 'Nguyễn Văn A',
    description: 'Chương trình bán vé máy bay Tết Bính Ngọ 2026 với các chương trình khuyến mãi hấp dẫn, flash sale và ưu đãi đặc biệt cho các tuyến bay nội địa và quốc tế phục vụ nhu cầu di chuyển dịp Tết.',
    expectedRevenue: 6000000000,
    folders: [
      { 
        name: 'Tài liệu chiến lược', 
        fileCount: 5, 
        createdDate: '2025-12-01',
        files: [
          { name: 'Chiến lược tổng thể 2026.pdf', size: '2.3 MB', uploadDate: '2025-12-01', type: 'pdf' },
          { name: 'Phân tích thị trường Q1.xlsx', size: '1.5 MB', uploadDate: '2025-12-01', type: 'excel' },
          { name: 'Kế hoạch ngân sách.xlsx', size: '890 KB', uploadDate: '2025-12-02', type: 'excel' },
          { name: 'Mục tiêu KPI 2026.docx', size: '456 KB', uploadDate: '2025-12-02', type: 'word' },
          { name: 'Timeline thực hiện.pdf', size: '1.2 MB', uploadDate: '2025-12-03', type: 'pdf' },
        ]
      },
      { 
        name: 'Creative Assets', 
        fileCount: 23, 
        createdDate: '2025-12-03',
        files: [
          { name: 'Logo VNA 2026.ai', size: '5.2 MB', uploadDate: '2025-12-03', type: 'illustrator' },
          { name: 'Banner Facebook 1200x628.png', size: '3.4 MB', uploadDate: '2025-12-04', type: 'image' },
          { name: 'Banner Instagram 1080x1080.png', size: '2.8 MB', uploadDate: '2025-12-04', type: 'image' },
          { name: 'TVC Script 30s.docx', size: '234 KB', uploadDate: '2025-12-05', type: 'word' },
          { name: 'Storyboard TVC.pdf', size: '4.5 MB', uploadDate: '2025-12-05', type: 'pdf' },
        ]
      },
      { 
        name: 'Báo cáo hiệu quả', 
        fileCount: 8, 
        createdDate: '2025-12-05',
        files: [
          { name: 'Báo cáo tuần 1.pdf', size: '1.8 MB', uploadDate: '2025-12-05', type: 'pdf' },
          { name: 'Báo cáo tuần 2.pdf', size: '2.1 MB', uploadDate: '2025-12-12', type: 'pdf' },
          { name: 'Dashboard Analytics.xlsx', size: '3.2 MB', uploadDate: '2025-12-15', type: 'excel' },
          { name: 'Performance Report Q1.pptx', size: '5.6 MB', uploadDate: '2025-12-20', type: 'powerpoint' },
        ]
      },
      { 
        name: 'Brief & Guidelines', 
        fileCount: 12, 
        createdDate: '2025-12-02',
        files: [
          { name: 'Brand Guidelines 2026.pdf', size: '8.9 MB', uploadDate: '2025-12-02', type: 'pdf' },
          { name: 'Social Media Guidelines.docx', size: '678 KB', uploadDate: '2025-12-02', type: 'word' },
          { name: 'Content Calendar.xlsx', size: '1.1 MB', uploadDate: '2025-12-03', type: 'excel' },
          { name: 'Brief chiến dịch Tết.pdf', size: '2.4 MB', uploadDate: '2025-12-03', type: 'pdf' },
        ]
      },
    ],
  };

  // Mock data - các chiến dịch con với cấu trúc phân cấp
  const subCampaigns: TreeNode[] = [
    {
      id: '1',
      code: 'CDTP20260001',
      name: 'Khuyến mãi Online - Tết Bính Ngọ',
      channel: 'Digital Marketing',
      market: 'Việt Nam, Nhật Bản',
      budget: 1500000000,
      budgetUsed: 950000000,
      startDate: '2026-01-01',
      endDate: '2026-02-15',
      status: 'active',
      pic: 'Lê Văn C',
      children: [
        {
          id: '1-1',
          code: 'CDTP20260001-1',
          name: 'Flash Sale Vé Tết - Facebook',
          channel: 'Facebook',
          market: 'Việt Nam',
          budget: 800000000,
          budgetUsed: 500000000,
          startDate: '2026-01-01',
          endDate: '2026-02-15',
          status: 'active',
          pic: 'Lê Văn C',
          children: [
            {
              id: '1-1-1',
              code: 'CDTP20260001-1-1',
              name: 'Flash Sale - Miền Bắc',
              channel: 'Facebook',
              market: 'Hà Nội, Hải Phòng',
              budget: 400000000,
              budgetUsed: 280000000,
              startDate: '2026-01-01',
              endDate: '2026-02-15',
              status: 'active',
              pic: 'Nguyễn Thị H',
            },
            {
              id: '1-1-2',
              code: 'CDTP20260001-1-2',
              name: 'Flash Sale - Miền Nam',
              channel: 'Facebook',
              market: 'TP.HCM, Đà Nẵng',
              budget: 400000000,
              budgetUsed: 220000000,
              startDate: '2026-01-01',
              endDate: '2026-02-15',
              status: 'active',
              pic: 'Trần Văn K',
            },
          ],
        },
        {
          id: '1-2',
          code: 'CDTP20260001-2',
          name: 'Khuyến mãi Social Media',
          channel: 'Instagram/TikTok',
          market: 'Việt Nam, Nhật Bản',
          budget: 700000000,
          budgetUsed: 450000000,
          startDate: '2026-01-01',
          endDate: '2026-02-15',
          status: 'active',
          pic: 'Lê Văn C',
          children: [
            {
              id: '1-2-1',
              code: 'CDTP20260001-2-1',
              name: 'Instagram Ads - Vé Tết',
              channel: 'Instagram',
              market: 'Việt Nam',
              budget: 350000000,
              budgetUsed: 220000000,
              startDate: '2026-01-01',
              endDate: '2026-02-15',
              status: 'active',
              pic: 'Vũ Thị L',
            },
            {
              id: '1-2-2',
              code: 'CDTP20260001-2-2',
              name: 'TikTok Promo - Vé Tết',
              channel: 'TikTok',
              market: 'Việt Nam, Nhật Bản',
              budget: 350000000,
              budgetUsed: 230000000,
              startDate: '2026-01-05',
              endDate: '2026-02-15',
              status: 'active',
              pic: 'Đặng Văn M',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      code: 'CDTP20260002',
      name: 'TVC Tết 2026',
      channel: 'TVC',
      market: 'Việt Nam',
      budget: 2000000000,
      budgetUsed: 1800000000,
      startDate: '2026-01-05',
      endDate: '2026-02-20',
      status: 'active',
      pic: 'Phạm Thị D',
      children: [
        {
          id: '2-1',
          code: 'CDTP20260002-1',
          name: 'TVC 30s - Kênh VTV',
          channel: 'TVC',
          market: 'Việt Nam',
          budget: 1200000000,
          budgetUsed: 1100000000,
          startDate: '2026-01-05',
          endDate: '2026-02-20',
          status: 'active',
          pic: 'Phạm Thị D',
        },
        {
          id: '2-2',
          code: 'CDTP20260002-2',
          name: 'TVC 15s - Kênh HTV',
          channel: 'TVC',
          market: 'Việt Nam',
          budget: 800000000,
          budgetUsed: 700000000,
          startDate: '2026-01-05',
          endDate: '2026-02-20',
          status: 'active',
          pic: 'Phạm Thị D',
        },
      ],
    },
    {
      id: '3',
      code: 'CDTP20260003',
      name: 'PR & Event Tết',
      channel: 'PR & Event',
      market: 'Việt Nam, Hàn Quốc',
      budget: 1000000000,
      budgetUsed: 450000000,
      startDate: '2026-01-10',
      endDate: '2026-02-28',
      status: 'active',
      pic: 'Hoàng Văn E',
      children: [
        {
          id: '3-1',
          code: 'CDTP20260003-1',
          name: 'Họp báo ra mắt chiến dịch',
          channel: 'Event',
          market: 'Việt Nam',
          budget: 300000000,
          budgetUsed: 300000000,
          startDate: '2026-01-10',
          endDate: '2026-01-10',
          status: 'completed',
          pic: 'Hoàng Văn E',
        },
        {
          id: '3-2',
          code: 'CDTP20260003-2',
          name: 'PR trên báo chí',
          channel: 'PR',
          market: 'Việt Nam',
          budget: 400000000,
          budgetUsed: 150000000,
          startDate: '2026-01-15',
          endDate: '2026-02-28',
          status: 'active',
          pic: 'Bùi Thị N',
        },
        {
          id: '3-3',
          code: 'CDTP20260003-3',
          name: 'Roadshow tại sân bay',
          channel: 'Event',
          market: 'Hà Nội, TP.HCM',
          budget: 300000000,
          budgetUsed: 0,
          startDate: '2026-02-01',
          endDate: '2026-02-15',
          status: 'paused',
          pic: 'Lý Văn P',
        },
      ],
    },
    {
      id: '4',
      code: 'CDTP20260004',
      name: 'OOH - Billboard Tết',
      channel: 'OOH',
      market: 'Việt Nam',
      budget: 500000000,
      budgetUsed: 0,
      startDate: '2026-01-15',
      endDate: '2026-02-10',
      status: 'paused',
      pic: 'Trần Thị F',
      children: [
        {
          id: '4-1',
          code: 'CDTP20260004-1',
          name: 'Billboard Nội Bài, Tân Sơn Nhất',
          channel: 'OOH',
          market: 'Hà Nội, TP.HCM',
          budget: 300000000,
          budgetUsed: 0,
          startDate: '2026-01-15',
          endDate: '2026-02-10',
          status: 'paused',
          pic: 'Trần Thị F',
        },
        {
          id: '4-2',
          code: 'CDTP20260004-2',
          name: 'Billboard tại trung tâm thành phố',
          channel: 'OOH',
          market: 'Hà Nội, Đà Nẵng, TP.HCM',
          budget: 200000000,
          budgetUsed: 0,
          startDate: '2026-01-20',
          endDate: '2026-02-10',
          status: 'paused',
          pic: 'Phạm Văn Q',
        },
      ],
    },
    {
      id: '5',
      code: 'CDTP20260005',
      name: 'Email Marketing & CRM',
      channel: 'Email/CRM',
      market: 'Toàn cầu',
      budget: 300000000,
      budgetUsed: 180000000,
      startDate: '2026-01-01',
      endDate: '2026-02-28',
      status: 'active',
      pic: 'Đỗ Thị G',
      children: [
        {
          id: '5-1',
          code: 'CDTP20260005-1',
          name: 'Email khuyến mãi Tết',
          channel: 'Email',
          market: 'Việt Nam',
          budget: 100000000,
          budgetUsed: 80000000,
          startDate: '2026-01-01',
          endDate: '2026-02-15',
          status: 'active',
          pic: 'Đỗ Thị G',
        },
        {
          id: '5-2',
          code: 'CDTP20260005-2',
          name: 'CRM Loyalty Program',
          channel: 'CRM',
          market: 'Toàn cầu',
          budget: 200000000,
          budgetUsed: 100000000,
          startDate: '2026-01-05',
          endDate: '2026-02-28',
          status: 'active',
          pic: 'Ngô Văn R',
        },
      ],
    },
    {
      id: '6',
      code: 'CDTP20260006',
      name: 'Digital Display & Google Ads',
      channel: 'Digital Display',
      market: 'Việt Nam, Nhật Bản, Hàn Quốc',
      budget: 700000000,
      budgetUsed: 420000000,
      startDate: '2026-01-01',
      endDate: '2026-02-20',
      status: 'active',
      pic: 'Hà Văn S',
      children: [
        {
          id: '6-1',
          code: 'CDTP20260006-1',
          name: 'Google Search Ads',
          channel: 'Google Ads',
          market: 'Việt Nam',
          budget: 300000000,
          budgetUsed: 180000000,
          startDate: '2026-01-01',
          endDate: '2026-02-20',
          status: 'active',
          pic: 'Hà Văn S',
        },
        {
          id: '6-2',
          code: 'CDTP20260006-2',
          name: 'Google Display Network',
          channel: 'GDN',
          market: 'Nhật Bản, Hàn Quốc',
          budget: 250000000,
          budgetUsed: 150000000,
          startDate: '2026-01-05',
          endDate: '2026-02-20',
          status: 'active',
          pic: 'Mai Thị T',
        },
        {
          id: '6-3',
          code: 'CDTP20260006-3',
          name: 'YouTube Ads',
          channel: 'YouTube',
          market: 'Việt Nam, Nhật Bản',
          budget: 150000000,
          budgetUsed: 90000000,
          startDate: '2026-01-10',
          endDate: '2026-02-20',
          status: 'active',
          pic: 'Cao Văn U',
        },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      active: { label: 'Đang chạy', color: 'text-white' },
      paused: { label: 'Tạm dừng', color: 'bg-red-600 text-white' },
      completed: { label: 'Hoàn thành', color: 'bg-green-600 text-white' },
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge 
        className={`${config.color} border-0`}
        style={status === 'active' ? { backgroundColor: '#006885' } : {}}
      >
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const budgetProgress = (campaign.budgetUsed / campaign.budget) * 100;

  // Helper function to get channel icon
  const getChannelIcon = (channel?: string) => {
    if (!channel) return null;
    
    const iconClass = "size-4";
    const iconStyle = { color: '#006885' };
    
    // Match channel string to appropriate icon
    if (channel.toLowerCase().includes('facebook') || channel.toLowerCase().includes('fb')) {
      return <Facebook className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('instagram')) {
      return <Instagram className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('tiktok')) {
      return <svg className={iconClass} style={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>;
    }
    if (channel.toLowerCase().includes('youtube')) {
      return <Youtube className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('tvc') || channel.toLowerCase().includes('tv')) {
      return <Tv className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('radio')) {
      return <Radio className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('email') || channel.toLowerCase().includes('mail')) {
      return <Mail className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('pr') || channel.toLowerCase().includes('báo')) {
      return <Newspaper className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('ooh') || channel.toLowerCase().includes('billboard')) {
      return <MapPin className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('event')) {
      return <PartyPopper className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('google') || channel.toLowerCase().includes('gdn')) {
      return <svg className={iconClass} style={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>;
    }
    if (channel.toLowerCase().includes('crm')) {
      return <Users className={iconClass} style={iconStyle} />;
    }
    if (channel.toLowerCase().includes('social')) {
      return <svg className={iconClass} style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
    }
    if (channel.toLowerCase().includes('digital') || channel.toLowerCase().includes('display')) {
      return <Target className={iconClass} style={iconStyle} />;
    }
    
    // Default icon
    return <Target className={iconClass} style={iconStyle} />;
  };

  // Helper function to get channel logo (using real brand images)
  const getChannelLogo = (channel?: string) => {
    if (!channel) return null;
    
    const logoStyle = { width: '20px', height: '20px', objectFit: 'contain' as const };
    
    // Match channel string to logo URL
    if (channel.toLowerCase().includes('facebook') || channel.toLowerCase().includes('fb')) {
      return <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="Facebook" style={logoStyle} />;
    }
    if (channel.toLowerCase().includes('instagram')) {
      return <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={logoStyle} />;
    }
    if (channel.toLowerCase().includes('tiktok')) {
      return <img src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png" alt="TikTok" style={logoStyle} />;
    }
    if (channel.toLowerCase().includes('youtube')) {
      return <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" style={logoStyle} />;
    }
    if (channel.toLowerCase().includes('google') || channel.toLowerCase().includes('gdn')) {
      return <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={logoStyle} />;
    }
    
    // Fallback to icon
    return getChannelIcon(channel);
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const handleDownloadFile = (fileName: string, fileType: string) => {
    // In a real application, this would download the actual file from the server
    // For now, we'll create a simple text file as a demo
    const demoContent = `Đây là file demo: ${fileName}\nLoại file: ${fileType}\nTải về lúc: ${new Date().toLocaleString('vi-VN')}`;
    const blob = new Blob([demoContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderTreeNode = (node: TreeNode, level: number = 0, isLast: boolean = false, ancestorLines: boolean[] = []) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const budgetProgress = (node.budgetUsed / node.budget) * 100;
    
    // Determine background based on level
    const getBackground = () => {
      if (level === 0) return '#F6F8FA'; // Parent campaign - light blue-gray
      return 'white'; // Sub-campaigns
    };
    
    // Determine border based on level
    const getBorderStyle = () => {
      if (level === 0) {
        return 'border-b-2 border-gray-300'; // Thicker border for parent
      }
      return 'border-b border-gray-200'; // Normal border for children
    };
    
    // Determine icon size based on level
    const getIconSize = () => {
      if (level === 0) return 'size-6'; // Larger for parent
      if (level === 1) return 'size-5';
      return 'size-4'; // Smaller for deeper levels
    };
    
    // Determine font weight for name
    const getFontWeight = () => {
      if (level === 0) return 'font-semibold'; // Bold for parent (600-700)
      return 'font-normal'; // Normal for children (400-500)
    };
    
    // Determine spacing
    const getSpacing = () => {
      if (level === 0) return 'mb-6'; // 24px between parent campaigns
      return 'mb-2'; // 8px between sub-campaigns
    };

    return (
      <div key={node.id} className={level === 0 ? getSpacing() : ''}>
        {/* Parent/Child Node */}
        <div 
          className={`${getBorderStyle()} hover:bg-gray-50/50 transition-colors relative`}
          style={{ 
            backgroundColor: getBackground(),
          }}
        >
          {/* Vertical connector lines */}
          {level > 0 && (
            <div className="absolute left-0 top-0 bottom-0 flex" style={{ width: `${level * 32}px` }}>
              {ancestorLines.map((shouldDraw, index) => (
                shouldDraw && (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${index * 32 + 19}px`,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      backgroundColor: '#D0D7DE',
                    }}
                  />
                )
              ))}
              {/* Horizontal line to node */}
              <div
                className="absolute"
                style={{
                  left: `${(level - 1) * 32 + 19}px`,
                  top: '24px',
                  width: '13px',
                  height: '1px',
                  backgroundColor: '#D0D7DE',
                }}
              />
              {/* Vertical line for current node (if not last) */}
              {!isLast && (
                <div
                  className="absolute"
                  style={{
                    left: `${(level - 1) * 32 + 19}px`,
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    backgroundColor: '#D0D7DE',
                  }}
                />
              )}
              {/* Vertical line for current node (only top half if last) */}
              {isLast && (
                <div
                  className="absolute"
                  style={{
                    left: `${(level - 1) * 32 + 19}px`,
                    top: 0,
                    height: '24px',
                    width: '1px',
                    backgroundColor: '#D0D7DE',
                  }}
                />
              )}
            </div>
          )}

          <div className="py-3 px-4 flex items-start gap-3" style={{ paddingLeft: `${16 + level * 32}px` }}>
            {/* Expand/Collapse Button + Icon */}
            <div className="flex items-start gap-2 flex-shrink-0">
              {hasChildren ? (
                <button
                  onClick={() => toggleNode(node.id)}
                  className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-200 transition-colors"
                  style={{ marginTop: '2px' }}
                >
                  {isExpanded ? (
                    <ChevronDown className="size-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="size-4 text-gray-600" />
                  )}
                </button>
              ) : (
                <div className="w-5 h-5"></div>
              )}
              
              {/* Icon or Logo */}
              <div className="flex-shrink-0" style={{ marginTop: '1px' }}>
                {hasChildren ? (
                  <FolderOpen className={getIconSize()} style={{ color: '#006885' }} />
                ) : (
                  <File className={getIconSize()} style={{ color: level === 0 ? '#006885' : '#9CA3AF' }} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 grid grid-cols-12 gap-4">
              {/* Code & Name - 4 cols */}
              <div className="col-span-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs ${level === 0 ? 'text-gray-600' : 'text-gray-500'}`}>{node.code}</span>
                  <Badge 
                    className={`border-0 ${level > 0 ? 'opacity-85' : ''}`}
                    style={node.status === 'active' ? { backgroundColor: '#006885' } : node.status === 'paused' ? { backgroundColor: '#DC2626' } : { backgroundColor: '#16A34A' }}
                  >
                    {node.status === 'active' ? 'Đang chạy' : node.status === 'paused' ? 'Tạm dừng' : 'Hoàn thành'}
                  </Badge>
                </div>
                <h3 className={`text-gray-900 ${getFontWeight()} ${level === 0 ? 'text-base' : level === 1 ? 'text-sm' : 'text-xs'}`}>
                  {node.name}
                </h3>
                <div className="flex flex-col gap-0.5 mt-1 text-xs text-gray-600">
                  {node.channel && (
                    <div className="flex items-center gap-1.5">
                      {getChannelLogo(node.channel)}
                      <span>Kênh: {node.channel}</span>
                    </div>
                  )}
                  {node.market && <span className="text-xs">Thị trường: {node.market}</span>}
                </div>
              </div>

              {/* Budget - 3 cols */}
              <div className="col-span-3">
                <p className="text-xs text-gray-500 mb-1">Ngân sách</p>
                <p className={`${level === 0 ? 'text-sm font-medium' : 'text-xs'} text-gray-900 mb-1`}>
                  {formatCurrency(node.budget)} VNĐ
                </p>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div 
                    className="h-full transition-all"
                    style={{ 
                      width: `${budgetProgress}%`,
                      backgroundColor: '#006885'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{budgetProgress.toFixed(0)}% sử dụng</p>
              </div>

              {/* Time - 2 cols */}
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Thời gian</p>
                <p className={`${level === 0 ? 'text-sm' : 'text-xs'} text-gray-700`}>
                  {new Date(node.startDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </p>
                <p className={`${level === 0 ? 'text-sm' : 'text-xs'} text-gray-700`}>
                  {new Date(node.endDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </p>
              </div>

              {/* PIC - 2 cols */}
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">PIC</p>
                <p className={`${level === 0 ? 'text-sm' : 'text-xs'} text-gray-700`}>{node.pic}</p>
              </div>

              {/* Actions - 1 col */}
              <div className="col-span-1 flex items-start gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-gray-100"
                  style={{ color: '#006885' }}
                  onClick={() => onViewSubCampaignDetail(node.id)}
                  title="Xem chi tiết"
                >
                  <Eye className="size-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-gray-100"
                  style={{ color: '#006885' }}
                  onClick={() => {
                    // TODO: Handle edit campaign
                    alert(`Sửa chiến dịch: ${node.name}`);
                  }}
                  title="Sửa chiến dịch"
                >
                  <Edit className="size-7" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Render children */}
        {hasChildren && isExpanded && node.children?.map((child, index) => {
          const isLastChild = index === node.children!.length - 1;
          const newAncestorLines = [...ancestorLines, !isLast];
          return renderTreeNode(child, level + 1, isLastChild, newAncestorLines);
        })}
      </div>
    );
  };

  const countTotalCampaigns = (nodes: TreeNode[]): number => {
    let count = nodes.length;
    nodes.forEach(node => {
      if (node.children) {
        count += countTotalCampaigns(node.children);
      }
    });
    return count;
  };

  const totalCampaigns = countTotalCampaigns(subCampaigns);

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
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-gray-900">{campaign.name}</h1>
              {getStatusBadge(campaign.status)}
            </div>
            <p className="text-gray-500">Mã kế hoạch: {campaign.code}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Thông tin tổng quan */}
        <Card className="border border-gray-300">
          <CardHeader className="pb-2 border-b border-gray-200">
            <h2 className="text-gray-900">Thông tin tổng quan</h2>
          </CardHeader>
          <CardContent className="pt-3 space-y-2">
            {/* Row 1: Tên chiến dịch + Mã chiến dịch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Tên chiến dịch</Label>
                <p className="text-sm text-gray-900">{campaign.name}</p>
              </div>
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Mã chiến dịch</Label>
                <p className="text-sm text-gray-900">{campaign.code}</p>
              </div>
            </div>

            {/* Row 2: Mục tiêu tổng */}
            <div className="space-y-0.5 p-2 border border-gray-200 rounded">
              <Label className="text-xs text-gray-700">Mục tiêu tổng</Label>
              <p className="text-sm text-gray-900">{campaign.objective}</p>
            </div>

            {/* Row 3: Mô tả tổng quan */}
            <div className="space-y-0.5 p-2 border border-gray-200 rounded">
              <Label className="text-xs text-gray-700">Mô tả tổng quan</Label>
              <p className="text-sm text-gray-900">{campaign.description}</p>
            </div>

            {/* Row 4: Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Ngày bắt đầu</Label>
                <p className="text-sm text-gray-900">{new Date(campaign.startDate).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Ngày kết thúc</Label>
                <p className="text-sm text-gray-900">{new Date(campaign.endDate).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>

            {/* Row 5: Ngân sách dự kiến tổng + Doanh thu dự kiến */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Ngân sách dự kiến tổng (VNĐ)</Label>
                <p className="text-sm text-gray-900">{formatCurrency(campaign.budget)} VNĐ</p>
                <div className="mt-1.5 pt-1.5 border-t border-gray-200 space-y-0.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Đã sử dụng</span>
                    <span className="text-gray-900">{formatCurrency(campaign.budgetUsed)} VNĐ</span>
                  </div>
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div 
                      className="h-full transition-all"
                      style={{ 
                        width: `${budgetProgress}%`,
                        backgroundColor: '#006885'
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{budgetProgress.toFixed(1)}% đã sử dụng</p>
                </div>
              </div>
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Doanh thu dự kiến (VNĐ)</Label>
                <p className="text-sm text-gray-900">{campaign.expectedRevenue ? `${formatCurrency(campaign.expectedRevenue)} VNĐ` : '-'}</p>
              </div>
            </div>

            {/* Row 6: PIC + Approver */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Người phụ trách chính</Label>
                <p className="text-sm text-gray-900">{campaign.pic}</p>
                <p className="text-xs text-gray-600">{campaign.picEmail}</p>
                <p className="text-xs text-gray-600">{campaign.picPhone}</p>
              </div>
              <div className="space-y-0.5 p-2 border border-gray-200 rounded">
                <Label className="text-xs text-gray-700">Lãnh đạo phê duyệt</Label>
                <p className="text-sm text-gray-900">{campaign.approver}</p>
                <p className="text-xs text-gray-600">{campaign.approverEmail}</p>
              </div>
            </div>

            {/* Row 7: Thư mục đã tạo */}
            <div className="space-y-0.5 p-2 border border-gray-200 rounded">
              <Label className="text-xs text-gray-700">Thư mục tài liệu đã tạo</Label>
              <div className="space-y-1 mt-1">
                {campaign.folders.map((folder, folderIndex) => {
                  const isFolderExpanded = expandedFolders.has(folder.name);
                  return (
                    <div key={folderIndex} className="border border-gray-200 rounded bg-white">
                      {/* Folder header */}
                      <div 
                        className="flex items-center gap-2 p-1.5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFolder(folder.name)}
                      >
                        <button className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                          {isFolderExpanded ? (
                            <ChevronDown className="size-3 text-gray-600" />
                          ) : (
                            <ChevronRight className="size-3 text-gray-600" />
                          )}
                        </button>
                        <FolderOpen className="size-4 flex-shrink-0" style={{ color: '#006885' }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-900 truncate">{folder.name}</p>
                          <p className="text-xs text-gray-500">{folder.fileCount} file • {new Date(folder.createdDate).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                      
                      {/* Files list */}
                      {isFolderExpanded && folder.files && (
                        <div className="border-t border-gray-200 bg-gray-50/50">
                          {folder.files.map((file, fileIndex) => (
                            <div 
                              key={fileIndex} 
                              className="flex items-center gap-2 p-1.5 pl-8 hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => handleDownloadFile(file.name, file.type)}
                            >
                              <File className="size-3 flex-shrink-0 text-gray-400" />
                              <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-900 truncate">{file.name}</p>
                                  <p className="text-xs text-gray-500">{file.size} • {new Date(file.uploadDate).toLocaleDateString('vi-VN')}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Thông tin tạo */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Tạo bởi <span className="text-gray-700">{campaign.createdBy}</span> vào ngày {new Date(campaign.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tree View - Danh sách chiến dịch con */}
        <Card className="border border-gray-300">
          <CardHeader className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900">Danh sách chiến dịch con ({totalCampaigns})</h2>
              <Button
                size="sm"
                className="gap-2"
                style={{ backgroundColor: '#006885', color: 'white' }}
                onClick={() => setShowDialog(true)}
              >
                <Plus className="size-4" />
                Thêm chiến dịch con
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-white">
              {subCampaigns.map((node, index) => renderTreeNode(node, 0, index === subCampaigns.length - 1, []))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog - Thêm chiến dịch con */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-5xl max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 flex-shrink-0">
            <DialogTitle>Thêm chiến dịch con mới</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
            <div className="space-y-5">
              {/* Thông tin cơ bản */}
              <div className="space-y-3">
                <h3 className="text-sm text-gray-700 pb-2 border-b border-gray-200">Thông tin cơ bản</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm">Tên chiến dịch <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      placeholder="Nhập tên chiến dịch con"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="type" className="text-sm">Loại chiến dịch</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Chọn loại chiến dịch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="tvc">TVC</SelectItem>
                        <SelectItem value="pr_event">PR & Event</SelectItem>
                        <SelectItem value="ooh">OOH</SelectItem>
                        <SelectItem value="digital">Digital Marketing</SelectItem>
                        <SelectItem value="print">In ấn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="objective" className="text-sm">Mục tiêu chiến dịch</Label>
                  <Textarea
                    id="objective"
                    placeholder="Mô tả mục tiêu của chiến dịch con này"
                    rows={2}
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    className="resize-none text-sm"
                  />
                </div>
              </div>

              {/* Thời gian & Nguồn lực */}
              <div className="space-y-3">
                <h3 className="text-sm text-gray-700 pb-2 border-b border-gray-200">Thời gian & Nguồn lực</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="startDate" className="text-sm">Ngày bắt đầu <span className="text-red-500">*</span></Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="endDate" className="text-sm">Ngày kết thúc <span className="text-red-500">*</span></Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="pic" className="text-sm">Người phụ trách (PIC) <span className="text-red-500">*</span></Label>
                    <Input
                      id="pic"
                      placeholder="Họ và tên"
                      value={formData.pic}
                      onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="team" className="text-sm">Đội ngũ thực hiện</Label>
                    <Input
                      id="team"
                      placeholder="Tên team/phòng ban"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      className="h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Kênh & Thị trường */}
              <div className="space-y-3">
                <h3 className="text-sm text-gray-700 pb-2 border-b border-gray-200">Kênh & Thị trường</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="channel" className="text-sm">Kênh truyền thông</Label>
                    <Select
                      value={formData.channel}
                      onValueChange={(value) => setFormData({ ...formData, channel: value })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Chọn kênh truyền thông" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="TVC">TVC</SelectItem>
                        <SelectItem value="Radio">Radio</SelectItem>
                        <SelectItem value="PR">PR & Báo chí</SelectItem>
                        <SelectItem value="OOH">OOH (Billboard, Poster)</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">Thị trường</Label>
                    <div className="border border-gray-300 rounded-md p-2 max-h-[108px] overflow-y-auto bg-gray-50">
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {['Việt Nam', 'Nhật Bản', 'Hàn Quốc', 'Thái Lan', 'Singapore', 'Châu Âu', 'Châu Mỹ'].map((market) => (
                          <div key={market} className="flex items-center gap-1.5">
                            <Checkbox
                              id={`market-${market}`}
                              checked={formData.markets.includes(market)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({ ...formData, markets: [...formData.markets, market] });
                                } else {
                                  setFormData({ ...formData, markets: formData.markets.filter(m => m !== market) });
                                }
                              }}
                              className="h-3.5 w-3.5"
                            />
                            <Label htmlFor={`market-${market}`} className="text-xs cursor-pointer">
                              {market}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ngân sách & KPI */}
              <div className="space-y-3">
                <h3 className="text-sm text-gray-700 pb-2 border-b border-gray-200">Ngân sách & KPI</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="budget" className="text-sm">Ngân sách (VNĐ) <span className="text-red-500">*</span></Label>
                    <Input
                      id="budget"
                      placeholder="VD: 500,000,000"
                      value={formData.budget}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        setFormData({ ...formData, budget: formatted });
                      }}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="revenue" className="text-sm">Doanh thu kỳ vọng (VNĐ)</Label>
                    <Input
                      id="revenue"
                      placeholder="VD: 1,000,000,000"
                      value={formData.revenue}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        setFormData({ ...formData, revenue: formatted });
                      }}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="kpiReach" className="text-sm">KPI Reach (lượt tiếp cận)</Label>
                    <Input
                      id="kpiReach"
                      placeholder="VD: 1,000,000"
                      value={formData.kpiReach}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        setFormData({ ...formData, kpiReach: formatted });
                      }}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="kpiClick" className="text-sm">KPI Click (lượt click)</Label>
                    <Input
                      id="kpiClick"
                      placeholder="VD: 50,000"
                      value={formData.kpiClick}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        setFormData({ ...formData, kpiClick: formatted });
                      }}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <Label htmlFor="kpiConversion" className="text-sm">KPI Conversion (số lượng chuyển đổi)</Label>
                    <Input
                      id="kpiConversion"
                      placeholder="VD: 5,000"
                      value={formData.kpiConversion}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        setFormData({ ...formData, kpiConversion: formatted });
                      }}
                      className="h-9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-gray-200 px-6 py-3 flex-shrink-0 gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowDialog(false);
                // Reset form
                setFormData({
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
                });
              }}
              className="h-9"
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={() => {
                // Validate required fields
                if (!formData.name || !formData.startDate || !formData.endDate || !formData.pic || !formData.budget) {
                  alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
                  return;
                }
                
                // TODO: Save to backend or state
                console.log('New sub-campaign:', formData);
                alert('Đã thêm chiến dịch con thành công!');
                
                setShowDialog(false);
                // Reset form
                setFormData({
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
                });
              }}
              style={{ backgroundColor: '#006885', color: 'white' }}
              className="h-9"
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}