import { ArrowLeft, Calendar, DollarSign, Clock, MessageSquare, CheckCircle, XCircle, AlertCircle, FileText, TrendingUp, Eye, Heart, MessageCircle, Users, ShoppingCart } from 'lucide-react';
// import { Button } from './ui/button'
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';

interface OrderDetailProps {
  orderId: string | null;
  onBack: () => void;
  // onEdit: (orderId: string) => void;
}

export default function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  // const [comment, setComment] = useState('');

  // Mock data - in real app, fetch based on orderId
  const getOrderData = (id: string | null) => {
    if (id === 'REQ-2025-007') {
      return {
        id: 'REQ-2025-007',
        name: 'Chương trình khuyến mãi mùa hè',
        department: 'Marketing',
        status: 'rejected',
        statusText: 'Đã từ chối',
        priority: 'medium',
        createdDate: '12/01/2025',
        createdBy: 'Phạm Thị D',
        startDate: '01/06/2025',
        endDate: '30/06/2025',
        description: 'Chương trình khuyến mãi mùa hè với các ưu đãi đặc biệt cho các tuyến bay trong nước và quốc tế, tập trung vào phân khúc khách hàng trẻ tuổi và gia đình đi du lịch hè.',
        budget: 250000000,
        rejectionReason: 'Ngân sách được yêu cầu vượt quá 30% so với ngân sách được phân bổ cho Q2/2025. Đề nghị điều chỉnh lại ngân sách hoặc thu hẹp phạm vi chiến dịch để phù hợp với khả năng tài chính hiện tại. Ngoài ra, thời điểm triển khai trùng với chiến dịch khuyến mãi chính của đối thủ cạnh tranh.',
        budgetByChannel: [],
        approvedChannels: [],
        targetMarkets: [],
        communicationGoals: 'Tăng doanh số vé máy bay trong mùa hè, đặc biệt là các tuyến bay nghỉ dưỡng biển và các điểm đến du lịch phổ biến. Tạo sự chú ý với các ưu đãi hấp dẫn dành cho nhóm khách hàng trẻ và gia đình.',
        kpis: {},
        attachedFiles: [
          { name: 'summer-campaign-proposal.pdf', size: 2890 },
          { name: 'market-research-summer.xlsx', size: 1560 },
        ],
      };
    }
    
    if (id === 'REQ-2025-002') {
      return {
        id: 'REQ-2025-002',
        name: 'Quảng bá đường bay mới HAN-SYD',
        department: 'Sales',
        status: 'approved',
        statusText: 'Đã duyệt',
        priority: 'medium',
        createdDate: '18/01/2025',
        createdBy: 'Lê Thị C',
        startDate: '01/03/2025',
        endDate: '31/03/2025',
        description: 'Chiến dịch quảng bá đường bay thẳng mới Hà Nội - Sydney, tập trung vào thị trường khách du lịch và doanh nhân, nhấn mạnh sự tiện lợi và tiết kiệm thời gian với đường bay trực tiếp.',
        budget: 1800000000,
        budgetByChannel: [
          { channel: 'Facebook', amount: 500000000, percentage: 28 },
          { channel: 'Google Ads', amount: 450000000, percentage: 25 },
          { channel: 'TikTok', amount: 350000000, percentage: 19 },
          { channel: 'YouTube', amount: 300000000, percentage: 17 },
          { channel: 'OOH', amount: 200000000, percentage: 11 },
        ],
        approvedChannels: ['Facebook', 'Instagram', 'Google Ads', 'YouTube', 'TikTok', 'OOH'],
        targetMarkets: ['Việt Nam', 'Úc', 'Singapore'],
        communicationGoals: 'Tăng nhận diện về đường bay mới Hà Nội - Sydney, thu hút khách hàng đặt vé trong 3 tháng đầu khai trương với các ưu đãi đặc biệt. Xây dựng hình ảnh Vietnam Airlines là hãng hàng không tiên phong mở rộng mạng đường bay quốc tế.',
        kpis: {
          impression: { target: 30000000, description: 'Lượt hiển thị quảng cáo' },
          engagement: { target: 1500000, description: 'Lượt tương tác (like, comment, share)' },
          conversation: { target: 300000, description: 'Lượt trò chuyện/tin nhắn' },
          traffic: { target: 600000, description: 'Lượt truy cập website' },
          revenue: { target: 8000000000, description: 'Doanh thu từ chiến dịch' },
        },
        attachedFiles: [
          { name: 'route-launch-brief.pdf', size: 3240 },
          { name: 'creative-assets-HAN-SYD.zip', size: 15680 },
          { name: 'budget-allocation.xlsx', size: 1890 },
        ],
      };
    }
    
    // Default data for other orders
    return {
      id: orderId || 'REQ-2025-001',
      name: 'Chiến dịch Tết Nguyên Đán 2025',
      department: 'Marketing',
      status: 'under_review',
      statusText: 'Đang xem xét',
      priority: 'high',
      createdDate: '15/01/2025',
      createdBy: 'Nguyễn Văn A',
      startDate: '01/02/2025',
      endDate: '15/02/2025',
      description: 'Chiến dịch truyền thông toàn diện nhân dịp Tết Nguyên Đán 2025, tập trung vào message "sum họp gia đình" và những trải nghiệm bay đẳng cấp cùng Vietnam Airlines.',
      budget: 2500000000,
      budgetByChannel: [
        { channel: 'Facebook', amount: 800000000, percentage: 32 },
        { channel: 'Google Ads', amount: 600000000, percentage: 24 },
        { channel: 'TVC', amount: 500000000, percentage: 20 },
        { channel: 'OOH', amount: 400000000, percentage: 16 },
        { channel: 'KOL/Influencer', amount: 200000000, percentage: 8 },
      ],
      approvedChannels: ['Facebook', 'Instagram', 'Google Ads', 'YouTube', 'TVC', 'OOH', 'PR'],
      targetMarkets: ['Việt Nam', 'Hàn Quốc', 'Nhật Bản', 'Thái Lan', 'Singapore'],
      communicationGoals: 'Tăng nhận diện thương hiệu Vietnam Airlines trong dịp Tết, tạo kết nối cảm xúc với khách hàng qua thông điệp sum họp gia đình. Khuyến khích đặt vé sớm cho các chuyến bay Tết với các ưu đãi đặc biệt.',
      kpis: {
        impression: { target: 50000000, description: 'Lượt hiển thị quảng cáo' },
        engagement: { target: 2500000, description: 'Lượt tương tác (like, comment, share)' },
        conversation: { target: 500000, description: 'Lượt trò chuyện/tin nhắn' },
        traffic: { target: 1000000, description: 'Lượt truy cập website' },
        revenue: { target: 15000000000, description: 'Doanh thu từ chiến dịch' },
      },
      attachedFiles: [
        { name: 'brief-tet-2025.pdf', size: 2456 },
        { name: 'budget-breakdown.xlsx', size: 1234 },
        { name: 'creative-guideline.pdf', size: 3456 },
      ],
    };
  };

  const orderData = getOrderData(orderId);

  const getTimeline = (id: string | null, status: string) => {
    if (id === 'REQ-2025-007') {
      return [
        {
          date: '12/01/2025 09:00',
          user: 'Phạm Thị D',
          action: 'Tạo yêu cầu',
          status: 'created',
          comment: 'Yêu cầu được tạo và gửi lên hệ thống',
        },
        {
          date: '12/01/2025 14:30',
          user: 'Trần Thị B',
          action: 'Bắt đầu xem xét',
          status: 'under_review',
          comment: 'Đã tiếp nhận yêu cầu, đang xem xét nội dung và ngân sách',
        },
        {
          date: '13/01/2025 10:00',
          user: 'Phạm Văn C',
          action: 'Yêu cầu bổ sung',
          status: 'need_info',
          comment: 'Vui lòng bổ sung thêm thông tin về breakdown ngân sách chi tiết và điều chỉnh thời gian triển khai',
        },
        {
          date: '13/01/2025 15:20',
          user: 'Phạm Thị D',
          action: 'Cập nhật thông tin',
          status: 'updated',
          comment: 'Đã cập nhật thông tin ngân sách chi tiết theo yêu cầu',
        },
        {
          date: '14/01/2025 11:30',
          user: 'Trần Thị B',
          action: 'Từ chối yêu cầu',
          status: 'rejected',
          comment: 'Yêu cầu bị từ chối do ngân sách vượt quá phân bổ Q2/2025 và thời điểm triển khai trùng với chiến dịch của đối thủ cạnh tranh',
        },
      ];
    }

    // Default timeline for other orders
    const fullTimeline = [
      {
        date: '15/01/2025 09:30',
        user: 'Nguyễn Văn A',
        action: 'Tạo yêu cầu',
        status: 'created',
        comment: 'Yêu cầu được tạo và gửi lên hệ thống',
      },
      {
        date: '15/01/2025 14:20',
        user: 'Trần Thị B',
        action: 'Bắt đầu xem xét',
        status: 'under_review',
        comment: 'Đã tiếp nhận yêu cầu, đang xem xét nội dung và ngân sách',
      },
      {
        date: '16/01/2025 10:15',
        user: 'Phạm Văn C',
        action: 'Yêu cầu bổ sung',
        status: 'need_info',
        comment: 'Vui lòng bổ sung thêm thông tin về KPI cụ thể và breakdown ngân sách theo từng kênh',
      },
      {
        date: '17/01/2025 08:45',
        user: 'Nguyễn Văn A',
        action: 'Cập nhật thông tin',
        status: 'updated',
        comment: 'Đã cập nhật thông tin KPI và breakdown ngân sách theo yêu cầu',
      },
      {
        date: '18/01/2025 11:00',
        user: 'Trần Thị B',
        action: 'Duyệt yêu cầu',
        status: 'approved',
        comment: 'Yêu cầu đã được duyệt, chiến dịch sẽ được triển khai theo kế hoạch',
      },
    ];

    // Nếu đang xem xét, chỉ trả về đến bước "Bắt đầu xem xét"
    if (status === 'under_review') {
      return fullTimeline.slice(0, 2);
    }

    return fullTimeline;
  };

  const timeline = getTimeline(orderId, orderData.status);

  const getStatusColor = (status: string) => {
    const colors = {
      under_review: 'bg-blue-50 text-blue-700 border-blue-200',
      approved: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
      completed: 'bg-teal-50 text-teal-700 border-teal-200',
    };
    return colors[status as keyof typeof colors] || colors.under_review;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-600',
      medium: 'bg-blue-100 text-blue-600',
      high: 'bg-red-100 text-red-600',
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case 'created':
        return <Clock className="w-4 h-4" />;
      case 'under_review':
        return <AlertCircle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case 'created':
        return 'bg-gray-500';
      case 'under_review':
        return 'bg-blue-500';
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'need_info':
        return 'bg-amber-500';
      default:
        return 'bg-gray-400';
    }
  };

  // const getChannelIcon = (channel: string) => {
  //   switch (channel.toLowerCase()) {
  //     case 'facebook':
  //       return <Facebook className="w-4 h-4" />;
  //     case 'instagram':
  //       return <Instagram className="w-4 h-4" />;
  //     case 'google ads':
  //       return <Search className="w-4 h-4" />;
  //     case 'youtube':
  //       return <Youtube className="w-4 h-4" />;
  //     case 'tiktok':
  //       return <Music className="w-4 h-4" />;
  //     case 'ooh':
  //       return <Monitor className="w-4 h-4" />;
  //     case 'pr':
  //     case 'tvc':
  //       return <Megaphone className="w-4 h-4" />;
  //     default:
  //       return <Target className="w-4 h-4" />;
  //   }
  // };

  const getChannelLogo = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'facebook':
        return 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png';
      case 'instagram':
        return 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png';
      case 'google ads':
        return 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg';
      case 'youtube':
        return 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg';
      case 'tiktok':
        return 'https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png';
      case 'ooh':
        return 'https://cdn-icons-png.flaticon.com/512/3079/3079652.png';
      case 'pr':
        return 'https://cdn-icons-png.flaticon.com/512/3079/3079404.png';
      case 'tvc':
        return 'https://cdn-icons-png.flaticon.com/512/3079/3079410.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/3079/3079652.png';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-900 text-2xl">{orderData.name}</h2>
            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs border ${getStatusColor(orderData.status)}`}>
              {orderData.statusText}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Mã yêu cầu: {orderData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-3">
          {/* Thông tin chung */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-3">Thông tin chung</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Left Column */}
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Tên chiến dịch</label>
                  <Input
                    value={orderData.name} 
                    readOnly 
                    className="bg-white border-gray-300 cursor-default h-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Mô tả chiến dịch</label>
                  <Textarea
                    value={orderData.description} 
                    readOnly 
                    className="bg-white border-gray-300 cursor-default resize-none min-h-[70px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Thời gian triển khai</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Từ ngày</label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        <Input 
                          value={orderData.startDate} 
                          readOnly 
                          className="bg-white border-gray-300 cursor-default h-9 pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Đến ngày</label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        <Input 
                          value={orderData.endDate} 
                          readOnly 
                          className="bg-white border-gray-300 cursor-default h-9 pl-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Người tạo</label>
                  <Input 
                    value={orderData.createdBy} 
                    readOnly 
                    className="bg-white border-gray-300 cursor-default h-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Phòng ban</label>
                  <Input 
                    value={orderData.department} 
                    readOnly 
                    className="bg-white border-gray-300 cursor-default h-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Ngày tạo</label>
                  <Input 
                    value={orderData.createdDate} 
                    readOnly 
                    className="bg-white border-gray-300 cursor-default h-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Mức độ ưu tiên</label>
                  <div className="h-9 flex items-center px-3 rounded-lg border border-gray-300 bg-white">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm ${getPriorityColor(orderData.priority)}`}>
                      {orderData.priority === 'high' && 'Cao'}
                      {orderData.priority === 'medium' && 'Trung bình'}
                      {orderData.priority === 'low' && 'Thấp'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lý do từ chối - chỉ hiển thị khi trạng thái là "Từ chối" */}
          {orderData.status === 'rejected' && orderData.rejectionReason && (
            <div className="bg-red-50 rounded-xl border-2 border-red-300 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-red-900 mb-2">Lý do từ chối</h3>
                  <div className="p-3 bg-white rounded-lg border border-red-200">
                    <p className="text-sm text-gray-700 leading-relaxed">{orderData.rejectionReason}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hiển thị chi tiết chỉ khi trạng thái là "Đã duyệt" */}
          {orderData.status === 'approved' && (
            <>
              {/* Thị trường mục tiêu và Các kênh được duyệt - Grid 2 cột */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Thị trường mục tiêu */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-gray-900 mb-3">Thị trường mục tiêu</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {orderData.targetMarkets.map((market, index) => (
                      <div 
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md border border-gray-300 text-sm text-center"
                      >
                        {market}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Các kênh được duyệt */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-gray-900 mb-3">Các kênh được duyệt</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {orderData.approvedChannels.map((channel, index) => (
                      <div 
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md border border-gray-300 text-sm flex items-center justify-center gap-2"
                      >
                        <ImageWithFallback
                          src={getChannelLogo(channel)}
                          alt={channel}
                          className="w-4 h-4 object-contain"
                        />
                        <span>{channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mục tiêu truyền thông tổng quát */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-gray-900 mb-3">Mục tiêu truyền thông tổng quát</h3>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">{orderData.communicationGoals}</p>
                </div>
              </div>
            </>
          )}

          {/* Tài liệu từ phòng ban */}
          {orderData.attachedFiles && orderData.attachedFiles.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-gray-900 mb-3">Tài liệu từ phòng ban</h3>
              <div className="space-y-2">
                {orderData.attachedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hiển thị chi tiết chỉ khi trạng thái là "Đã duyệt" */}
          {orderData.status === 'approved' && (
            <>
              {/* Ngân sách và phân bổ - HIGHLIGHTED */}
              <div className="bg-gradient-to-br from-[#006885]/5 to-[#006885]/10 rounded-xl border-2 border-[#006885]/30 p-4">
                <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#006885]" />
                  Ngân sách và phân bổ theo kênh
                </h3>
                <div className="mb-3 pb-3 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-[#006885] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Tổng ngân sách</p>
                      <p className="text-xl text-gray-900">{orderData.budget.toLocaleString('vi-VN')} VNĐ</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {orderData.budgetByChannel.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{item.channel}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900">{item.amount.toLocaleString('vi-VN')} VNĐ</span>
                          <span className="text-sm text-gray-500 min-w-[40px] text-right">{item.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2">
                        <div 
                          className="bg-[#006885] h-2 rounded-full transition-all" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI chiến dịch - HIGHLIGHTED */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-300 p-3">
                <h3 className="text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-700" />
                  KPI chiến dịch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {/* Impression */}
                  <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Eye className="w-4 h-4 text-gray-700" />
                      </div>
                      <p className="text-sm text-gray-900">Impression</p>
                    </div>
                    <p className="text-lg text-gray-900">{orderData?.kpis?.impression?.target.toLocaleString('vi-VN')}</p>
                    <p className="text-xs text-gray-600">{orderData?.kpis?.impression?.description}</p>
                  </div>

                  {/* Engagement */}
                  <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-gray-700" />
                      </div>
                      <p className="text-sm text-gray-900">Engagement</p>
                    </div>
                    <p className="text-lg text-gray-900">{orderData?.kpis?.engagement?.target.toLocaleString('vi-VN')}</p>
                    <p className="text-xs text-gray-600">{orderData?.kpis?.engagement?.description}</p>
                  </div>

                  {/* Conversation */}
                  <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-gray-700" />
                      </div>
                      <p className="text-sm text-gray-900">Conversation</p>
                    </div>
                    <p className="text-lg text-gray-900">{orderData?.kpis?.conversation?.target.toLocaleString('vi-VN')}</p>
                    <p className="text-xs text-gray-600">{orderData?.kpis?.conversation?.description}</p>
                  </div>

                  {/* Traffic */}
                  <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-700" />
                      </div>
                      <p className="text-sm text-gray-900">Traffic</p>
                    </div>
                    <p className="text-lg text-gray-900">{orderData?.kpis?.traffic?.target.toLocaleString('vi-VN')}</p>
                    <p className="text-xs text-gray-600">{orderData?.kpis?.traffic?.description}</p>
                  </div>

                  {/* Revenue */}
                  <div className="p-2.5 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-gray-700" />
                      </div>
                      <p className="text-sm text-gray-900">Revenue</p>
                    </div>
                    <p className="text-lg text-gray-900">{orderData?.kpis?.revenue?.target.toLocaleString('vi-VN')} VNĐ</p>
                    <p className="text-xs text-gray-600">{orderData?.kpis?.revenue?.description}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Lịch sử phê duyệt */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-3">Lịch sử phê duyệt</h3>
            
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${getTimelineColor(item.status)} flex items-center justify-center text-white flex-shrink-0`}>
                      {getTimelineIcon(item.status)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-1.5" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-1.5">Bởi: {item.user}</p>
                    <p className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}