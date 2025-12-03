import { useState } from "react";import {
  TrendingUp,
  DollarSign,
  Target,
  FileText,
  AlertCircle,
  Users,
  BarChart3,
  Calendar as CalendarIcon,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Progress } from "./ui/progress";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function DashboardOverviewTab() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 11, 1), // 01/12/2025
    to: new Date(2025, 11, 31), // 31/12/2025
  });
  const [tempDateRange, setTempDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: new Date(2025, 11, 1),
    to: new Date(2025, 11, 31),
  });
  const [quickFilter, setQuickFilter] = useState("month");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleQuickFilter = (filter: string) => {
    setQuickFilter(filter);

    let newRange;
    switch (filter) {
      case "month":
        newRange = {
          from: new Date(2025, 11, 1),
          to: new Date(2025, 11, 31),
        };
        break;
      case "quarter":
        newRange = {
          from: new Date(2025, 9, 1), // Q4: Oct-Dec
          to: new Date(2025, 11, 31),
        };
        break;
      case "year":
        newRange = {
          from: new Date(2025, 0, 1),
          to: new Date(2025, 11, 31),
        };
        break;
      default:
        return;
    }
    setTempDateRange(newRange);
    setDateRange(newRange);
    setIsPopoverOpen(false);
  };

  const handleApply = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      setDateRange({ from: tempDateRange.from, to: tempDateRange.to });
      setQuickFilter("");
      setIsPopoverOpen(false);
    }
  };

  const handleReset = () => {
    const defaultRange = {
      from: new Date(2025, 11, 1),
      to: new Date(2025, 11, 31),
    };
    setTempDateRange(defaultRange);
    setDateRange(defaultRange);
    setQuickFilter("month");
  };

  // Định nghĩa màu sắc theo chiến dịch
  const campaignColors: { [key: string]: string } = {
    "Khuyến mãi Giáng sinh": "#F44336",
    "Chào năm mới 2026": "#FF9800",
    "Mua Vé Tết 2026": "#2196F3",
    "Đường bay Hà Nội - Tokyo": "#9C27B0",
    "Khuyến mãi Mùa Hè 2026": "#FFC107",
  };

  // Dữ liệu Donut Chart cho ngân sách chiến dịch
  const budgetDonutData = [
    {
      name: "Mua Vé Tết Bính Ngọ 2026",
      value: 450,
      percentage: 50,
      color: "#2196F3",
    },
    {
      name: "Đường bay H�� Nội - Tokyo",
      value: 200,
      percentage: 22,
      color: "#9C27B0",
    },
    { name: "Chào năm mới 2026", value: 100, percentage: 11, color: "#FF9800" },
    {
      name: "Khuyến mãi Giáng sinh",
      value: 80,
      percentage: 9,
      color: "#F44336",
    },
    {
      name: "Khuyến mãi Mùa Hè 2026",
      value: 70,
      percentage: 8,
      color: "#FFC107",
    },
  ];

  const totalBudget = 900; // Tổng ngân sách

  // Dữ liệu Phân bổ kênh truyền thông theo ngân sách (100% Stacked Bar Chart)
  const mediaAllocationBudgetData = [
    {
      channel: "Facebook Ads",
      total: 335,
      "Mùa Hè 2026": 100,
      "Mua Vé Tết 2026": 120,
      "Khuyến mãi Giáng sinh": 80,
      "Chào năm mới 2026": 35,
    },
    {
      channel: "Facebook Fanpage VNA",
      total: 270,
      "Mua Vé Tết 2026": 150,
      "Khuyến mãi Giáng sinh": 50,
      "Chào năm mới 2026": 40,
      "Mùa Hè 2026": 20,
      "Đường bay Tokyo": 10,
    },
    {
      channel: "Google Search Ads",
      total: 210,
      "Mua Vé Tết 2026": 120,
      "Mùa Hè 2026": 70,
      "Đường bay Tokyo": 20,
    },
    {
      channel: "PR báo điện tử",
      total: 180,
      "Đường bay Tokyo": 80,
      "Mua Vé Tết 2026": 100,
    },
    {
      channel: "TVC VTV7",
      total: 145,
      "Đường bay Tokyo": 60,
      "Mua Vé Tết 2026": 50,
      "Chào năm mới 2026": 35,
    },
    {
      channel: "Email FFP",
      total: 70,
      "Khuyến mãi Giáng sinh": 20,
      "Mua Vé Tết 2026": 30,
      "Mùa Hè 2026": 20,
    },
    {
      channel: "Billboard",
      total: 65,
      "Đường bay Tokyo": 40,
      "Chào năm mới 2026": 25,
    },
    {
      channel: "Website",
      total: 40,
      "Mua Vé Tết 2026": 30,
      "Khuyến mãi Giáng sinh": 10,
    },
    {
      channel: "Radio VOV",
      total: 15,
      "Đường bay Tokyo": 15,
    },
    {
      channel: "SMS Brandname",
      total: 10,
      "Mùa Hè 2026": 10,
    },
  ];

  // // Dữ liệu Phân bổ kênh truyền thông (100% Stacked Bar Chart)
  // const mediaAllocationData = [
  //   {
  //     campaign: "Khuyến mãi Giáng sinh",
  //     total: 18,
  //     "Facebook Fanpage VNA": 38.9,
  //     "Email FFP hội viên": 22.2,
  //     "Website vietnamairlines.com": 5.6,
  //     "Facebook Ads": 33.3,
  //     tasks: {
  //       "Facebook Fanpage VNA": { count: 7 },
  //       "Email FFP hội viên": { count: 4 },
  //       "Website vietnamairlines.com": { count: 1 },
  //       "Facebook Ads": { count: 6 },
  //     },
  //   },
  //   {
  //     campaign: "Chào năm mới 2026",
  //     total: 14,
  //     "Facebook Fanpage VNA": 35.7,
  //     "TVC VTV7": 28.6,
  //     "Billboard Trần Duy Hưng": 21.4,
  //     "Facebook Ads": 14.3,
  //     tasks: {
  //       "Facebook Fanpage VNA": { count: 5 },
  //       "TVC VTV7": { count: 4 },
  //       "Billboard Trần Duy Hưng": { count: 3 },
  //       "Facebook Ads": { count: 2 },
  //     },
  //   },
  //   {
  //     campaign: "Mua Vé Tết 2026",
  //     total: 22,
  //     "Facebook Fanpage VNA": 18.2,
  //     "Website vietnamairlines.com": 9.1,
  //     "Email FFP hội viên": 9.1,
  //     "Facebook Ads": 18.2,
  //     "Google Search Ads": 18.2,
  //     "PR báo điện tử": 13.6,
  //     "TVC VTV7": 13.6,
  //     tasks: {
  //       "Facebook Fanpage VNA": { count: 4 },
  //       "Website vietnamairlines.com": { count: 2 },
  //       "Email FFP hội viên": { count: 2 },
  //       "Facebook Ads": { count: 4 },
  //       "Google Search Ads": { count: 4 },
  //       "PR báo điện tử": { count: 3 },
  //       "TVC VTV7": { count: 3 },
  //     },
  //   },
  //   {
  //     campaign: "Đường bay Hà Nội - Tokyo",
  //     total: 25,
  //     "Facebook Fanpage VNA": 8.0,
  //     "PR báo điện tử": 32.0,
  //     "TVC VTV7": 24.0,
  //     "Billboard Trần Duy Hưng": 16.0,
  //     "Google Search Ads": 12.0,
  //     "Radio VOV": 8.0,
  //     tasks: {
  //       "Facebook Fanpage VNA": { count: 2 },
  //       "PR báo điện tử": { count: 8 },
  //       "TVC VTV7": { count: 6 },
  //       "Billboard Trần Duy Hưng": { count: 4 },
  //       "Google Search Ads": { count: 3 },
  //       "Radio VOV": { count: 2 },
  //     },
  //   },
  //   {
  //     campaign: "Khuyến mãi Mùa Hè 2026",
  //     total: 20,
  //     "Facebook Fanpage VNA": 30.0,
  //     "Email FFP hội viên": 15.0,
  //     "Facebook Ads": 25.0,
  //     "Google Search Ads": 20.0,
  //     "SMS Brandname": 10.0,
  //     tasks: {
  //       "Facebook Fanpage VNA": { count: 6 },
  //       "Email FFP hội viên": { count: 3 },
  //       "Facebook Ads": { count: 5 },
  //       "Google Search Ads": { count: 4 },
  //       "SMS Brandname": { count: 2 },
  //     },
  //   },
  // ];

  // Dữ liệu tiến độ theo chiến dịch
  const campaignProgress = [
    {
      campaign: "Khuyến mãi Giáng sinh",
      progress: 100,
      status: "completed",
      tasksCompleted: 18,
      tasksTotal: 18,
      timeline: "01/11/2025 - 25/12/2025",
    },
    {
      campaign: "Chào năm mới 2026",
      progress: 100,
      status: "completed",
      tasksCompleted: 14,
      tasksTotal: 14,
      timeline: "15/12/2025 - 05/01/2026",
    },
    {
      campaign: "Mua Vé Tết 2026",
      progress: 68,
      status: "on-track",
      tasksCompleted: 16,
      tasksTotal: 22,
      timeline: "01/12/2025 - 15/02/2026",
    },
    {
      campaign: "Đường bay Hà Nội - Tokyo",
      progress: 42,
      status: "on-track",
      tasksCompleted: 10,
      tasksTotal: 25,
      timeline: "10/12/2025 - 31/03/2026",
    },
    {
      campaign: "Khuyến mãi Mùa Hè 2026",
      progress: 15,
      status: "paused",
      tasksCompleted: 3,
      tasksTotal: 20,
      timeline: "01/04/2026 - 30/06/2026",
    },
  ];

  // Dữ liệu Media Campaign - Metrics Cards
  const mediaCampaignMetrics = {
    totalCampaigns: 3,
    contentPlanned: 145,
    contentActual: 130,
    contentPercent: 90,
    activeChannels: 3,
    totalBudget: 900,
  };

  // Dữ liệu Media Campaign - Bảng theo kênh
  const mediaCampaignStats = [
    {
      channel: "Facebook Fanpage VNA",
      planned: 20,
      actual: 5,
      completion: 25,
      campaigns: 3,
      budget: 400,
    },
    {
      channel: "Website vietnamairlines.com",
      planned: 10,
      actual: 3,
      completion: 30,
      campaigns: 3,
      budget: 200,
    },
    {
      channel: "PR báo điện tử",
      planned: 15,
      actual: 2,
      completion: 13,
      campaigns: 2,
      budget: 300,
    },
  ];

  // Dữ liệu Event Campaign Metrics
  const eventCampaignMetrics = {
    totalEvents: 2,
    upcomingEvents: 1,
    checklistPercent: 68,
    totalBudget: "350",
  };

  // Dữ liệu bảng Event Campaign
  const eventCampaignStats = [
    {
      campaign: "Mua Vé Tết 2026",
      eventName: "Roadshow Tết tại TP.HCM",
      startDate: "15/01/2026",
      endDate: "20/01/2026",
      location: "SC VivoCity Q7",
      status: "Sắp diễn ra",
      checklistDone: 4,
      checklistTotal: 15,
      checklistPercent: 27,
      budget: "150M",
    },
    {
      campaign: "Chào năm mới 2026",
      eventName: "Gala Tết Bính Ngọ 2026",
      startDate: "28/12/2025",
      endDate: "28/12/2025",
      location: "JW Marriott HN",
      status: "Hoàn thành",
      checklistDone: 15,
      checklistTotal: 15,
      checklistPercent: 100,
      budget: "200M",
    },
  ];

  // Dữ liệu Sponsor Campaign Metrics
  const sponsorCampaignMetrics = {
    totalCampaigns: 3,
  };

  // Dữ liệu Sponsor Campaign
  const sponsorCampaignStats = [
    {
      campaign: "Khuyến mãi Giáng sinh",
      sponsor: "Visa International",
      type: "Partnership",
      budget: "250M",
      status: "Hoàn thành",
      startDate: "01/12/2025",
      endDate: "31/12/2025",
    },
    {
      campaign: "Mua Vé Tết 2026",
      sponsor: "Samsung Vietnam",
      type: "Brand Collaboration",
      budget: "180M",
      status: "Đang tiến hành",
      startDate: "15/11/2025",
      endDate: "15/02/2026",
    },
    {
      campaign: "Chào năm mới 2026",
      sponsor: "AIA Insurance",
      type: "Co-branding",
      budget: "120M",
      status: "Hoàn thành",
      startDate: "25/12/2025",
      endDate: "10/01/2026",
    },
  ];

  // Dữ liệu Crisis Campaign Metrics
  const crisisCampaignMetrics = {
    totalCampaigns: 1,
  };

  // Dữ liệu Crisis Campaign
  const crisisCampaignStats = [
    {
      campaign: "Khuyến mãi Giáng sinh",
      crisisName: "Sự cố trễ chuyến bay do thời tiết xấu",
      severity: "Cao",
      causedBy: "Phòng Khai thác Bay",
      result: "Đã xử lý xong, bồi thường 100% khách hàng bị ảnh hưởng",
    },
  ];

  // Dữ liệu Award Campaign Metrics
  const awardCampaignMetrics = {
    totalCampaigns: 1,
  };

  // Dữ liệu Award Campaign
  const awardCampaignStats = [
    {
      campaign: "Chào năm mới 2026",
      eventName: "World Travel Awards 2025",
      awardDate: "15/12/2025",
      awardType: "Leading Airline - Asia",
      result: "Đạt giải Vàng",
    },
  ];

  // Custom Tooltip cho biểu đồ ngân sách Donut
  const BudgetDonutTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Ngân sách:</span> {data.value}M VNĐ
            </p>
            <p className="text-sm">
              <span className="font-medium">Tỷ lệ:</span> {data.percentage}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Label cho center của Donut Chart - sửa lỗi viewBox
  const renderCenterLabel = () => {
    return (
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
        <tspan
          x="50%"
          dy="-10"
          style={{ fontSize: "20px", fontWeight: "bold", fill: "#111827" }}
        >
          {totalBudget}M VNĐ
        </tspan>
        <tspan x="50%" dy="25" style={{ fontSize: "12px", fill: "#6B7280" }}>
          Tổng ngân sách
        </tspan>
      </text>
    );
  };

  // Custom Tooltip cho biểu đồ Media Allocation Budget
  const MediaAllocationBudgetTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const channelData = mediaAllocationBudgetData.find(
        (d) => d.channel === label
      );

      if (channelData) {
        // Lấy tất cả các chiến dịch trong kênh (trừ 'channel' và 'total')
        const campaigns = Object.keys(channelData).filter(
          (key) => key !== "channel" && key !== "total"
        );

        return (
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
            <p className="font-semibold text-gray-900 mb-1">Kênh: {label}</p>
            <p className="text-sm text-gray-600 mb-3">
              Tổng: {channelData.total}M VNĐ
            </p>
            <div className="border-t pt-2">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Phân bổ chiến dịch:
              </p>
              <div className="space-y-2">
                {campaigns.map((campaignName) => {
                  const campaignBudget =
                    channelData[campaignName as keyof typeof channelData];
                  const percentInChannel = (
                    (Number(campaignBudget) / Number(channelData.total)) *
                    100
                  ).toFixed(0);
                  const color = campaignColors[campaignName];

                  return (
                    <div key={campaignName} className="flex items-start gap-2">
                      <div
                        className="w-3 h-3 flex-shrink-0 rounded-sm mt-0.5"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-gray-700 flex-1 leading-tight">
                        {campaignName}:{" "}
                        <span className="font-semibold">
                          {campaignBudget}M ({percentInChannel}%)
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      {/* Header Section - Tên màn hình + Filter - Full width với nền trắng */}
      <div className="bg-white">
        {/* Tên màn hình */}
        <div className="px-6 py-6">
          <h1
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Dashboard Tổng quan chiến dịch
          </h1>
        </div>

        {/* Line ngăn cách */}
        <div className="border-t border-gray-200"></div>

        {/* Filters */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Date Range Picker */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Khoảng thời gian:
              </span>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from && dateRange?.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                        {format(dateRange.to, "dd/MM/yyyy", { locale: vi })}
                      </>
                    ) : (
                      <span>Chọn khoảng thời gian</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex gap-2">
                      <Button
                        variant={
                          quickFilter === "month" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleQuickFilter("month")}
                      >
                        Tháng này
                      </Button>
                      <Button
                        variant={
                          quickFilter === "quarter" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleQuickFilter("quarter")}
                      >
                        Quý này
                      </Button>
                      <Button
                        variant={quickFilter === "year" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleQuickFilter("year")}
                      >
                        Năm này
                      </Button>
                    </div>
                  </div>
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={{ from: dateRange?.from, to: dateRange?.to }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setTempDateRange({ from: range.from, to: range.to });
                      }
                    }}
                    numberOfMonths={2}
                    locale={vi}
                  />
                  <div className="p-3 border-t">
                    <div className="flex justify-between">
                      <Button size="sm" onClick={handleReset}>
                        Reset
                      </Button>
                      <Button size="sm" onClick={handleApply}>
                        Áp dụng
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Export Button */}
            <Button variant="outline" size="sm" className="h-10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Line ngăn cách trước các card chỉ tiêu */}
      <div className="border-t border-gray-200"></div>

      {/* Content area với padding */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* KPIs - Các chỉ số chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1 - Tổng số chiến dịch */}
          <Card className="relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng số chiến dịch
              </CardTitle>
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-gray-900 mb-4">5</div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Hoàn thành</span>
                  <Badge className="bg-green-500 text-white font-semibold">
                    2
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Tạm dừng</span>
                  <Badge className="bg-orange-500 text-white font-semibold">
                    1
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Đang chạy</span>
                  <Badge className="bg-blue-500 text-white font-semibold">
                    2
                  </Badge>
                </div>
              </div>
              {/* <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 15% so với tháng trước</span>
            </div> */}
            </CardContent>
          </Card>

          {/* Card 2 - Kế hoạch nội dung */}
          <Card className="relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-pink-100">
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative">
              <CardTitle className="text-sm font-medium text-gray-600">
                Kế hoạch nội dung
              </CardTitle>
              <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-gray-900 mb-4">45</div>
              <div className="space-y-2.5 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">
                    Facebook Fanpage VNA
                  </span>
                  <span className="font-bold text-gray-900">20</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">
                    Website vietnamairlines.com
                  </span>
                  <span className="font-bold text-gray-900">10</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">
                    PR báo điện tử
                  </span>
                  <span className="font-bold text-gray-900">15</span>
                </div>
              </div>
              {/* <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 8% so với tháng trước</span>
            </div> */}
            </CardContent>
          </Card>

          {/* Card 3 - Tiến độ tổng thể */}
          <Card className="relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-green-100">
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tiến độ nội dung
              </CardTitle>
              <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <Target className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.22)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      22%
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="text-xs text-gray-600 text-center mb-2">
                  % Hoàn thành các nội dung
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Nội dung hoàn thành</span>
                  <span className="font-medium text-gray-900">10/45</span>
                </div>
              </div>
              {/* <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 12% so với tháng trước</span>
            </div> */}
            </CardContent>
          </Card>

          {/* Card 4 - Ngân sách */}
          <Card className="relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100">
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ngân sách chiến dịch
              </CardTitle>
              <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-1 mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">720M</span>
                  <span className="text-xs text-gray-600">/ 900M VNĐ</span>
                </div>
                <Progress value={80} className="h-2 mb-2" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Ngân sách duyệt</span>
                  <span className="font-medium text-gray-900">900M</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Chi phí đã tiêu</span>
                  <span className="font-medium text-gray-900">720M</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Còn lại</span>
                  <span className="font-medium text-green-600">180M (20%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 - Doanh thu dự kiến */}
          <Card className="relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative">
              <CardTitle className="text-sm font-medium text-gray-600">
                Doanh thu dự kiến
              </CardTitle>
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-1 mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">9B</span>
                  <span className="text-xs text-gray-600">/ 12B VNĐ</span>
                </div>
                <Progress value={75} className="h-2 mb-2" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Target</span>
                  <span className="font-medium text-gray-900">12B</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Thực tế đạt được</span>
                  <span className="font-medium text-gray-900">9B</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Chênh lệch</span>
                  <span className="font-medium text-orange-600">3B (25%)</span>
                </div>
              </div>
              {/* <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-purple-600 font-medium">
                Dự kiến đạt 95% target vào cuối tháng
              </div>
            </div> */}
            </CardContent>
          </Card>
        </div>

        {/* Biểu đồ chính */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Biểu đồ tiến độ tổng thể */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Tiến độ chiến dịch
              </CardTitle>
              <CardDescription>
                Theo dõi tiến độ chiến dịch theo % nội dung hoàn thành
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <TooltipProvider>
                <div className="space-y-3">
                  {campaignProgress.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {item.campaign}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {item.progress}%
                          </span>
                        </div>
                      </div>
                      <TooltipUI>
                        <TooltipTrigger asChild>
                          <div className="cursor-pointer">
                            <Progress
                              value={item.progress}
                              className="h-2"
                              style={{
                                ["--progress-background" as any]:
                                  item.status === "completed"
                                    ? "#10b981"
                                    : item.status === "on-track"
                                    ? "#3b82f6"
                                    : "#f59e0b",
                              }}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs [&>svg]:hidden"
                        >
                          <div className="space-y-2.5">
                            <p className="text-base font-semibold text-gray-900">
                              {item.campaign}
                            </p>
                            <div className="space-y-1.5">
                              <p className="text-xs text-gray-700">
                                <span className="font-medium text-gray-900">
                                  Thời gian bắt đầu:
                                </span>{" "}
                                {item.timeline.split(" - ")[0]}
                              </p>
                              <p className="text-xs text-gray-700">
                                <span className="font-medium text-gray-900">
                                  Thời gian kết thúc:
                                </span>{" "}
                                {item.timeline.split(" - ")[1]}
                              </p>
                              <p className="text-xs text-gray-700">
                                <span className="font-medium text-gray-900">
                                  Nội dung hoàn thành:
                                </span>{" "}
                                {item.tasksCompleted}/{item.tasksTotal} (
                                {item.progress}%)
                              </p>
                            </div>
                          </div>
                        </TooltipContent>
                      </TooltipUI>
                    </div>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Biểu đồ Phân bổ ngân sách chi��n dịch (Donut Chart) */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-orange-600" />
                Phân bổ ngân sách chiến dịch
              </CardTitle>
              <CardDescription>
                Tổng ngân sách dự kiến phân bổ theo chiến dịch
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={budgetDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => {
                      const text = `${entry.name} (${entry.value}M VNĐ)`;
                      // Chia text thành nhiều dòng nếu quá dài (> 25 ký tự)
                      if (text.length > 25) {
                        const words = text.split(" ");
                        const lines = [];
                        let currentLine = "";

                        words.forEach((word) => {
                          if ((currentLine + word).length > 25) {
                            lines.push(currentLine.trim());
                            currentLine = word + " ";
                          } else {
                            currentLine += word + " ";
                          }
                        });
                        if (currentLine) lines.push(currentLine.trim());

                        return lines.join("\n");
                      }
                      return text;
                    }}
                    labelLine={true}
                    style={{ fontSize: "11px" }}
                  >
                    {budgetDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="percentage"
                      position="inside"
                      formatter={(value: any) => `${value}%`}
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fill: "#ffffff",
                      }}
                    />
                  </Pie>
                  <Tooltip content={BudgetDonutTooltip} />
                  {renderCenterLabel()}
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Biểu ��ồ theo dõi chi tiêu - Full width */}
        {/* <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-red-600" />
            Biểu đồ theo dõi chi tiêu
          </CardTitle>
          <CardDescription>Theo dõi chi phí tích lũy so với kế hoạch và ngân sách được duyệt</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={budgetTrackingData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                label={{ 
                  value: 'Chi phí tích lũy (M VNĐ)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '14px', fontWeight: '500' }
                }}
                domain={[0, 1000]}
                ticks={[0, 150, 300, 450, 600, 750, 900]}
              />
              <Tooltip content={<BudgetTrackingTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="line"
              />
              
              <Line 
                type="monotone" 
                dataKey="approved" 
                stroke="#dc2626" 
                strokeWidth={3}
                strokeDasharray="8 4"
                name="Ngân sách được duyệt"
                dot={false}
              />
              
              <Line 
                type="monotone" 
                dataKey="planned" 
                stroke="#9ca3af" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Kế hoạch chi tiêu"
                dot={{ fill: '#9ca3af', r: 4 }}
              />
              
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#2563eb" 
                strokeWidth={3}
                name="Chi phí đã tiêu"
                dot={{ fill: '#2563eb', r: 5 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

        {/* Biểu đồ Phân bổ kênh truyền thông - Full width */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Phân bổ ngân sách theo kênh truyền thông
            </CardTitle>
            <CardDescription>
              Phân bổ ngân sách theo kênh truyền thông (M VNĐ)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-3">
            <ResponsiveContainer width="100%" height={480}>
              <BarChart
                data={mediaAllocationBudgetData}
                margin={{ top: 15, right: 15, bottom: 80, left: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="channel"
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  label={{
                    value: "Ngân sách (M VNĐ)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                />
                <Tooltip content={MediaAllocationBudgetTooltip} />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                {/* 5 Chiến dịch */}
                <Bar
                  dataKey="Khuyến mãi Giáng sinh"
                  stackId="a"
                  fill={campaignColors["Khuyến mãi Giáng sinh"]}
                  name="Khuyến mãi Giáng sinh"
                >
                  <LabelList
                    dataKey="Khuyến mãi Giáng sinh"
                    position="center"
                    formatter={(value: any) => (value > 0 ? `${value}M` : "")}
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      fill: "#ffffff",
                    }}
                  />
                </Bar>
                <Bar
                  dataKey="Chào năm mới 2026"
                  stackId="a"
                  fill={campaignColors["Chào năm mới 2026"]}
                  name="Chào năm mới 2026"
                >
                  <LabelList
                    dataKey="Chào năm mới 2026"
                    position="center"
                    formatter={(value: any) => (value > 0 ? `${value}M` : "")}
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      fill: "#ffffff",
                    }}
                  />
                </Bar>
                <Bar
                  dataKey="Mua Vé Tết 2026"
                  stackId="a"
                  fill={campaignColors["Mua Vé Tết 2026"]}
                  name="Mua Vé Tết 2026"
                >
                  <LabelList
                    dataKey="Mua Vé Tết 2026"
                    position="center"
                    formatter={(value: any) => (value > 0 ? `${value}M` : "")}
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      fill: "#ffffff",
                    }}
                  />
                </Bar>
                <Bar
                  dataKey="Đường bay Tokyo"
                  stackId="a"
                  fill={campaignColors["Đường bay Hà Nội - Tokyo"]}
                  name="Đường bay Hà Nội - Tokyo"
                >
                  <LabelList
                    dataKey="Đường bay Tokyo"
                    position="center"
                    formatter={(value: any) => (value > 0 ? `${value}M` : "")}
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      fill: "#ffffff",
                    }}
                  />
                </Bar>
                <Bar
                  dataKey="Mùa Hè 2026"
                  stackId="a"
                  fill={campaignColors["Khuyến mãi Mùa Hè 2026"]}
                  name="Khuyến mãi Mùa Hè 2026"
                >
                  <LabelList
                    dataKey="Mùa Hè 2026"
                    position="center"
                    formatter={(value: any) => (value > 0 ? `${value}M` : "")}
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      fill: "#ffffff",
                    }}
                  />
                  <LabelList
                    dataKey="total"
                    position="top"
                    formatter={(value: any) => `${value}M VNĐ`}
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      fill: "#374151",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Phân tích tình trạng & tắc nghẽn */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg border-t-4 border-t-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Nội dung trễ deadline
            </CardTitle>
            <CardDescription>Các nội dung cần ưu tiên xử lý</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {delayedTasksByCampaign.map((campaignGroup, campIndex) => (
                <div key={campIndex} className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-red-200">
                    <p className="font-semibold text-gray-900 text-sm">{campaignGroup.campaign}</p>
                    <Badge className="bg-red-100 text-[rgb(229,2,2)]">Trễ: {campaignGroup.totalDelayed}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {campaignGroup.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{task.name}</span>
                          <Badge className="bg-red-600 text-white">{task.daysLate}d</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Knh: {task.channel}</p>
                          <p className="text-xs text-gray-600">Timeline: {task.timeline}</p>
                          <p className="text-xs text-gray-500">Phụ trách: {task.assignee}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-t-4 border-t-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              Nội dung chờ phê duyệt
            </CardTitle>
            <CardDescription>Nội dung đang đợi approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovalByCampaign.map((campaignGroup, campIndex) => (
                <div key={campIndex} className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-yellow-200">
                    <p className="font-semibold text-gray-900 text-sm">{campaignGroup.campaign}</p>
                    <Badge className="bg-yellow-100 text-yellow-700">Chờ: {campaignGroup.totalPending}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {campaignGroup.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{task.name}</span>
                          <Badge className="bg-yellow-600 text-white">{task.waitDays}d</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">Kênh: {task.channel}</p>
                        <p className="text-xs text-gray-500">Phụ trách: {task.assignee}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-t-4 border-t-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-purple-600" />
              Nội dung chờ vendor cập nhật
            </CardTitle>
            <CardDescription>Các nội dung đang chờ vendor cập nhật kết quả</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {waitingVendorByCampaign.map((campaignGroup, campIndex) => (
                <div key={campIndex} className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                    <p className="font-semibold text-gray-900 text-sm">{campaignGroup.campaign}</p>
                    <Badge className="bg-purple-100 text-[rgb(123,0,117)]">Chờ: {campaignGroup.totalWaiting}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {campaignGroup.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{task.name}</span>
                          <Badge className="bg-purple-600 text-white">{task.waitDays}d</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">Kênh: {task.channel}</p>
                        <p className="text-xs text-gray-500">Phụ trách: {task.assignee}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}

        {/* Dashboard theo loại campaign */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-lg">
              Dashboard theo loại chiến dịch
            </CardTitle>
            <CardDescription>
              Theo dõi chi tiết theo từng loại chiến dịch
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="media" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="media">Media Campaign</TabsTrigger>
                <TabsTrigger value="event">Event Campaign</TabsTrigger>
                <TabsTrigger value="sponsor">Sponsor Campaign</TabsTrigger>
                <TabsTrigger value="crisis">Crisis Campaign</TabsTrigger>
                <TabsTrigger value="award">Award Campaign</TabsTrigger>
              </TabsList>

              {/* Media Campaign Tab */}
              <TabsContent value="media">
                <div className="space-y-6">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Card 1 - Số lượng chiến dịch */}
                    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Tổng số chiến dịch
                          </p>
                          <p className="text-2xl font-bold text-cyan-600">
                            {mediaCampaignMetrics.totalCampaigns}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 2 - Tổng số nội dung */}
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Tổng số kế hoạch nội dung
                          </p>
                          <p className="text-2xl font-bold text-purple-600">
                            45
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 3 - Kênh đang chạy */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Kênh đang chạy
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            {mediaCampaignMetrics.activeChannels}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 4 - Tổng ngân sách */}
                    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Tổng ngân sách
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                            {mediaCampaignMetrics.totalBudget}M
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bảng số lượng nội dung theo kênh */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-cyan-600" />
                      <h3 className="font-semibold text-gray-900">
                        Số lượng nội dung theo kênh
                      </h3>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Kênh</TableHead>
                          <TableHead className="text-center">
                            SL kế hoạch
                          </TableHead>
                          <TableHead className="text-center">
                            SL hoàn thành
                          </TableHead>
                          <TableHead className="text-center">
                            % hoàn thành
                          </TableHead>
                          <TableHead className="text-center">
                            SL chiến dịch
                          </TableHead>
                          <TableHead className="text-center">
                            Ngân sách
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mediaCampaignStats.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {row.channel}
                            </TableCell>
                            <TableCell className="text-center">
                              {row.planned}
                            </TableCell>
                            <TableCell className="text-center font-semibold text-blue-600">
                              {row.actual}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={
                                  row.completion >= 90
                                    ? "bg-green-600 text-white border-0"
                                    : row.completion >= 70
                                    ? "bg-yellow-500 text-white border-0"
                                    : "bg-red-600 text-white border-0"
                                }
                              >
                                {row.completion}%
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="font-semibold text-blue-600">
                                {row.campaigns}
                              </span>
                            </TableCell>
                            <TableCell className="text-center font-semibold">
                              {row.budget}M
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Event Campaign Tab */}
              <TabsContent value="event">
                <div className="space-y-6">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1 - Tổng số Sự kiện */}
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Tổng số chiến dịch
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {eventCampaignMetrics.totalEvents}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 2 - Sắp diễn ra */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Sắp diễn ra
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            {eventCampaignMetrics.upcomingEvents}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 3 - Checklist */}
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Checklist
                          </p>
                          <p className="text-2xl font-bold text-purple-600">
                            {eventCampaignMetrics.checklistPercent}%{" "}
                            <span className="text-sm">done</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 4 - Ngân sách */}
                    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">
                            Ngân sách
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                            {eventCampaignMetrics.totalBudget}M
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bảng tổng quan */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="w-5 h-5 text-cyan-600" />
                      <h3 className="font-semibold text-gray-900">
                        Danh sách sự kiện & tiến độ
                      </h3>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên chiến dịch</TableHead>
                          <TableHead>Tên sự kiện</TableHead>
                          <TableHead>Ngày bắt đầu</TableHead>
                          <TableHead>Ngày kết thúc</TableHead>
                          <TableHead>Địa điểm</TableHead>
                          <TableHead className="text-center">
                            Trạng thái
                          </TableHead>
                          <TableHead>Checklist</TableHead>
                          <TableHead>Ngân sách</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {eventCampaignStats.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {row.campaign}
                            </TableCell>
                            <TableCell>{row.eventName}</TableCell>
                            <TableCell className="text-sm">
                              {row.startDate}
                            </TableCell>
                            <TableCell className="text-sm">
                              {row.endDate}
                            </TableCell>
                            <TableCell className="text-sm">
                              {row.location}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={
                                  row.status === "Hoàn thành"
                                    ? "bg-green-600 text-white"
                                    : row.status === "Sắp diễn ra"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-gray-600 text-white"
                                }
                              >
                                {row.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">
                                    {row.checklistDone}/{row.checklistTotal}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({row.checklistPercent}%)
                                  </span>
                                </div>
                                <Progress
                                  value={row.checklistPercent}
                                  className="h-2"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold text-[rgb(0,0,0)]">
                              {row.budget}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Sponsor Campaign Tab */}
              <TabsContent value="sponsor">
                <div className="space-y-4">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Tổng số chiến dịch
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                              {sponsorCampaignMetrics.totalCampaigns}
                            </p>
                          </div>
                          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">
                      Danh sách chiến dịch tài trợ
                    </h3>
                  </div>

                  {/* Bảng tổng quan */}
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên chiến dịch</TableHead>
                          <TableHead>Tên đối tác tài trợ</TableHead>
                          <TableHead>Loại hợp tác</TableHead>
                          <TableHead>Ngày bắt đầu</TableHead>
                          <TableHead>Ngày kết thúc</TableHead>
                          <TableHead className="text-center">
                            Trạng thái
                          </TableHead>
                          <TableHead className="text-right">
                            Ngân sách
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sponsorCampaignStats.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {row.campaign}
                            </TableCell>
                            <TableCell>{row.sponsor}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell className="text-sm">
                              {row.startDate}
                            </TableCell>
                            <TableCell className="text-sm">
                              {row.endDate}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={
                                  row.status === "Hoàn thành"
                                    ? "bg-green-600 text-white"
                                    : "bg-blue-600 text-white"
                                }
                              >
                                {row.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {row.budget}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Crisis Campaign Tab */}
              <TabsContent value="crisis">
                <div className="space-y-4">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Tổng số chiến dịch
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                              {crisisCampaignMetrics.totalCampaigns}
                            </p>
                          </div>
                          <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertCircle className="h-6 w-6 text-red-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-gray-900">
                      Danh sách chiến dịch khủng hoảng
                    </h3>
                  </div>

                  {/* Bảng tổng quan */}
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên chiến dịch</TableHead>
                          <TableHead>Tên khủng hoảng</TableHead>
                          <TableHead className="text-center">
                            Mức độ khủng hoảng
                          </TableHead>
                          <TableHead>Đơn vị gây ra khủng hoảng</TableHead>
                          <TableHead>Kết quả</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {crisisCampaignStats.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {row.campaign}
                            </TableCell>
                            <TableCell>{row.crisisName}</TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={
                                  row.severity === "Cao"
                                    ? "bg-red-600 text-white"
                                    : row.severity === "Trung bình"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-green-600 text-white"
                                }
                              >
                                {row.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>{row.causedBy}</TableCell>
                            <TableCell>{row.result}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Award Campaign Tab */}
              <TabsContent value="award">
                <div className="space-y-4">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Tổng số chiến dịch
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                              {awardCampaignMetrics.totalCampaigns}
                            </p>
                          </div>
                          <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-yellow-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-gray-900">
                      Danh sách chiến dịch giải thưởng
                    </h3>
                  </div>

                  {/* Bảng tổng quan */}
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tên chiến dịch</TableHead>
                          <TableHead>Tên sự kiện nhận giải</TableHead>
                          <TableHead>Ngày nhận giải</TableHead>
                          <TableHead>Loại giải</TableHead>
                          <TableHead>Kết quả</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {awardCampaignStats.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {row.campaign}
                            </TableCell>
                            <TableCell>{row.eventName}</TableCell>
                            <TableCell>{row.awardDate}</TableCell>
                            <TableCell>{row.awardType}</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-600 text-white">
                                {row.result}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
