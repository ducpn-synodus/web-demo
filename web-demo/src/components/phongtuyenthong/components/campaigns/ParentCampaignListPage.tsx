import { useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface ParentCampaign {
  id: string;
  code: string;
  name: string;
  objective: string;
  startDate: string;
  endDate: string;
  budget: string;
  pic: string;
  approver: string;
  status:
    | "approved"
    | "pending"
    | "rejected"
    | "running"
    | "completed"
    | "paused";
  subCampaignsCount: number;
  createdAt: string;
}

interface ParentCampaignListPageProps {
  onCreateNew: () => void;
  onViewDetail?: (id: string) => void;
}

export default function ParentCampaignListPage({
  onCreateNew,
  onViewDetail,
}: ParentCampaignListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data
  const campaigns: ParentCampaign[] = [
    {
      id: "1",
      code: "CD20260001",
      name: "Chương trình Mua Vé Máy Bay Tết Bính Ngọ 2026",
      objective:
        "Tăng doanh số bán vé máy bay dịp Tết Bính Ngọ 2026, đạt 150,000 vé và tăng 25% doanh thu so với Tết năm trước",
      startDate: "2026-01-01",
      endDate: "2026-02-28",
      budget: "5,000,000,000",
      pic: "Nguyễn Văn A",
      approver: "Trần Thị B",
      status: "running",
      subCampaignsCount: 5,
      createdAt: "2025-12-01",
    },
    {
      id: "2",
      code: "CD20260002",
      name: "Chiến dịch Mùa hè 2026",
      objective: "Quảng bá các tuyến bay mùa hè, tăng 20% lượng khách du lịch",
      startDate: "2026-05-01",
      endDate: "2026-08-31",
      budget: "3,500,000,000",
      pic: "Lê Văn C",
      approver: "Phạm Thị D",
      status: "completed",
      subCampaignsCount: 3,
      createdAt: "2025-11-15",
    },
    {
      id: "3",
      code: "CD20260003",
      name: "Khuyến mãi Quý 1/2026",
      objective:
        "Tăng trưởng doanh thu Q1, tăng lượng đặt vé cho các tuyến nội địa",
      startDate: "2026-03-01",
      endDate: "2026-03-31",
      budget: "2,000,000,000",
      pic: "Hoàng Văn E",
      approver: "Lê Thị F",
      status: "paused",
      subCampaignsCount: 2,
      createdAt: "2025-11-20",
    },
    {
      id: "4",
      code: "CD20260004",
      name: "Quảng bá tuyến bay mới Đà Nẵng - Seoul",
      objective:
        "Ra mắt và quảng bá tuyến bay mới, đạt 80% công suất trong quý đầu",
      startDate: "2026-04-01",
      endDate: "2026-06-30",
      budget: "4,200,000,000",
      pic: "Trần Minh H",
      approver: "Nguyễn Thị K",
      status: "approved",
      subCampaignsCount: 4,
      createdAt: "2025-12-05",
    },
    {
      id: "5",
      code: "CD20260005",
      name: "Chương trình loyalty Q2/2026",
      objective:
        "Tăng tỷ lệ khách hàng thân thiết, tăng 30% giao dịch từ thành viên",
      startDate: "2026-04-15",
      endDate: "2026-06-30",
      budget: "1,800,000,000",
      pic: "Phạm Văn M",
      approver: "Đỗ Thị N",
      status: "pending",
      subCampaignsCount: 2,
      createdAt: "2025-12-10",
    },
    {
      id: "6",
      code: "CD20260006",
      name: "Sale cuối năm 2025",
      objective: "Thanh lý ghế trống, tăng doanh thu cuối năm 25%",
      startDate: "2025-11-15",
      endDate: "2025-12-31",
      budget: "2,500,000,000",
      pic: "Lê Thị P",
      approver: "Vũ Văn Q",
      status: "rejected",
      subCampaignsCount: 3,
      createdAt: "2025-10-20",
    },
  ];

  const statusOptions = [
    { value: "all", label: "Tất cả", count: campaigns.length },
    {
      value: "approved",
      label: "Đã duyệt",
      count: campaigns.filter((c) => c.status === "approved").length,
    },
    {
      value: "pending",
      label: "Chờ duyệt",
      count: campaigns.filter((c) => c.status === "pending").length,
    },
    {
      value: "rejected",
      label: "Từ chối",
      count: campaigns.filter((c) => c.status === "rejected").length,
    },
    {
      value: "running",
      label: "Đang chạy",
      count: campaigns.filter((c) => c.status === "running").length,
    },
    {
      value: "completed",
      label: "Hoàn thành",
      count: campaigns.filter((c) => c.status === "completed").length,
    },
    {
      value: "paused",
      label: "Tạm dừng",
      count: campaigns.filter((c) => c.status === "paused").length,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      approved: { label: "Đã duyệt", color: "bg-blue-600 text-white" },
      pending: { label: "Chờ duyệt", color: "bg-yellow-600 text-white" },
      rejected: { label: "Từ chối", color: "bg-red-600 text-white" },
      running: { label: "Đang chạy", color: "text-white" },
      completed: { label: "Hoàn thành", color: "bg-green-600 text-white" },
      paused: { label: "Tạm dừng", color: "bg-orange-600 text-white" },
    };

    const config = statusConfig[status] || statusConfig.running;
    return (
      <Badge
        className={`${config.color} border-0`}
        style={status === "running" ? { backgroundColor: "#006885" } : {}}
      >
        {config.label}
      </Badge>
    );
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Quản lý kế hoạch tổng
            </h1>
            <Button
              onClick={onCreateNew}
              className="gap-2"
              style={{ backgroundColor: "#006885", color: "white" }}
            >
              <Plus className="size-4" />
              Tạo mới chiến dịch
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc mã kế hoạch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setStatusFilter(status.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    statusFilter === status.value
                      ? "text-white"
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={
                    statusFilter === status.value
                      ? { backgroundColor: "#006885" }
                      : {}
                  }
                >
                  {status.label} ({status.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {filteredCampaigns.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="py-16 text-center">
              <FileText className="size-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-gray-700 mb-2">Chưa có kế hoạch nào</h3>
              <p className="text-gray-500 text-sm mb-6">
                Tạo kế hoạch tổng đầu tiên để bắt đầu quản lý chiến dịch
              </p>
              <Button
                onClick={onCreateNew}
                className="gap-2"
                style={{ backgroundColor: "#006885", color: "white" }}
              >
                <Plus className="size-4" />
                Tạo mới chiến dịch
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="border-2 border-gray-300 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{campaign.name}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        Mã: {campaign.code}
                      </p>
                      <p className="text-sm text-gray-600">
                        {campaign.objective}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetail?.(campaign.id)}
                      className="gap-2 border-gray-300"
                    >
                      <Eye className="size-4" />
                      Xem chi tiết
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Thời gian</p>
                        <p className="text-sm text-gray-700">
                          {new Date(campaign.startDate).toLocaleDateString(
                            "vi-VN"
                          )}{" "}
                          -{" "}
                          {new Date(campaign.endDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="size-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Ngân sách</p>
                        <p className="text-sm text-gray-700">
                          {campaign.budget} VNĐ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">PIC</p>
                        <p className="text-sm text-gray-700">{campaign.pic}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Kế hoạch con</p>
                        <p className="text-sm text-gray-700">
                          {campaign.subCampaignsCount} kế hoạch
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Approver Info */}
                  <div className="pt-3 border-t border-gray-200 mt-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Người duyệt</p>
                        <p className="text-sm text-gray-700">
                          {campaign.approver}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
