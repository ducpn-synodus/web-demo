import { useState, useRef } from "react";
import {
  ArrowLeft,
  Download,
  Send,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
import BudgetAllocationEditor from "./BudgetAllocationEditor";
import TimelineEditor from "./TimelineEditor";

interface OrderDetailPageProps {
  onBack?: () => void;
}

export default function OrderDetailPage({ onBack }: OrderDetailPageProps) {
  const parseNumber = (str: string) => {
    return parseInt(str.replace(/,/g, "")) || 0;
  };

  const orderData = {
    id: "REQ-2025-001",
    name: "Campaign Mùa Hè Tokyo",
    department: "Phòng Sản Phẩm",
    creator: "Nguyễn Văn A",
    createdDate: "15/05/2025",
    priority: "Cao",
    status: "Chờ duyệt",
    requestedBudget: "150,000,000",
    approvedBudget: "120,000,000",
    budgetDifference: "-20%",
    budgetApprover: "Trần Văn C - Giám đốc Marketing",
    budgetApprovedDate: "16/05/2025",
    product: "Vé máy bay nội địa & quốc tế",
    timeframe: { from: "01/06/2025", to: "30/06/2025", duration: "30 ngày" },
    markets: [
      { name: "Nội địa", priority: "Cao", description: "VN - Toàn quốc" },
      {
        name: "Đông Bắc Á",
        priority: "Cao",
        description: "Hàn Quốc, Trung Quốc",
      },
      { name: "Nhật Bản", priority: "Trung bình", description: "Tokyo, Osaka" },
      {
        name: "Đông Nam Á",
        priority: "Thấp",
        description: "Thailand, Singapore",
      },
    ],
    kpi: {
      impression: "5,000,000",
      engagement: "250,000",
      conversion: "10,000",
      traffic: "500,000",
      revenue: "5,000,000,000",
    },
    requestedChannels: [
      {
        name: "Facebook Ads",
        priority: "Cao",
        budget: "50,000,000",
        status: "Đã duyệt",
        note: "Chạy 10 ngày",
      },
      {
        name: "TikTok Ads",
        priority: "Cao",
        budget: "30,000,000",
        status: "Đã duyệt",
        note: "Chạy 7 ngày",
      },
      {
        name: "PR Báo chí",
        priority: "Trung bình",
        budget: "25,000,000",
        status: "Đã duyệt",
        note: "3 bài báo Tier 2",
      },
      {
        name: "Google Ads",
        priority: "Thấp",
        budget: "0",
        status: "Từ chối",
        note: "Không phù hợp mục tiêu",
      },
      {
        name: "Banner Website",
        priority: "Trung bình",
        budget: "15,000,000",
        status: "Đã duyệt",
        note: "1 vị trí/2 tuần",
      },
    ],
    attachments: [
      {
        name: "Brief_Campaign_Tokyo.pdf",
        size: "2.3 MB",
        uploadDate: "15/05/2025",
      },
      { name: "Product_Images.zip", size: "15.7 MB", uploadDate: "15/05/2025" },
      {
        name: "Target_Audience.xlsx",
        size: "890 KB",
        uploadDate: "16/05/2025",
      },
    ],
    budgetAllocation: [
      { channel: "Facebook Ads", amount: "50,000,000", percentage: "42%" },
      { channel: "TikTok Ads", amount: "30,000,000", percentage: "25%" },
      { channel: "PR Báo chí", amount: "25,000,000", percentage: "21%" },
      { channel: "Banner Website", amount: "15,000,000", percentage: "12%" },
    ],
    approvalHistory: [
      {
        time: "15/05/2025 10:20",
        user: "Nguyễn Văn A",
        action: "Tạo yêu cầu",
        detail: "Gửi yêu cầu truyền thông mới",
        role: "Product Manager",
      },
      {
        time: "15/05/2025 14:30",
        user: "Trần Thị B",
        action: "Tiếp nhận",
        detail: "Đã tiếp nhận và bắt đầu xem xét",
        role: "Marketing Specialist",
      },
      {
        time: "16/05/2025 09:15",
        user: "Trần Văn C",
        action: "Phê duyệt ngân sách",
        detail: "Phê duyệt ngân sách 120,000,000 ₫",
        role: "Marketing Director",
      },
      {
        time: "16/05/2025 10:45",
        user: "Trần Thị B",
        action: "Yêu cầu bổ sung",
        detail: "Cần bổ sung thông tin về target audience",
        role: "Marketing Specialist",
      },
    ],
    timeline: [
      {
        phase: "Chuẩn bị nội dung",
        start: "01/06/2025",
        end: "05/06/2025",
        status: "Chưa bắt đầu",
      },
      {
        phase: "Triển khai Facebook Ads",
        start: "06/06/2025",
        end: "15/06/2025",
        status: "Chưa bắt đầu",
      },
      {
        phase: "Triển khai TikTok Ads",
        start: "10/06/2025",
        end: "17/06/2025",
        status: "Chưa bắt đầu",
      },
      {
        phase: "PR Báo chí",
        start: "08/06/2025",
        end: "12/06/2025",
        status: "Chưa bắt đầu",
      },
      {
        phase: "Đánh giá & Báo cáo",
        start: "20/06/2025",
        end: "30/06/2025",
        status: "Chưa bắt đầu",
      },
    ],
    comments: [
      {
        id: 1,
        user: "Trần Thị B",
        role: "Marketing Specialist",
        message:
          "Yêu cầu này cần bổ sung thêm thông tin về target audience chi tiết hơn.",
        time: "16/05/2025 10:45",
      },
      {
        id: 2,
        user: "Nguyễn Văn A",
        role: "Product Manager",
        message:
          "Đã cập nhật file Brief mới với thông tin chi tiết về target audience. Vui lòng kiểm tra lại.",
        time: "16/05/2025 14:20",
      },
    ],
  };

  const [currentStatus, setCurrentStatus] = useState(orderData.status);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [comment, setComment] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  // Budget allocation states
  const [budgetAllocations, setBudgetAllocations] = useState(
    orderData.budgetAllocation.map((item) => ({
      channel: item.channel,
      amount: parseNumber(item.amount),
    }))
  );

  // Editable fields for communication team
  const [communicationGoal, setCommunicationGoal] = useState("");
  const [kpiImpression, setKpiImpression] = useState("");
  const [kpiEngagement, setKpiEngagement] = useState("");
  const [kpiConversion, setKpiConversion] = useState("");
  const [kpiTraffic, setKpiTraffic] = useState("");
  const [kpiRevenue, setKpiRevenue] = useState("");
  const [markets, setMarkets] = useState<
    Array<{ name: string; priority: string; description: string }>
  >([]);

  // Timeline states
  const [timelinePhases, setTimelinePhases] = useState<
    Array<{ phase: string; start: string; end: string; status: string }>
  >([]);

  // Documents upload
  const [uploadedDocuments, setUploadedDocuments] = useState<
    Array<{ name: string; size: string; uploadDate: string }>
  >([]);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendResult = () => {
    if (!resultMessage.trim()) {
      toast.error("Vui lòng nhập nội dung kết quả!");
      return;
    }
    toast.success("Đã gửi kết quả về phòng ban!");
    setShowResultDialog(false);
    setResultMessage("");
  };

  const handleApprove = () => {
    // Phê duyệt thành công
    setIsApproved(true);
    setCurrentStatus("Đã duyệt");
    toast.success("Phê duyệt thành công! Kết quả đã được gửi về phòng ban.");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const today = new Date().toLocaleDateString("vi-VN");
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      uploadDate: today,
    }));

    setUploadedDocuments([...uploadedDocuments, ...newFiles]);
    toast.success(`Đã upload ${newFiles.length} file thành công!`);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getCurrentStepIndex = () => {
    if (currentStatus === "Chờ duyệt") return 1;
    if (currentStatus === "Đã duyệt") return 2;
    if (currentStatus === "Từ chối") return 1;
    if (currentStatus === "Cần bổ sung") return 1;
    return 0;
  };

  const steps = [
    { label: "Đã gửi", icon: Send },
    { label: "Chờ duyệt", icon: Clock },
    { label: "Hoàn thành", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Only Back Button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Campaign Title Card */}
        <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-gray-500"
                style={{ fontSize: "var(--text-sm)" }}
              >
                {orderData.id}
              </span>
              <div className="h-4 w-px bg-gray-300" />
              <h1
                className="text-gray-700"
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                {orderData.name}
              </h1>
            </div>
            <Badge
              className={
                currentStatus === "Chờ duyệt"
                  ? "!bg-blue-100 !text-blue-600 border-blue-300 border"
                  : currentStatus === "Đã duyệt"
                  ? "!bg-emerald-100 !text-emerald-600 border-emerald-300 border"
                  : currentStatus === "Từ chối"
                  ? "!bg-rose-100 !text-rose-600 border-rose-300 border"
                  : "bg-gray-100 text-gray-700"
              }
            >
              {currentStatus}
            </Badge>
          </div>
        </div>

        {/* Approval Progress - Full Width */}
        <div className="bg-white rounded-lg border border-gray-300 p-3 mb-4">
          <div className="grid grid-cols-[200px,1fr] gap-4 items-center">
            <div
              className="text-gray-600"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              TIẾN TRÌNH PHÊ DUYỆT
            </div>
            <div className="flex items-center">
              {steps.map((step, index) => {
                const isCompleted = index < getCurrentStepIndex();
                const isCurrent = index === getCurrentStepIndex();

                return (
                  <div key={index} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted
                            ? "border-[#006885] bg-[#006885]"
                            : isCurrent
                            ? "border-[#006885] bg-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <step.icon
                          className={`w-4 h-4 ${
                            isCompleted
                              ? "text-white"
                              : isCurrent
                              ? "text-[#006885]"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div
                        className={`mt-1.5 ${
                          isCompleted || isCurrent
                            ? "text-gray-700"
                            : "text-gray-500"
                        }`}
                        style={{
                          fontSize: "var(--text-xs)",
                          fontWeight:
                            isCompleted || isCurrent
                              ? "var(--font-weight-medium)"
                              : "normal",
                        }}
                      >
                        {step.label}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 ${
                          isCompleted ? "bg-[#006885]" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* TOP LEFT - Thông tin chung */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <div
              className="text-gray-600 mb-2"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              THÔNG TIN CHUNG
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Mã yêu cầu
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.id}
                </div>
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Phòng ban
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.department}
                </div>
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Người tạo
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.creator}
                </div>
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Ngày tạo
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.createdDate}
                </div>
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Mức độ ưu tiên
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.priority}
                </div>
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Sản phẩm/Dịch vụ
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.product}
                </div>
              </div>
            </div>

            {/* Thời gian triển khai */}
            <div
              className="text-gray-600 mt-3 mb-2"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              THỜI GIAN TRIỂN KHAI
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Ngày bắt đầu
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.timeframe.from}
                </div>
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Ngày kết thúc
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.timeframe.to}
                </div>
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-0.5"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Tổng thời gian
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {orderData.timeframe.duration}
                </div>
              </div>
            </div>

            {/* Mô tả chiến dịch */}
            <div
              className="text-gray-600 mt-3 mb-2"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              MÔ TẢ CHIẾN DỊCH
            </div>
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              <p
                className="text-gray-600"
                style={{ fontSize: "var(--text-sm)", lineHeight: "1.5" }}
              >
                Campaign nhằm quảng bá các tuyến bay đến Tokyo trong mùa hè
                2025, tập trung vào phân khúc khách hàng trẻ tuổi (25-40 tuổi)
                yêu thích du lịch khám phá. Chiến dịch sẽ tận dụng xu hướng du
                lịch hè và mùa lễ hội tại Nhật Bản, kết hợp với các ưu đãi vé
                máy bay hấp dẫn. Mục tiêu chính là tăng nhận diện thương hiệu
                Vietnam Airlines tại thị trường nội địa và khu vực Đông Nam Á,
                đồng thời thúc đẩy doanh số bán vé cho tuyến bay Việt Nam -
                Tokyo.
              </p>
            </div>
          </div>

          {/* TOP RIGHT - Ngân sách */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <div
              className="text-gray-600 mb-3"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              NGÂN SÁCH
            </div>

            {/* Phân bổ - Editable */}
            <BudgetAllocationEditor
              initialAllocations={budgetAllocations}
              approvedBudget={parseNumber(orderData.approvedBudget)}
              onSave={(newAllocations) => {
                setBudgetAllocations(newAllocations);
                console.log("Updated budget allocations:", newAllocations);
              }}
            />
          </div>

          {/* BOTTOM LEFT - Mục tiêu chiến dịch */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <div
              className="text-gray-600 mb-3"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              MỤC TIÊU TRUYỀN THÔNG TỔNG QUÁT
            </div>
            <Textarea
              placeholder="Nhập mục tiêu truyền thông tổng quát của chiến dịch..."
              value={communicationGoal}
              onChange={(e) => setCommunicationGoal(e.target.value)}
              rows={4}
              className="border-gray-300 mb-4"
            />

            <div
              className="text-gray-600 mb-3"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              MỤC TIÊU CHIẾN DỊCH (KPI)
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-1"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Impression
                </div>
                <Input
                  type="text"
                  placeholder="Nhập số lượng"
                  value={kpiImpression}
                  onChange={(e) => setKpiImpression(e.target.value)}
                  className="border-gray-300 h-8"
                  style={{ fontSize: "var(--text-sm)" }}
                />
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-1"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Engagement
                </div>
                <Input
                  type="text"
                  placeholder="Nhập số lượng"
                  value={kpiEngagement}
                  onChange={(e) => setKpiEngagement(e.target.value)}
                  className="border-gray-300 h-8"
                  style={{ fontSize: "var(--text-sm)" }}
                />
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-1"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Conversion
                </div>
                <Input
                  type="text"
                  placeholder="Nhập số lượng"
                  value={kpiConversion}
                  onChange={(e) => setKpiConversion(e.target.value)}
                  className="border-gray-300 h-8"
                  style={{ fontSize: "var(--text-sm)" }}
                />
              </div>
              <div className="border border-gray-300 rounded p-2">
                <div
                  className="text-gray-500 mb-1"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Traffic
                </div>
                <Input
                  type="text"
                  placeholder="Nhập số lượng"
                  value={kpiTraffic}
                  onChange={(e) => setKpiTraffic(e.target.value)}
                  className="border-gray-300 h-8"
                  style={{ fontSize: "var(--text-sm)" }}
                />
              </div>
              <div className="border border-gray-300 rounded p-2 col-span-2">
                <div
                  className="text-gray-500 mb-1"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Revenue (₫)
                </div>
                <Input
                  type="text"
                  placeholder="Nhập doanh thu"
                  value={kpiRevenue}
                  onChange={(e) => setKpiRevenue(e.target.value)}
                  className="border-gray-300 h-8"
                  style={{ fontSize: "var(--text-sm)" }}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT - Thị trường & Kênh */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <div className="flex items-center justify-between mb-3">
              <div
                className="text-gray-600"
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                THỊ TRƯỜNG MỤC TIÊU
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setMarkets([
                    ...markets,
                    { name: "", priority: "Trung bình", description: "" },
                  ])
                }
                className="text-gray-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Thêm
              </Button>
            </div>

            {markets.length === 0 ? (
              <div
                className="border border-gray-300 rounded p-3 text-center text-gray-500"
                style={{ fontSize: "var(--text-sm)" }}
              >
                Chưa có thị trường mục tiêu. Nhấn "Thêm" để thêm mới.
              </div>
            ) : (
              <div className="space-y-2">
                {markets.map((market, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded p-2 flex items-center gap-2"
                  >
                    <Input
                      type="text"
                      placeholder="Tên thị trường"
                      value={market.name}
                      onChange={(e) => {
                        const newMarkets = [...markets];
                        newMarkets[index].name = e.target.value;
                        setMarkets(newMarkets);
                      }}
                      className="border-gray-300 h-8 flex-1"
                      style={{ fontSize: "var(--text-sm)" }}
                    />
                    <select
                      value={market.priority}
                      onChange={(e) => {
                        const newMarkets = [...markets];
                        newMarkets[index].priority = e.target.value;
                        setMarkets(newMarkets);
                      }}
                      className="border border-gray-300 rounded px-2 h-8 text-gray-700"
                      style={{ fontSize: "var(--text-xs)", width: "120px" }}
                    >
                      <option value="Cao">Cao</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Thấp">Thấp</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setMarkets(markets.filter((_, i) => i !== index))
                      }
                      className="text-rose-600 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections - Full Width */}
        <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4 mt-4">
          {/* Tài liệu từ phòng ban */}
          <div
            className="text-gray-700 mb-3"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            TÀI LIỆU TỪ PHÒNG BAN
          </div>
          <table className="w-full mb-4" style={{ fontSize: "var(--text-sm)" }}>
            <tbody>
              {orderData.attachments.map((file, index) => (
                <tr
                  key={index}
                  className={
                    index !== orderData.attachments.length - 1 ? "border-b" : ""
                  }
                >
                  <td className="py-2 text-gray-700">{file.name}</td>
                  <td
                    className="py-2 text-gray-500"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    {file.size}
                  </td>
                  <td
                    className="py-2 text-gray-500"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    {file.uploadDate}
                  </td>
                  <td className="py-2 text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tài liệu phòng truyền thông */}
          <div className="flex items-center justify-between mb-3">
            <div
              className="text-gray-700"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              TÀI LIỆU PHÒNG TRUYỀN THÔNG
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Upload
            </Button>
          </div>
          {uploadedDocuments.length === 0 ? (
            <div
              className="border border-gray-300 rounded p-3 text-center text-gray-500"
              style={{ fontSize: "var(--text-sm)" }}
            >
              Chưa có tài liệu. Nhấn "Upload" để tải lên.
            </div>
          ) : (
            <table className="w-full" style={{ fontSize: "var(--text-sm)" }}>
              <tbody>
                {uploadedDocuments.map((file, index) => (
                  <tr
                    key={index}
                    className={
                      index !== uploadedDocuments.length - 1 ? "border-b" : ""
                    }
                  >
                    <td className="py-2 text-gray-700">{file.name}</td>
                    <td
                      className="py-2 text-gray-500"
                      style={{ fontSize: "var(--text-xs)" }}
                    >
                      {file.size}
                    </td>
                    <td
                      className="py-2 text-gray-500"
                      style={{ fontSize: "var(--text-xs)" }}
                    >
                      {file.uploadDate}
                    </td>
                    <td className="py-2 text-right flex gap-1 justify-end">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setUploadedDocuments(
                            uploadedDocuments.filter((_, i) => i !== index)
                          )
                        }
                        className="text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
          {/* Timeline triển khai */}
          <div
            className="text-gray-700 mb-3"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            TIMELINE TRIỂN KHAI
          </div>
          <TimelineEditor
            initialPhases={timelinePhases}
            onSave={(newPhases) => {
              setTimelinePhases(newPhases);
              console.log("Updated timeline:", newPhases);
            }}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
          {/* Phản hồi nội bộ */}
          <div
            className="text-gray-700 mb-3"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            PHẢN HỒI NỘI BỘ
          </div>

          <div className="space-y-2 mb-3">
            {orderData.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-l-2 border-gray-300 pl-3 py-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-gray-700"
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    {comment.user}
                  </span>
                  <span
                    className="text-gray-500"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    • {comment.role}
                  </span>
                  <span
                    className="text-gray-400"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    • {comment.time}
                  </span>
                </div>
                <p
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {comment.message}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="Nhập phản hồi..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className="border-gray-300"
            />
            <Button variant="outline" className="border-gray-300">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
          {/* Lịch sử phê duyệt */}
          <div
            className="text-gray-700 mb-2"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            LỊCH SỬ PHÊ DUYỆT
          </div>
          <div className="space-y-1.5">
            {orderData.approvalHistory.map((history, index) => (
              <div
                key={index}
                className="border-l-2 border-gray-300 pl-3 py-1.5"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-gray-700"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {history.user}
                    </span>
                    <span
                      className="text-gray-500"
                      style={{ fontSize: "var(--text-xs)" }}
                    >
                      • {history.role}
                    </span>
                  </div>
                  <span
                    className="text-gray-400"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    {history.time}
                  </span>
                </div>
                <div
                  className="text-gray-700"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {history.action}
                </div>
                <div
                  className="text-gray-600"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  {history.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 11. Button phê duyệt */}
        {!isApproved &&
          (currentStatus === "Chờ duyệt" ||
            currentStatus === "Cần bổ sung") && (
            <div className="p-4">
              <div className="flex justify-end">
                <Button variant="primary" size="sm" onClick={handleApprove}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Phê duyệt
                </Button>
              </div>
            </div>
          )}

        {/* Thông báo đã phê duyệt */}
        {isApproved && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <div>
                <div
                  className="text-emerald-700"
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-weight-semibold)",
                  }}
                >
                  Đã phê duyệt chiến dịch
                </div>
                <div
                  className="text-emerald-600"
                  style={{ fontSize: "var(--text-xs)" }}
                >
                  Kết quả đã được gửi về phòng ban thành công
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gửi kết quả về phòng ban</DialogTitle>
            <DialogDescription>
              Nhập nội dung kết quả để gửi về phòng ban đã tạo yêu cầu này.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Nhập nội dung kết quả phê duyệt..."
              value={resultMessage}
              onChange={(e) => setResultMessage(e.target.value)}
              rows={6}
              className="border-gray-300"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowResultDialog(false);
                setResultMessage("");
              }}
            >
              Huỷ
            </Button>
            <Button variant="primary" onClick={handleSendResult}>
              <Send className="w-4 h-4 mr-2" />
              Gửi kết quả
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
