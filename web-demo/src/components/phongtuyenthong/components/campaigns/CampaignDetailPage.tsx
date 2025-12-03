import { useState } from 'react';
import {
  ArrowLeft,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Users,
  Clock,
  CheckCircle2,
  FileText,
  MessageSquare,
  History,
  Download,
  Upload,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Eye,
  ThumbsUp,
  Share2,
  MousePointerClick,
  BarChart3,
  PieChart,
  LineChart,
  Play,
  Pause,
  XCircle,
  Edit,
  MoreHorizontal,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  FileImage,
  Zap,
  TrendingDown,
  Activity,
  MapPin,
  Globe,
  Plane,
  Building,
  Filter,
  Plus,
  FileCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import { Textarea } from '../ui/textarea';
import ContentPlanningTab from './ContentPlanningTab';
import BudgetFinanceTab from './BudgetFinanceTab';
import AcceptanceTab from './AcceptanceTab';

interface Channel {
  id: string;
  name: string;
  type: 'Quảng cáo Facebook' | 'Quảng cáo TikTok' | 'Quảng cáo Google' | 'PR Báo chí' | 'Biển quảng cáo Website' | 'Biển quảng cáo Sân bay';
  status: 'Đúng tiến độ' | 'Có rủi ro' | 'Chậm tiến độ';
  vendor: string;
  owner: string;
  ownerAvatar: string;
  contract: {
    code: string;
    value: number;
    startDate: string;
    endDate: string;
    file: string;
    status: string;
  };
  budget: {
    planned: number;
    actual: number;
    percentage: number;
  };
  content: {
    planned: number;
    actual: number;
  };
  kpi: {
    impressions: { planned: number; actual: number };
    engagement: { planned: number; actual: number };
    ctr: { planned: number; actual: number };
    videoViews?: { planned: number; actual: number };
    conversions?: { planned: number; actual: number };
    reach?: { planned: number; actual: number };
  };
  reportLinks: string[];
  notes: string;
}

interface Content {
  id: string;
  channel: string;
  name: string;
  type: 'Hình ảnh' | 'Video' | 'Carousel' | 'Bài viết' | 'Biển quảng cáo';
  plannedDate: string;
  actualDate: string;
  status: 'Nháp' | 'Chờ duyệt' | 'Đã duyệt' | 'Đã đăng' | 'Đã hủy';
  vendor: string;
  kpi: {
    impressions: number;
    views: number;
    likes: number;
    shares: number;
    comments: number;
    ctr: number;
    cpc: number;
    cpm: number;
    reach: number;
  };
  postUrl: string;
  files: string[];
}

const mockChannels: Channel[] = [
  {
    id: 'CH-001',
    name: 'Quảng cáo Facebook',
    type: 'Quảng cáo Facebook',
    status: 'Đúng tiến độ',
    vendor: 'MediaCorp Việt Nam',
    owner: 'Nguyễn Thảo',
    ownerAvatar: 'NT',
    contract: {
      code: 'CT-2025-FB-012',
      value: 45000000,
      startDate: '10/02/2025',
      endDate: '18/03/2025',
      file: 'hop-dong-fb-2025.pdf',
      status: 'Đang hoạt động',
    },
    budget: {
      planned: 45000000,
      actual: 37200000,
      percentage: 82.7,
    },
    content: {
      planned: 15,
      actual: 12,
    },
    kpi: {
      impressions: { planned: 1500000, actual: 1280000 },
      engagement: { planned: 45000, actual: 41200 },
      ctr: { planned: 3.0, actual: 3.2 },
      conversions: { planned: 1200, actual: 980 },
      reach: { planned: 800000, actual: 720000 },
    },
    reportLinks: ['https://business.facebook.com/adsmanager/...'],
    notes: 'Hiệu suất tốt, CTR cao hơn kế hoạch. Cần tăng ngân sách tuần tới.',
  },
  {
    id: 'CH-002',
    name: 'Quảng cáo TikTok',
    type: 'Quảng cáo TikTok',
    status: 'Có rủi ro',
    vendor: 'MediaCorp Việt Nam',
    owner: 'Lê Minh',
    ownerAvatar: 'LM',
    contract: {
      code: 'CT-2025-TT-008',
      value: 35000000,
      startDate: '10/02/2025',
      endDate: '18/03/2025',
      file: 'hop-dong-tiktok-2025.pdf',
      status: 'Đang hoạt động',
    },
    budget: {
      planned: 35000000,
      actual: 18500000,
      percentage: 52.9,
    },
    content: {
      planned: 10,
      actual: 5,
    },
    kpi: {
      impressions: { planned: 2000000, actual: 850000 },
      engagement: { planned: 80000, actual: 32000 },
      ctr: { planned: 4.0, actual: 3.8 },
      videoViews: { planned: 1500000, actual: 620000 },
      reach: { planned: 1200000, actual: 480000 },
    },
    reportLinks: ['https://ads.tiktok.com/...'],
    notes: 'Nội dung video chưa đủ. Vendor đang sản xuất thêm 5 video.',
  },
  {
    id: 'CH-003',
    name: 'PR Báo chí',
    type: 'PR Báo chí',
    status: 'Đúng tiến độ',
    vendor: 'PR Plus Agency',
    owner: 'Trần Hương',
    ownerAvatar: 'TH',
    contract: {
      code: 'CT-2025-PR-015',
      value: 25000000,
      startDate: '10/02/2025',
      endDate: '18/03/2025',
      file: 'hop-dong-pr-2025.pdf',
      status: 'Đang hoạt động',
    },
    budget: {
      planned: 25000000,
      actual: 24800000,
      percentage: 99.2,
    },
    content: {
      planned: 8,
      actual: 8,
    },
    kpi: {
      impressions: { planned: 500000, actual: 520000 },
      engagement: { planned: 15000, actual: 16200 },
      ctr: { planned: 3.0, actual: 3.1 },
      reach: { planned: 350000, actual: 385000 },
    },
    reportLinks: ['Link bài VnExpress', 'Link bài Dân trí', 'Link bài Zing'],
    notes: 'Đã đăng đủ 8 bài. Độ phủ tốt hơn dự kiến.',
  },
];

const mockContent: Content[] = [
  {
    id: 'CNT-001',
    channel: 'Quảng cáo Facebook',
    name: 'Mùa hè Nhật Bản - Video giới thiệu 15s',
    type: 'Video',
    plannedDate: '12/02/2025',
    actualDate: '12/02/2025',
    status: 'Đã đăng',
    vendor: 'MediaCorp Việt Nam',
    kpi: {
      impressions: 185000,
      views: 142000,
      likes: 3200,
      shares: 580,
      comments: 245,
      ctr: 3.4,
      cpc: 2500,
      cpm: 85000,
      reach: 128000,
    },
    postUrl: 'https://facebook.com/vietnamairlines/posts/123456',
    files: ['video-mua-he-nhat-ban-15s.mp4', 'thumbnail-mua-he-nhat-ban.jpg'],
  },
  {
    id: 'CNT-002',
    channel: 'Quảng cáo Facebook',
    name: 'Mùa hè Nhật Bản - Carousel 5 ảnh điểm đến',
    type: 'Carousel',
    plannedDate: '15/02/2025',
    actualDate: '15/02/2025',
    status: 'Đã đăng',
    vendor: 'MediaCorp Việt Nam',
    kpi: {
      impressions: 125000,
      views: 98000,
      likes: 2100,
      shares: 320,
      comments: 165,
      ctr: 2.9,
      cpc: 3200,
      cpm: 92000,
      reach: 95000,
    },
    postUrl: 'https://facebook.com/vietnamairlines/posts/123457',
    files: ['carousel-tokyo.jpg', 'carousel-osaka.jpg', 'carousel-kyoto.jpg'],
  },
  {
    id: 'CNT-003',
    channel: 'Quảng cáo TikTok',
    name: 'TikTok Challenge - #BayDenNhatBanCungVNA',
    type: 'Video',
    plannedDate: '18/02/2025',
    actualDate: '18/02/2025',
    status: 'Đã đăng',
    vendor: 'MediaCorp Việt Nam',
    kpi: {
      impressions: 420000,
      views: 385000,
      likes: 12500,
      shares: 2100,
      comments: 980,
      ctr: 4.2,
      cpc: 1800,
      cpm: 75000,
      reach: 365000,
    },
    postUrl: 'https://tiktok.com/@vietnamairlines/video/7123456789',
    files: ['tiktok-challenge-60s.mp4'],
  },
  {
    id: 'CNT-004',
    channel: 'Quảng cáo TikTok',
    name: 'Hậu trường - Phi hành đoàn',
    type: 'Video',
    plannedDate: '22/02/2025',
    actualDate: '',
    status: 'Chờ duyệt',
    vendor: 'MediaCorp Việt Nam',
    kpi: {
      impressions: 0,
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      ctr: 0,
      cpc: 0,
      cpm: 0,
      reach: 0,
    },
    postUrl: '',
    files: ['bts-crew-draft.mp4'],
  },
  {
    id: 'CNT-005',
    channel: 'PR Báo chí',
    name: 'Bài PR VnExpress - Khuyến mãi hè Nhật Bản',
    type: 'Bài viết',
    plannedDate: '13/02/2025',
    actualDate: '13/02/2025',
    status: 'Đã đăng',
    vendor: 'PR Plus Agency',
    kpi: {
      impressions: 85000,
      views: 72000,
      likes: 450,
      shares: 120,
      comments: 85,
      ctr: 2.8,
      cpc: 0,
      cpm: 0,
      reach: 68000,
    },
    postUrl: 'https://vnexpress.net/vietnam-airlines-khuyen-mai-he-nhat-ban',
    files: ['pr-vnexpress.pdf'],
  },
];

const kpiTrendData = [
  { date: '10/02', impressions: 45000, engagement: 1200, ctr: 2.7, conversions: 85 },
  { date: '12/02', impressions: 125000, engagement: 3800, ctr: 3.0, conversions: 245 },
  { date: '14/02', impressions: 185000, engagement: 5600, ctr: 3.0, conversions: 380 },
  { date: '16/02', impressions: 210000, engagement: 6900, ctr: 3.3, conversions: 450 },
  { date: '18/02', impressions: 420000, engagement: 14200, ctr: 3.4, conversions: 890 },
  { date: '20/02', impressions: 380000, engagement: 12100, ctr: 3.2, conversions: 720 },
  { date: '22/02', impressions: 340000, engagement: 10200, ctr: 3.0, conversions: 640 },
];

const channelComparisonData = [
  { channel: 'Facebook', impressions: 1280000, cost: 37200000, engagement: 41200, conversions: 980 },
  { channel: 'TikTok', impressions: 850000, cost: 18500000, engagement: 32000, conversions: 420 },
  { channel: 'PR', impressions: 520000, cost: 24800000, engagement: 16200, conversions: 180 },
];

const costMetricsData = [
  { metric: 'CPM', Facebook: 29000, TikTok: 21700, PR: 47700 },
  { metric: 'CPC', Facebook: 903, TikTok: 578, PR: 1531 },
  { metric: 'CPE', Facebook: 902, TikTok: 578, PR: 1531 },
];

const budgetPacingData = [
  { week: 'T1', planned: 15, actual: 12 },
  { week: 'T2', planned: 30, actual: 28 },
  { week: 'T3', planned: 45, actual: 48 },
  { week: 'T4', planned: 60, actual: 65 },
  { week: 'T5', planned: 75, actual: 82 },
  { week: 'T6', planned: 90, actual: 82 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

interface CampaignDetailPageProps {
  onBack: () => void;
  subCampaignId?: string;
}

export default function CampaignDetailPage({ onBack, subCampaignId }: CampaignDetailPageProps) {
  const [expandedChannels, setExpandedChannels] = useState<string[]>(['CH-001']);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Determine campaign name based on subCampaignId
  const getCampaignName = () => {
    if (subCampaignId === '1-1') return 'Flash Sale Vé Tết - Facebook';
    if (subCampaignId === '1-2') return 'Khuyến mãi Social Media';
    if (subCampaignId === '1-3') return 'Google Ads - Khuyến mãi Tết';
    if (subCampaignId === '1-4') return 'PR & Media - Vé Tết';
    return 'Chiến dịch con';
  };

  const campaignName = getCampaignName();
  const showContentPlanning = campaignName === 'Flash Sale Vé Tết - Facebook';

  const toggleChannel = (channelId: string) => {
    setExpandedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B`;
    }
    return `${(amount / 1000000).toFixed(0)}M`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const getStatusBadge = (status: string) => {
    const configs: any = {
      'Đúng tiến độ': { bg: '#dcfce7', color: '#16a34a', icon: CheckCircle2 },
      'Có rủi ro': { bg: '#fed7aa', color: '#ea580c', icon: AlertTriangle },
      'Chậm tiến độ': { bg: '#fecaca', color: '#dc2626', icon: XCircle },
      'Đã đăng': { bg: '#dbeafe', color: '#2563eb', icon: CheckCircle2 },
      'Chờ duyệt': { bg: '#fed7aa', color: '#ea580c', icon: Clock },
      'Nháp': { bg: '#f3f4f6', color: '#4b5563', icon: FileText },
      'Đã duyệt': { bg: '#dcfce7', color: '#16a34a', icon: CheckCircle2 },
      'Đã hủy': { bg: '#fecaca', color: '#dc2626', icon: XCircle },
      'Đang hoạt động': { bg: '#dcfce7', color: '#16a34a', icon: Play },
    };
    const config = configs[status] || configs['Nháp'];
    const Icon = config.icon;
    
    return (
      <Badge className="gap-1 border-0" style={{ backgroundColor: config.bg, color: config.color }}>
        <Icon className="size-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-[1800px] mx-auto px-6 py-3">
          <Button variant="ghost" size="sm" className="gap-2" onClick={onBack}>
            <ArrowLeft className="size-4" />
            Quay lại danh sách kế hoạch
          </Button>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          {/* Campaign Title */}
          <div className="mb-6 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-12 rounded-xl backdrop-blur-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 94, 120, 0.1)' }}>
                      <Target className="size-7" style={{ color: '#005e78' }} />
                    </div>
                    <div>
                      <div className="text-xs mb-1 uppercase tracking-wide" style={{ color: 'rgba(0, 94, 120, 0.7)' }}>Chiến dịch con</div>
                      <h1 className="text-3xl" style={{ color: '#005e78' }}>{campaignName}</h1>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed max-w-3xl ml-15" style={{ color: 'rgba(0, 94, 120, 0.85)' }}>
                    {campaignName === 'Flash Sale Vé Tết - Facebook' 
                      ? 'Chương trình Flash Sale vé máy bay Tết Bính Ngọ 2026 trên Facebook, giảm giá 30-50% cho các tuyến nội địa, targeting khách hàng 25-45 tuổi có nhu cầu đặt vé về quê hoặc du lịch Tết'
                      : 'Kế hoạch khuyến mãi vé máy bay qua các kênh truyền thông số, tập trung vào nhóm khách hàng trẻ 20-35 tuổi'
                    }
                  </p>
                  <div className="flex items-center gap-2 mt-3 ml-15">
                    <span className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>Kênh truyền thông:</span>
                    {campaignName === 'Flash Sale Vé Tết - Facebook' ? (
                      <>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: '#1877f2', color: '#1877f2' }}>
                          Facebook News Feed
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: '#1877f2', color: '#1877f2' }}>
                          Facebook Stories
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: '#1877f2', color: '#1877f2' }}>
                          Instagram Feed
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: '#1877f2', color: '#1877f2' }}>
                          Audience Network
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: 'rgba(0, 94, 120, 0.3)', color: '#005e78' }}>
                          Social Media
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: 'rgba(0, 94, 120, 0.3)', color: '#005e78' }}>
                          TVC
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: 'rgba(0, 94, 120, 0.3)', color: '#005e78' }}>
                          OOH
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0.5" style={{ borderColor: 'rgba(0, 94, 120, 0.3)', color: '#005e78' }}>
                          PR & Event
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="backdrop-blur-sm gap-1.5 px-3 py-1.5" style={{ backgroundColor: 'rgba(0, 94, 120, 0.1)', color: '#005e78', borderColor: 'rgba(0, 94, 120, 0.2)' }}>
                    <CheckCircle2 className="size-4" />
                    Đang hoạt động
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-4 pt-4 border-t" style={{ borderColor: 'rgba(0, 94, 120, 0.2)' }}>
                <div className="flex items-center gap-2">
                  <FileText className="size-4" style={{ color: 'rgba(0, 94, 120, 0.6)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>Mã chiến dịch</div>
                    <div className="text-sm" style={{ color: '#005e78' }}>
                      {campaignName === 'Flash Sale Vé Tết - Facebook' ? 'CDTP20260001-1' : 'KH-2025-012'}
                    </div>
                  </div>
                </div>
                <div className="h-8 w-px" style={{ backgroundColor: 'rgba(0, 94, 120, 0.2)' }}></div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" style={{ color: 'rgba(0, 94, 120, 0.6)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>Thời gian</div>
                    <div className="text-sm" style={{ color: '#005e78' }}>
                      {campaignName === 'Flash Sale Vé Tết - Facebook' ? '01/01 - 15/02/2026' : '10/02 - 18/03/2025'}
                    </div>
                  </div>
                </div>
                <div className="h-8 w-px" style={{ backgroundColor: 'rgba(0, 94, 120, 0.2)' }}></div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" style={{ color: 'rgba(0, 94, 120, 0.6)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>Tiến độ</div>
                    <div className="text-sm" style={{ color: '#005e78' }}>15/39 ngày (38%)</div>
                  </div>
                </div>
                <div className="h-8 w-px" style={{ backgroundColor: 'rgba(0, 94, 120, 0.2)' }}></div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4" style={{ color: 'rgba(0, 94, 120, 0.6)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>Ngân sách</div>
                    <div className="text-sm" style={{ color: '#005e78' }}>120M VNĐ</div>
                  </div>
                </div>
                <div className="h-8 w-px" style={{ backgroundColor: 'rgba(0, 94, 120, 0.2)' }}></div>
                <div className="flex items-center gap-2">
                  <Plane className="size-4" style={{ color: 'rgba(0, 94, 120, 0.6)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>
                      {campaignName === 'Flash Sale Vé Tết - Facebook' ? 'Tuyến bay chính' : 'Tuyến bay'}
                    </div>
                    <div className="text-sm" style={{ color: '#005e78' }}>
                      {campaignName === 'Flash Sale Vé Tết - Facebook' ? 'Nội địa VN' : 'HAN/SGN-NRT'}
                    </div>
                  </div>
                </div>
                <div className="h-8 w-px" style={{ backgroundColor: 'rgba(0, 94, 120, 0.2)' }}></div>
                <div className="flex items-center gap-2">
                  <Globe className="size-4" style={{ color: 'rgba(0, 94, 120, 0.6)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>Thị trường</div>
                    <div className="text-sm" style={{ color: '#005e78' }}>
                      {campaignName === 'Flash Sale Vé Tết - Facebook' ? 'Việt Nam' : 'Nhật Bản'}
                    </div>
                  </div>
                </div>
                <div className="h-8 w-px" style={{ backgroundColor: 'rgba(0, 94, 120, 0.2)' }}></div>
                <div className="flex items-center gap-2">
                  <Users className="size-4" style={{ color: 'rgba(0, 94, 120, 0.6)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(0, 94, 120, 0.6)' }}>Người phụ trách</div>
                    <div className="text-sm" style={{ color: '#005e78' }}>
                      {campaignName === 'Flash Sale Vé Tết - Facebook' ? 'Lê Văn C' : 'Nguyễn Thảo'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card className="border-2" style={{ borderColor: 'rgba(0, 104, 133, 0.2)' }}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 104, 133, 0.1)' }}>
                    <Eye className="size-6" style={{ color: '#006885' }} />
                  </div>
                  <Badge style={{ backgroundColor: 'rgba(0, 104, 133, 0.1)', color: '#006885', border: '1px solid rgba(0, 104, 133, 0.2)' }}>66%</Badge>
                </div>
                <div className="text-3xl mb-1" style={{ color: '#006885' }}>
                  {campaignName === 'Flash Sale Vé Tết - Facebook' ? '5.2M' : '2.65M'}
                </div>
                <div className="text-xs text-gray-600">Lượt hiển thị</div>
                <div className="text-xs text-gray-500 mt-1">
                  KPI: {campaignName === 'Flash Sale Vé Tết - Facebook' ? '8M' : '4M'}
                </div>
                <Progress value={campaignName === 'Flash Sale Vé Tết - Facebook' ? 65 : 66} className="h-1.5 mt-2" />
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    <ThumbsUp className="size-6" style={{ color: '#10b981' }} />
                  </div>
                  <Badge style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>64%</Badge>
                </div>
                <div className="text-3xl mb-1" style={{ color: '#10b981' }}>89.4K</div>
                <div className="text-xs text-gray-600">Tương tác</div>
                <div className="text-xs text-gray-500 mt-1">KPI: 140K</div>
                <Progress value={64} className="h-1.5 mt-2" />
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: 'rgba(0, 104, 133, 0.2)' }}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 104, 133, 0.1)' }}>
                    <MousePointerClick className="size-6" style={{ color: '#006885' }} />
                  </div>
                  <Badge style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }} className="gap-1">
                    <TrendingUp className="size-3" />
                    +6.7%
                  </Badge>
                </div>
                <div className="text-3xl mb-1" style={{ color: '#006885' }}>3.2%</div>
                <div className="text-xs text-gray-600">Tỷ lệ nhấp chuột</div>
                <div className="text-xs text-gray-500 mt-1">KPI: 3.0%</div>
                <Progress value={106.7} className="h-1.5 mt-2" />
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-12 rounded-xl border border-gray-200 flex items-center justify-center">
                    <DollarSign className="size-6 text-gray-600" />
                  </div>
                  <Badge className="bg-gray-100 text-gray-700 border border-gray-200">82%</Badge>
                </div>
                <div className="text-3xl text-gray-900 mb-1">
                  {campaignName === 'Flash Sale Vé Tết - Facebook' ? '500M' : '98.5M'}
                </div>
                <div className="text-xs text-gray-600">Ngân sách</div>
                <div className="text-xs text-gray-500 mt-1">
                  KH: {campaignName === 'Flash Sale Vé Tết - Facebook' ? '800M' : '120M'}
                </div>
                <Progress value={campaignName === 'Flash Sale Vé Tết - Facebook' ? 62.5 : 82} className="h-1.5 mt-2" />
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="size-12 rounded-xl border border-gray-200 flex items-center justify-center">
                    <Zap className="size-6 text-gray-600" />
                  </div>
                  <Badge className="bg-gray-100 text-gray-700 border border-gray-200">53%</Badge>
                </div>
                <div className="text-3xl text-gray-900 mb-1">1,580</div>
                <div className="text-xs text-gray-600">Chuyển đổi</div>
                <div className="text-xs text-gray-500 mt-1">KPI: 3K</div>
                <Progress value={53} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border-2 p-1 h-auto" style={{ borderColor: 'rgba(0, 94, 120, 0.2)' }}>
            <TabsTrigger 
              value="overview" 
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <Target className="size-4" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger 
              value="channels"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <Share2 className="size-4" />
              Kênh truyền thông
            </TabsTrigger>
            {showContentPlanning && (
              <TabsTrigger 
                value="content-planning"
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
              >
                <Calendar className="size-4" />
                Kế hoạch nội dung
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="budget-finance"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <DollarSign className="size-4" />
              Ngân sách & Tài chính
            </TabsTrigger>
            <TabsTrigger 
              value="acceptance"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <FileCheck className="size-4" />
              Nghiệm thu & Vendor
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <BarChart3 className="size-4" />
              Báo cáo & KPI
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            {/* Risk & Alert Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cảnh báo & Rủi ro */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="size-5 text-orange-600" />
                    Cảnh báo & Rủi ro
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="space-y-2">
                    <div 
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setActiveTab('channels')}
                    >
                      <AlertTriangle className="size-5 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-gray-900 mb-0.5">Kênh TikTok có rủi ro</div>
                        <div className="text-sm text-gray-600">
                          Kênh TikTok đang thiếu nội dung nghiêm trọng (5/10 bài). Chỉ đạt 52.9% ngân sách và 42.5% lượt hiển thị so với KPI.
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab('channels');
                      }}>
                        Xem chi tiết
                      </Button>
                    </div>

                    <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                      <Clock className="size-5 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-gray-900 mb-0.5">Cảnh báo tiến độ ngân sách</div>
                        <div className="text-sm text-gray-600">
                          Ngân sách đang chi tiêu nhanh hơn dự kiến 5%. Nếu duy trì tốc độ này sẽ hết ngân sách trước 7 ngày.
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Điều chỉnh</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bên liên quan */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Bên liên quan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">NGƯỜI PHỤ TRÁCH</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="size-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#005e78' }}>
                        NT
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">Nguyễn Thảo</div>
                        <div className="text-xs text-gray-600">Quản lý Kế hoạch</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">TRƯỞNG KÊNH</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50">
                        <div className="size-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: '#005e78' }}>
                          LM
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">Lê Minh</div>
                          <div className="text-xs text-gray-600">Trưởng nhóm Mạng xã hội</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50">
                        <div className="size-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: '#005e78' }}>
                          TH
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">Trần Hương</div>
                          <div className="text-xs text-gray-600">Trưởng nhóm PR</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">NHÀ CUNG CẤP</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50">
                        <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                          <Building className="size-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">MediaCorp Việt Nam</div>
                          <div className="text-xs text-gray-600">Đại lý chính</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50">
                        <div className="size-8 rounded-lg border border-gray-200 flex items-center justify-center">
                          <Building className="size-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">PR Plus Agency</div>
                          <div className="text-xs text-gray-600">Đối tác PR</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>



            {/* Timeline & Milestones */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tiến độ & Mốc thời gian</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-9 rounded-full border border-gray-200 flex items-center justify-center">
                        <CheckCircle2 className="size-4 text-gray-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-200 my-1.5"></div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="text-sm text-gray-900">Khởi động kế hoạch</div>
                        <div className="text-sm text-gray-500">10/02/2025</div>
                      </div>
                      <div className="text-sm text-gray-600">Kế hoạch chính thức khởi động. Tất cả kênh bắt đầu chạy.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-9 rounded-full border border-gray-200 flex items-center justify-center">
                        <Activity className="size-4 text-gray-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-200 my-1.5"></div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="text-sm text-gray-900">Đánh giá giữa kỳ</div>
                        <div className="text-sm text-gray-500">25/02/2025</div>
                      </div>
                      <div className="text-sm text-gray-600">Đánh giá giữa kỳ, điều chỉnh chiến lược nếu cần.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Calendar className="size-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="text-sm text-gray-900">Kết thúc & Báo cáo</div>
                        <div className="text-sm text-gray-500">18/03/2025</div>
                      </div>
                      <div className="text-sm text-gray-600">Kết thúc kế hoạch, tổng hợp báo cáo cuối cùng.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: CHANNELS */}
          <TabsContent value="channels" className="space-y-3">
            {mockChannels.map((channel) => (
              <Card key={channel.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors py-3 px-4"
                  onClick={() => toggleChannel(channel.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <Target className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{channel.name}</CardTitle>
                          {getStatusBadge(channel.status)}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="size-3" />
                            {channel.vendor}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="size-3" />
                            {formatCurrency(channel.budget.actual)} / {formatCurrency(channel.budget.planned)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FileText className="size-3" />
                            {channel.content.actual}/{channel.content.planned} bài
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Hiệu suất</div>
                        <div className="text-base text-gray-900">
                          {((channel.kpi.impressions.actual / channel.kpi.impressions.planned) * 100).toFixed(0)}%
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedChannels.includes(channel.id) ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {expandedChannels.includes(channel.id) && (
                  <CardContent className="pt-0 pb-4 px-4 space-y-4 bg-gray-50">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 mb-0.5">LƯỢT HIỂN THỊ</div>
                        <div className="text-lg text-gray-900 mb-1">{formatNumber(channel.kpi.impressions.actual)}</div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-xs text-gray-600">KPI: {formatNumber(channel.kpi.impressions.planned)}</div>
                          <Badge variant="outline" className="text-xs h-5 px-1.5">
                            {((channel.kpi.impressions.actual / channel.kpi.impressions.planned) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={(channel.kpi.impressions.actual / channel.kpi.impressions.planned) * 100} className="h-1" />
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 mb-0.5">TƯƠNG TÁC</div>
                        <div className="text-lg text-gray-900 mb-1">{formatNumber(channel.kpi.engagement.actual)}</div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-xs text-gray-600">KPI: {formatNumber(channel.kpi.engagement.planned)}</div>
                          <Badge variant="outline" className="text-xs h-5 px-1.5">
                            {((channel.kpi.engagement.actual / channel.kpi.engagement.planned) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={(channel.kpi.engagement.actual / channel.kpi.engagement.planned) * 100} className="h-1" />
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 mb-0.5">TỶ LỆ NHẤP CHUỘT</div>
                        <div className="text-lg text-gray-900 mb-1">{channel.kpi.ctr.actual.toFixed(1)}%</div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-xs text-gray-600">KPI: {channel.kpi.ctr.planned.toFixed(1)}%</div>
                          <Badge variant="outline" className="text-xs h-5 px-1.5 gap-0.5">
                            {channel.kpi.ctr.actual >= channel.kpi.ctr.planned ? (
                              <TrendingUp className="size-3 text-green-600" />
                            ) : (
                              <TrendingDown className="size-3 text-red-600" />
                            )}
                            {((channel.kpi.ctr.actual / channel.kpi.ctr.planned) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress value={(channel.kpi.ctr.actual / channel.kpi.ctr.planned) * 100} className="h-1" />
                      </div>

                      {channel.kpi.reach && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-0.5">ĐỘ PHỦ</div>
                          <div className="text-lg text-gray-900 mb-1">{formatNumber(channel.kpi.reach.actual)}</div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="text-xs text-gray-600">KPI: {formatNumber(channel.kpi.reach.planned)}</div>
                            <Badge variant="outline" className="text-xs h-5 px-1.5">
                              {((channel.kpi.reach.actual / channel.kpi.reach.planned) * 100).toFixed(0)}%
                            </Badge>
                          </div>
                          <Progress value={(channel.kpi.reach.actual / channel.kpi.reach.planned) * 100} className="h-1" />
                        </div>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Contract */}
                      <Card className="border-gray-200">
                        <CardHeader className="py-2.5 px-3">
                          <CardTitle className="text-sm">Hợp đồng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 py-2.5 px-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Mã HĐ:</span>
                            <span className="text-gray-900">{channel.contract.code}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Giá trị:</span>
                            <span className="text-gray-900">{formatCurrency(channel.contract.value)} VNĐ</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Thời hạn:</span>
                            <span className="text-gray-900 text-right">{channel.contract.startDate} - {channel.contract.endDate}</span>
                          </div>
                          <div className="flex justify-between text-xs items-center">
                            <span className="text-gray-600">Trạng thái:</span>
                            {getStatusBadge(channel.contract.status)}
                          </div>
                          <Button variant="outline" size="sm" className="w-full gap-2 mt-1 h-7 text-xs">
                            <FileText className="size-3" />
                            Xem file HĐ
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Budget */}
                      <Card className="border-gray-200">
                        <CardHeader className="py-2.5 px-3">
                          <CardTitle className="text-sm">Ngân sách</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 py-2.5 px-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Kế hoạch:</span>
                            <span className="text-gray-900">{formatCurrency(channel.budget.planned)} VNĐ</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Thực tế:</span>
                            <span className="text-gray-900">{formatCurrency(channel.budget.actual)} VNĐ</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Còn lại:</span>
                            <span className="text-gray-900">{formatCurrency(channel.budget.planned - channel.budget.actual)} VNĐ</span>
                          </div>
                          <Progress value={channel.budget.percentage} className="h-1.5 mt-1" />
                          <div className="text-xs text-gray-600 text-center">{channel.budget.percentage.toFixed(1)}% đã sử dụng</div>
                        </CardContent>
                      </Card>

                      {/* Team */}
                      <Card className="border-gray-200">
                        <CardHeader className="py-2.5 px-3">
                          <CardTitle className="text-sm">Nhóm thực hiện</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5 py-2.5 px-3">
                          <div>
                            <div className="text-xs text-gray-500 mb-1.5">Trưởng kênh</div>
                            <div className="flex items-center gap-2">
                              <div className="size-7 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#005e78' }}>
                                {channel.ownerAvatar}
                              </div>
                              <div className="text-xs text-gray-900">{channel.owner}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1.5">Nhà cung cấp</div>
                            <div className="flex items-center gap-2">
                              <div className="size-7 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Building className="size-3.5 text-gray-600" />
                              </div>
                              <div className="text-xs text-gray-900">{channel.vendor}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Tiến độ nội dung</div>
                            <div className="text-xs text-gray-900">{channel.content.actual} / {channel.content.planned} bài đã chạy</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Notes */}
                    <Card className="border-gray-200">
                      <CardHeader className="py-2.5 px-3">
                        <CardTitle className="text-sm">Ghi chú nội bộ</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2.5 px-3">
                        <div className="border border-gray-200 rounded-lg p-2 text-xs text-gray-900 mb-2">
                          {channel.notes}
                        </div>
                        <Button variant="outline" size="sm" className="w-full gap-2 h-7 text-xs">
                          <Edit className="size-3" />
                          Chỉnh sửa ghi chú
                        </Button>
                      </CardContent>
                    </Card>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* TAB 3.5: CONTENT PLANNING */}
          {showContentPlanning && (
            <TabsContent value="content-planning" className="space-y-6">
              <ContentPlanningTab campaignName={campaignName} />
            </TabsContent>
          )}

          {/* TAB 3.6: BUDGET & FINANCE */}
          <TabsContent value="budget-finance" className="space-y-6">
            <BudgetFinanceTab campaignName={campaignName} />
          </TabsContent>

          {/* TAB 3.7: ACCEPTANCE */}
          <TabsContent value="acceptance" className="space-y-6">
            <AcceptanceTab campaignName={campaignName} />
          </TabsContent>

          {/* TAB 4: ANALYTICS */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Progress Tracking Section */}
            <Card className="border-2" style={{ borderColor: '#006885' }}>
              <CardHeader className="pb-3 border-b border-gray-200">
                <CardTitle className="flex items-center gap-2" style={{ color: '#006885' }}>
                  <Activity className="size-5" />
                  Tiến độ thực tế (% Completion Tracking)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Overall Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="size-4" style={{ color: '#006885' }} />
                      <span className="text-sm">Tiến độ tổng thể</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#006885' }}>65%</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: '65%',
                        background: 'linear-gradient(90deg, #006885 0%, #00a3cc 100%)'
                      }}
                    />
                  </div>
                </div>

                {/* Detailed Progress Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Số lượng chạy thực tế */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Play className="size-4" style={{ color: '#006885' }} />
                        <span className="text-sm">Số lượng chạy thực tế / Kế hoạch</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#006885' }}>6 / 8</span>
                    </div>
                    <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                        style={{ width: '75%', backgroundColor: '#006885' }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">75% hoàn thành</div>
                  </div>

                  {/* KPI thực tế */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="size-4" style={{ color: '#10b981' }} />
                        <span className="text-sm">KPI thực tế / KPI kế hoạch</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#10b981' }}>850K / 1M</span>
                    </div>
                    <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                        style={{ width: '85%', backgroundColor: '#10b981' }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">85% đạt mục tiêu</div>
                  </div>

                  {/* Deliverable content hoàn thành */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4" style={{ color: '#006885' }} />
                        <span className="text-sm">Deliverable content hoàn thành</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#006885' }}>6 / 8</span>
                    </div>
                    <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                        style={{ width: '75%', backgroundColor: '#006885' }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">6 nội dung đã xuất bản, 2 đang thực hiện</div>
                  </div>

                  {/* Slot đã nghiệm thu */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="size-4" style={{ color: '#006885' }} />
                        <span className="text-sm">Slot đã nghiệm thu / Tổng slot</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#006885' }}>3 / 4</span>
                    </div>
                    <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                        style={{ width: '75%', backgroundColor: '#006885' }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">1 slot đang chờ nghiệm thu</div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ color: '#006885' }}>65%</div>
                    <div className="text-xs text-gray-600">Tiến độ chung</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ color: '#006885' }}>75%</div>
                    <div className="text-xs text-gray-600">Số lượng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ color: '#10b981' }}>85%</div>
                    <div className="text-xs text-gray-600">KPI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1" style={{ color: '#006885' }}>75%</div>
                    <div className="text-xs text-gray-600">Slot</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng KPI theo thời gian</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={kpiTrendData}>
                    <defs>
                      <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#006885" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#006885" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="impressions" stroke="#006885" fillOpacity={1} fill="url(#colorImpressions)" name="Lượt hiển thị" />
                    <Area type="monotone" dataKey="engagement" stroke="#10b981" fillOpacity={1} fill="url(#colorEngagement)" name="Tương tác" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Channel Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu suất theo kênh</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={channelComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="impressions" fill="#006885" name="Lượt hiển thị" />
                      <Bar dataKey="engagement" fill="#10b981" name="Tương tác" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tiến độ ngân sách</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={budgetPacingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="planned" stroke="#94a3b8" strokeDasharray="5 5" name="Kế hoạch (%)" />
                      <Line type="monotone" dataKey="actual" stroke="#006885" strokeWidth={2} name="Thực tế (%)" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Cost Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>So sánh CPM - CPC - CPE theo kênh</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={costMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Facebook" fill="#006885" />
                    <Bar dataKey="TikTok" fill="#64748b" />
                    <Bar dataKey="PR" fill="#10b981" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Conversions & ROI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chuyển đổi theo kênh</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={channelComparisonData}
                        dataKey="conversions"
                        nameKey="channel"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {channelComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phễu chuyển đổi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Lượt hiển thị</span>
                        <span className="text-gray-900">2,650,000</span>
                      </div>
                      <Progress value={100} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Lượt nhấp</span>
                        <span className="text-gray-900">84,800 (3.2%)</span>
                      </div>
                      <Progress value={80} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Truy cập trang đích</span>
                        <span className="text-gray-900">67,840 (80%)</span>
                      </div>
                      <Progress value={64} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Chuyển đổi</span>
                        <span className="text-gray-900">1,580 (2.3%)</span>
                      </div>
                      <Progress value={15} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
