import { TrendingUp, FileText, Clock, CheckCircle, Eye, XCircle, PlayCircle } from 'lucide-react';

interface OverviewDashboardProps {
  onViewOrder: (orderId: string) => void;
}

export default function OverviewDashboard({ onViewOrder }: OverviewDashboardProps) {
  const stats = [
    {
      title: 'Tổng yêu cầu',
      value: '48',
      icon: FileText,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Đang xử lý',
      value: '12',
      icon: Clock,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Đã duyệt',
      value: '28',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Từ chối',
      value: '3',
      icon: XCircle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: 'Chiến dịch đang chạy',
      value: '15',
      icon: PlayCircle,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  const runningCampaigns = [
    {
      id: 'CMP-2025-022',
      name: 'Quảng bá đường bay mới HAN-SYD',
      status: 'Đang chạy',
      statusColor: 'bg-green-50 text-green-700 border-green-200',
      startDate: '20/01/2025',
      specialist: 'Nguyễn Khánh',
    },
    {
      id: 'CMP-2025-018',
      name: 'Chương trình ưu đãi thẻ thành viên',
      status: 'Đang chạy',
      statusColor: 'bg-green-50 text-green-700 border-green-200',
      startDate: '15/01/2025',
      specialist: 'Trần Minh',
    },
    {
      id: 'CMP-2025-015',
      name: 'Khuyến mãi vé máy bay Tết 2025',
      status: 'Đang chạy',
      statusColor: 'bg-green-50 text-green-700 border-green-200',
      startDate: '10/01/2025',
      specialist: 'Lê Hoàng',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-[#006885] rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-lg">
        {/* Background pattern/image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1752901320179-f39106b550fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwYWlybGluZXMlMjBhaXJwbGFuZXxlbnwxfHx8fDE3NjQ1Nzg1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full mb-2">
            <span className="text-white text-xs">Vietnam Airlines CPMS</span>
          </div>
          <h2 className="text-white mb-1">Chào mừng trở lại! 👋</h2>
          <p className="text-white/90 text-sm">Quản lý nhu cầu truyền thông của phòng ban</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border-2 border-gray-100 hover:border-teal-400 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Decorative gradient background */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${stat.bgColor} p-2.5 rounded-xl shadow-sm`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  </div>
                </div>
                
                <div>
                  <p className={`text-4xl mb-1 ${stat.iconColor}`}>
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-xs leading-tight">{stat.title}</p>
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Running Campaigns */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <PlayCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Kế hoạch đang chạy</h3>
                <p className="text-sm text-gray-500">Các kế hoạch đang hoạt động</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Mã kế hoạch</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Tên kế hoạch</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Ngày bắt đầu</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Chuyên viên</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {runningCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#006885]">{campaign.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{campaign.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs border ${campaign.statusColor}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{campaign.startDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{campaign.specialist}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewOrder(campaign.id)}
                      className="inline-flex items-center justify-center p-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
