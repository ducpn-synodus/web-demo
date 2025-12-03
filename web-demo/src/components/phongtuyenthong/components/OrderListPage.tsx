import { useState } from "react";
import {
  Search,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card } from "./ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface OrderListPageProps {
  onViewDetail?: (orderId: string) => void;
}

export default function OrderListPage({ onViewDetail }: OrderListPageProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  // const [channelFilter, setChannelFilter] = useState("all");
  // const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");


  const channelFilter = 'all'
  const priorityFilter = 'all'
  // Mock data
  const orders = [
    {
      id: "REQ-2025-001",
      name: "Campaign Mùa Hè Tokyo",
      department: "Phòng Sản Phẩm",
      timeframe: "01/06/2025 - 30/06/2025",
      channels: ["Facebook Ads", "TikTok Ads", "PR Báo chí"],
      priority: "Cao",
      status: "Chờ duyệt",
      budget: "150,000,000",
      createdDate: "15/05/2025",
      creator: "Nguyễn Văn A",
    },
    {
      id: "REQ-2025-002",
      name: "Khuyến Mãi Seoul Festival",
      department: "Phòng Thương Mại",
      timeframe: "10/06/2025 - 20/06/2025",
      channels: ["Google Ads", "Banner Website", "Facebook Ads"],
      priority: "Cao",
      status: "Chờ duyệt",
      budget: "80,000,000",
      createdDate: "12/05/2025",
      creator: "Trần Thị B",
    },
    {
      id: "REQ-2025-003",
      name: "PR Đường bay mới Sydney",
      department: "Phòng Marketing",
      timeframe: "01/07/2025 - 31/07/2025",
      channels: ["PR Báo chí", "Banner sân bay"],
      priority: "Trung bình",
      status: "Đã duyệt",
      budget: "200,000,000",
      createdDate: "10/05/2025",
      creator: "Lê Văn C",
    },
    {
      id: "REQ-2025-004",
      name: "Flash Sale Hè Châu Âu",
      department: "Phòng Sản Phẩm",
      timeframe: "15/06/2025 - 25/06/2025",
      channels: ["Facebook Ads", "Google Ads", "TikTok Ads"],
      priority: "Cao",
      status: "Chờ duyệt",
      budget: "120,000,000",
      createdDate: "08/05/2025",
      creator: "Phạm Thị D",
    },
    {
      id: "REQ-2025-005",
      name: "Quảng bá dịch v Lounge",
      department: "Phòng Vận Hành",
      timeframe: "01/06/2025 - 30/08/2025",
      channels: ["Banner Website", "Facebook Ads"],
      priority: "Thấp",
      status: "Từ chối",
      budget: "30,000,000",
      createdDate: "05/05/2025",
      creator: "Hoàng Văn E",
    },
    {
      id: "REQ-2025-006",
      name: "Campaign Khách hàng thân thiết",
      department: "Phòng Thương Mại",
      timeframe: "01/07/2025 - 31/12/2025",
      channels: ["Email Marketing", "Banner Website", "Facebook Ads"],
      priority: "Trung bình",
      status: "Đã duyệt",
      budget: "90,000,000",
      createdDate: "20/05/2025",
      creator: "Võ Thị F",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Chờ duyệt":
        return (
          <Badge className="!bg-blue-100 !text-blue-600 hover:!bg-blue-200 !border-blue-300 border">
            Chờ duyệt
          </Badge>
        );
      case "Đã duyệt":
        return (
          <Badge className="!bg-emerald-100 !text-emerald-600 hover:!bg-emerald-200 !border-emerald-300 border">
            Đã duyệt
          </Badge>
        );
      case "Từ chối":
        return (
          <Badge className="!bg-rose-100 !text-rose-600 hover:!bg-rose-200 !border-rose-300 border">
            Từ chối
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // const getPriorityBadge = (priority: string) => {
  //   switch (priority) {
  //     case 'Cao':
  //       return <Badge variant="destructive">Cao</Badge>;
  //     case 'Trung bình':
  //       return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Trung bình</Badge>;
  //     case 'Thấp':
  //       return <Badge variant="outline">Thấp</Badge>;
  //     default:
  //       return <Badge>{priority}</Badge>;
  //   }
  // };

  // const handleReset = () => {
  //   setStatusFilter('all');
  //   setDepartmentFilter('all');
  //   setChannelFilter('all');
  //   setPriorityFilter('all');
  //   setSearchQuery('');
  // };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || order.department === departmentFilter;
    const matchesChannel =
      channelFilter === "all" || order.channels.includes(channelFilter);
    const matchesPriority =
      priorityFilter === "all" || order.priority === priorityFilter;
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesStatus &&
      matchesDepartment &&
      matchesChannel &&
      matchesPriority &&
      matchesSearch
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-6">
          <h1
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Danh sách yêu cầu truyền thông
          </h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg w-80">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                placeholder="Tìm kiếm theo mã, tên yêu cầu..."
                className="bg-transparent border-none outline-none text-sm flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>

            {/* Department Filter */}
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Phòng ban" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả phòng ban</SelectItem>
                <SelectItem value="product">Phòng Sản Phẩm</SelectItem>
                <SelectItem value="commercial">Phòng Thương Mại</SelectItem>
                <SelectItem value="marketing">Phòng Marketing</SelectItem>
                <SelectItem value="operations">Phòng Vận Hành</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {/* Tổng yêu cầu */}
          <div className="bg-white border border-gray-300 rounded-lg p-2">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Tổng yêu cầu
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(0, 104, 133, 0.1)" }}
              >
                <FileText className="w-4 h-4 text-[#006885]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-gray-600"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                6
              </span>
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                <span className="text-[#006885]">+2</span> tháng này
              </span>
            </div>
          </div>

          {/* Chờ duyệt */}
          <div className="bg-white border border-amber-300 rounded-lg p-2">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Chờ duyệt
              </span>
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-gray-600"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                2
              </span>
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Đang xử lý
              </span>
            </div>
          </div>

          {/* Đã duyệt */}
          <div className="bg-white border border-emerald-300 rounded-lg p-2">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Đã duyệt
              </span>
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-gray-600"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                2
              </span>
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Hoàn thành
              </span>
            </div>
          </div>

          {/* Từ chối */}
          <div className="bg-white border border-rose-300 rounded-lg p-2">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Từ chối
              </span>
              <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-gray-600"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                1
              </span>
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-xs)" }}
              >
                Không phê duyệt
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <Card>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã yêu cầu</TableHead>
                  <TableHead>Tên yêu cầu</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Kênh truyền thông</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Người tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div
                        className="font-mono text-blue-600"
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        {order.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="text-gray-600"
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        {order.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="text-gray-600"
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        {order.department}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="text-gray-700"
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        {order.createdDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {order.channels.slice(0, 2).map((channel, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            style={{ fontSize: "var(--text-xs)" }}
                          >
                            {channel}
                          </Badge>
                        ))}
                        {order.channels.length > 2 && (
                          <Badge
                            variant="outline"
                            style={{ fontSize: "var(--text-xs)" }}
                          >
                            +{order.channels.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="text-gray-700 whitespace-nowrap"
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        {order.timeframe}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="text-gray-700"
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        {order.creator}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetail?.(order.id)}
                        className="h-10 w-10 p-0 hover:bg-gray-100"
                      >
                        <Eye className="w-6 h-6 text-gray-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
