import { ArrowLeft, Download, Send, FileText, Calendar, User, Building2, Package, DollarSign, CheckCircle, AlertCircle, Eye, Edit, TrendingUp, Clock, Image, Link as LinkIcon, File, MessageSquare, History, Briefcase, Shield, FileCheck } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';

interface ReportSlot {
  id: string;
  code: string;
  name: string;
  channel: string;
  kpiCommitted: string;
  kpiActual: string;
  achievement: number;
  cost: string;
  actualCost: string;
  evidenceLinks: string[];
  evidenceImages: number;
  evidenceFiles: number;
  timeline: string;
  completedDate: string;
}

interface AcceptanceReportDetailProps {
  reportId: string;
  onBack?: () => void;
  onEdit?: () => void;
  onSubmit?: () => void;
  onDownloadPDF?: () => void;
}

export default function AcceptanceReportDetail({ reportId, onBack, onEdit, onSubmit, onDownloadPDF }: AcceptanceReportDetailProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'evidence' | 'history'>('preview');

  const report = {
    id: reportId,
    code: 'NT-001',
    name: 'Đợt 1 - Giai đoạn đầu',
    status: 'draft' as 'draft' | 'submitted' | 'approved' | 'returned',
    createdDate: '10/01/2025',
    createdBy: 'Trần Thị B',
    submittedDate: null,
    approvedDate: null,
    approvedBy: null,
    returnedDate: null,
    returnReason: null,
    campaign: {
      code: 'CP-2025-001',
      name: 'Chiến dịch Tết Nguyên Đán 2025',
      startDate: '01/01/2025',
      endDate: '15/02/2025',
      picName: 'Nguyễn Văn A',
      picEmail: 'nguyenvana@vietnamairlines.com',
      picPhone: '0901234567',
      department: 'Phòng Marketing'
    },
    vendor: {
      name: 'PR Agency Vietnam Co., Ltd',
      taxCode: '0123456789',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      representative: 'Trần Thị B',
      position: 'Giám đốc',
      phone: '0901234567',
      email: 'contact@pragency.vn',
      bankName: 'Vietcombank - Chi nhánh TP.HCM',
      bankAccount: '0123456789',
      bankAccountName: 'CÔNG TY TNHH PR AGENCY VIETNAM'
    },
    slots: [
      {
        id: '1',
        code: 'PR-001',
        name: 'PR – VNExpress',
        channel: 'PR',
        kpiCommitted: '1 bài đăng',
        kpiActual: '1 bài đăng - 15.2K views',
        achievement: 152,
        cost: '15,000,000',
        actualCost: '15,000,000',
        evidenceLinks: [
          'https://vnexpress.net/vietnam-airlines-tet-2025.html',
          'https://vnexpress.net/vietnam-airlines-promotion.html'
        ],
        evidenceImages: 5,
        evidenceFiles: 2,
        timeline: '05/01/2025 - 10/01/2025',
        completedDate: '10/01/2025'
      },
      {
        id: '2',
        code: 'PR-003',
        name: 'PR – Dân Trí',
        channel: 'PR',
        kpiCommitted: '1 bài đăng + PR native',
        kpiActual: '1 bài đăng - 22.5K views + Video interview',
        achievement: 225,
        cost: '18,500,000',
        actualCost: '18,500,000',
        evidenceLinks: ['https://dantri.com.vn/vietnam-airlines-tet.html'],
        evidenceImages: 8,
        evidenceFiles: 3,
        timeline: '01/01/2025 - 07/01/2025',
        completedDate: '07/01/2025'
      },
      {
        id: '3',
        code: 'PR-004',
        name: 'PR – Thanh Niên',
        channel: 'PR',
        kpiCommitted: '1 bài đăng + Interview',
        kpiActual: '1 bài đăng - 18K views + Video interview',
        achievement: 180,
        cost: '20,000,000',
        actualCost: '20,000,000',
        evidenceLinks: ['https://thanhnien.vn/vietnam-airlines-business-class.html'],
        evidenceImages: 6,
        evidenceFiles: 2,
        timeline: '08/01/2025 - 12/01/2025',
        completedDate: '12/01/2025'
      }
    ] as ReportSlot[],
    totalCost: '53,500,000',
    totalActualCost: '53,500,000',
    totalBudget: '60,000,000',
    budgetSaved: '6,500,000',
    note: 'Hoàn thành đúng tiến độ, chất lượng bài viết tốt, tương tác cao. Tất cả các slot đều vượt KPI cam kết.',
    attachments: [
      { name: 'Bao_cao_tong_hop.pdf', size: '2.5 MB', type: 'pdf' },
      { name: 'Bang_doi_soat.xlsx', size: '1.2 MB', type: 'excel' }
    ],
    history: [
      {
        date: '10/01/2025 14:30',
        action: 'Tạo biên bản',
        user: 'Trần Thị B',
        details: 'Tạo đợt nghiệm thu với 3 slot'
      },
      {
        date: '10/01/2025 15:45',
        action: 'Cập nhật',
        user: 'Trần Thị B',
        details: 'Thêm ghi chú và file đính kèm'
      }
    ]
  };

  const getStatusBadge = (status: typeof report.status) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <FileText className="w-4 h-4" />
            Bản nháp
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <Send className="w-4 h-4" />
            Đã gửi
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <CheckCircle className="w-4 h-4" />
            Đã phê duyệt
          </span>
        );
      case 'returned':
        return (
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <AlertCircle className="w-4 h-4" />
            Yêu cầu bổ sung
          </span>
        );
    }
  };

  const totalAchievement = Math.round(
    report.slots.reduce((sum, slot) => sum + slot.achievement, 0) / report.slots.length
  );

  const totalEvidence = {
    links: report.slots.reduce((sum, slot) => sum + slot.evidenceLinks.length, 0),
    images: report.slots.reduce((sum, slot) => sum + slot.evidenceImages, 0),
    files: report.slots.reduce((sum, slot) => sum + slot.evidenceFiles, 0)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-gray-900">Biên bản nghiệm thu {report.code}</h1>
            {getStatusBadge(report.status)}
          </div>
          <p className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
            {report.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {report.status === 'draft' && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </button>
          )}
          {(report.status === 'approved' || report.status === 'submitted') && (
            <button
              onClick={onDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <Download className="w-4 h-4" />
              Tải PDF
            </button>
          )}
          {report.status === 'draft' && (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <Send className="w-4 h-4" />
              Gửi phê duyệt
            </button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Số slot</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                {report.slots.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>KPI TB</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                {totalAchievement}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Giá trị</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                {report.totalCost}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Minh chứng</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                {totalEvidence.images} ảnh
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>Ngày tạo</p>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                {report.createdDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Xem trước biên bản
              </div>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'evidence'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Minh chứng ({totalEvidence.images + totalEvidence.files + totalEvidence.links})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Lịch sử
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg px-8 py-4 -mx-8 -mt-8 mb-8">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <h2 className="text-white mb-1">BIÊN BẢN NGHIỆM THU</h2>
                    <p className="text-white/90" style={{ fontSize: 'var(--text-lg)' }}>
                      CHIẾN DỊCH TRUYỀN THÔNG
                    </p>
                    <p className="text-white/80 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                      VIETNAM AIRLINES CORPORATION
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-3 gap-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Số biên bản:
                  </p>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {report.code}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Ngày lập:
                  </p>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {report.createdDate}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                    Người lập:
                  </p>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {report.createdBy}
                  </p>
                </div>
              </div>

              {/* Campaign Info */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  I. THÔNG TIN CHIẾN DỊCH
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        Mã chiến dịch:
                      </p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {report.campaign.code}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        Thời gian triển khai:
                      </p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {report.campaign.startDate} - {report.campaign.endDate}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                      Tên chiến dịch:
                    </p>
                    <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {report.campaign.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                      Người phụ trách (VNA):
                    </p>
                    <div className="flex items-center gap-6">
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {report.campaign.picName} - {report.campaign.department}
                      </p>
                      <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                        {report.campaign.picEmail} | {report.campaign.picPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor Info */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-600" />
                  II. THÔNG TIN BÊN THỰC HIỆN (VENDOR)
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        Tên công ty:
                      </p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {report.vendor.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        Mã số thuế:
                      </p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {report.vendor.taxCode}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                      Địa chỉ:
                    </p>
                    <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                      {report.vendor.address}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        Người đại diện:
                      </p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {report.vendor.representative} - {report.vendor.position}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        Liên hệ:
                      </p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                        {report.vendor.phone} | {report.vendor.email}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-500 mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                      Thông tin thanh toán:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Ngân hàng:</p>
                        <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                          {report.vendor.bankName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Số tài khoản:</p>
                        <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                          {report.vendor.bankAccount}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>Chủ tài khoản:</p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        {report.vendor.bankAccountName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slots Detail Table */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-teal-600" />
                  III. CHI TIẾT CÁC SLOT NGHIỆM THU
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto hide-scrollbar">
                    <table className="w-full">
                      <thead className="bg-teal-600 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            STT
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Mã Slot
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Tên Slot / Kênh
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            KPI Cam kết
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            KPI Thực tế
                          </th>
                          <th className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Đạt được
                          </th>
                          <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Timeline
                          </th>
                          <th className="px-4 py-3 text-right" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Giá trị (VNĐ)
                          </th>
                          <th className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                            Minh chứng
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {report.slots.map((slot, index) => (
                          <tr key={slot.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-gray-900 text-center" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {index + 1}
                            </td>
                            <td className="px-4 py-4 text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                              {slot.code}
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                {slot.name}
                              </p>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded" style={{ fontSize: 'var(--text-xs)' }}>
                                {slot.channel}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                              {slot.kpiCommitted}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                  {slot.kpiActual}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${slot.achievement >= 100 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                                {slot.achievement >= 100 ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                {slot.achievement}%
                              </span>
                            </td>
                            <td className="px-4 py-4 text-gray-700" style={{ fontSize: 'var(--text-xs)' }}>
                              <div>
                                <p>{slot.timeline}</p>
                                <p className="text-gray-500 mt-0.5">Hoàn thành: {slot.completedDate}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                              {slot.actualCost}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center gap-3">
                                <div className="text-center">
                                  <LinkIcon className="w-4 h-4 text-blue-600 mx-auto" />
                                  <p className="text-gray-600 mt-0.5" style={{ fontSize: 'var(--text-xs)' }}>{slot.evidenceLinks.length}</p>
                                </div>
                                <div className="text-center">
                                  <Image className="w-4 h-4 text-purple-600 mx-auto" />
                                  <p className="text-gray-600 mt-0.5" style={{ fontSize: 'var(--text-xs)' }}>{slot.evidenceImages}</p>
                                </div>
                                <div className="text-center">
                                  <File className="w-4 h-4 text-orange-600 mx-auto" />
                                  <p className="text-gray-600 mt-0.5" style={{ fontSize: 'var(--text-xs)' }}>{slot.evidenceFiles}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                        <tr>
                          <td colSpan={7} className="px-4 py-4 text-right text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                            TỔNG CỘNG:
                          </td>
                          <td className="px-4 py-4 text-right text-teal-600" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)' }}>
                            {report.totalActualCost}
                          </td>
                          <td className="px-4 py-4"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* Budget Summary */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-teal-600" />
                  IV. TỔNG KẾT NGÂN SÁCH
                </h3>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-gray-600 mb-2" style={{ fontSize: 'var(--text-sm)' }}>Ngân sách phân bổ:</p>
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {report.totalBudget} VNĐ
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2" style={{ fontSize: 'var(--text-sm)' }}>Chi phí thực tế:</p>
                      <p className="text-teal-600" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {report.totalActualCost} VNĐ
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2" style={{ fontSize: 'var(--text-sm)' }}>Tiết kiệm:</p>
                      <p className="text-green-600" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {report.budgetSaved} VNĐ
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-teal-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>Tỷ lệ sử dụng ngân sách:</span>
                      <span className="text-teal-700" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        89.2%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full" style={{ width: '89.2%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              {report.note && (
                <div>
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-teal-600" />
                    V. GHI CHÚ & ĐÁNH GIÁ
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                      {report.note}
                    </p>
                  </div>
                </div>
              )}

              {/* Signatures */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-teal-600" />
                  VI. XÁC NHẬN
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                      <p className="text-gray-900 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        ĐẠI DIỆN BÊN THỰC HIỆN
                      </p>
                      <p className="text-gray-600 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        (Ký, ghi rõ họ tên)
                      </p>
                      <div className="h-24 flex items-center justify-center">
                        {report.status === 'draft' ? (
                          <p className="text-gray-400 italic" style={{ fontSize: 'var(--text-sm)' }}>
                            Chờ ký
                          </p>
                        ) : (
                          <div className="text-center">
                            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                              {report.vendor.representative}
                            </p>
                            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
                              {report.createdDate}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                      <p className="text-gray-900 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                        ĐẠI DIỆN VIETNAM AIRLINES
                      </p>
                      <p className="text-gray-600 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        (Ký, ghi rõ họ tên)
                      </p>
                      <div className="h-24 flex items-center justify-center">
                        {report.status === 'approved' ? (
                          <div className="text-center">
                            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                              {report.campaign.picName}
                            </p>
                            <p className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
                              {report.approvedDate}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-400 italic" style={{ fontSize: 'var(--text-sm)' }}>
                            Chờ phê duyệt
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              {report.attachments && report.attachments.length > 0 && (
                <div>
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    VII. TÀI LIỆU ĐÍNH KÈM
                  </h3>
                  <div className="space-y-2">
                    {report.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <File className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                              {file.name}
                            </p>
                            <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                              {file.size}
                            </p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                          <span style={{ fontSize: 'var(--text-sm)' }}>Tải xuống</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Evidence Tab */}
          {activeTab === 'evidence' && (
            <div className="space-y-6">
              {report.slots.map((slot) => (
                <div key={slot.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Slot Header */}
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                          {slot.code}
                        </span>
                        <h4 className="text-gray-900">{slot.name}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                        <div className="flex items-center gap-1">
                          <LinkIcon className="w-4 h-4" />
                          <span>{slot.evidenceLinks.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Image className="w-4 h-4" />
                          <span>{slot.evidenceImages}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <File className="w-4 h-4" />
                          <span>{slot.evidenceFiles}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* KPI Summary */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>KPI Cam kết</p>
                        <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                          {slot.kpiCommitted}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>KPI Thực tế</p>
                        <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                          {slot.kpiActual}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Đạt được</p>
                        <p className="text-green-600" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}>
                          {slot.achievement}%
                        </p>
                      </div>
                    </div>

                    {/* Links */}
                    {slot.evidenceLinks.length > 0 && (
                      <div>
                        <h5 className="text-gray-900 mb-3 flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-blue-600" />
                          Links bài PR ({slot.evidenceLinks.length})
                        </h5>
                        <div className="space-y-2">
                          {slot.evidenceLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <LinkIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 text-blue-600 hover:text-blue-700 hover:underline truncate" style={{ fontSize: 'var(--text-sm)' }}>
                                {link}
                              </a>
                              <button className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded transition-colors" style={{ fontSize: 'var(--text-xs)' }}>
                                Mở
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Images */}
                    {slot.evidenceImages > 0 && (
                      <div>
                        <h5 className="text-gray-900 mb-3 flex items-center gap-2">
                          <Image className="w-4 h-4 text-purple-600" />
                          Hình ảnh minh chứng ({slot.evidenceImages})
                        </h5>
                        <div className="grid grid-cols-3 gap-4">
                          {Array.from({ length: Math.min(slot.evidenceImages, 6) }).map((_, index) => (
                            <div key={index} className="aspect-video bg-gray-100 rounded-lg border border-gray-200 overflow-hidden hover:border-teal-300 transition-colors cursor-pointer group relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Image className="w-8 h-8 text-gray-400 group-hover:text-teal-600 transition-colors" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p style={{ fontSize: 'var(--text-xs)' }}>Screenshot {index + 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {slot.evidenceImages > 6 && (
                          <button className="mt-3 text-teal-600 hover:text-teal-700" style={{ fontSize: 'var(--text-sm)' }}>
                            Xem thêm {slot.evidenceImages - 6} ảnh →
                          </button>
                        )}
                      </div>
                    )}

                    {/* Files */}
                    {slot.evidenceFiles > 0 && (
                      <div>
                        <h5 className="text-gray-900 mb-3 flex items-center gap-2">
                          <File className="w-4 h-4 text-orange-600" />
                          Files đính kèm ({slot.evidenceFiles})
                        </h5>
                        <div className="space-y-2">
                          {Array.from({ length: slot.evidenceFiles }).map((_, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-300 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                                    {slot.code}_Report_{index + 1}.pdf
                                  </p>
                                  <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                                    {(1.5 + index * 0.3).toFixed(1)} MB
                                  </p>
                                </div>
                              </div>
                              <button className="flex items-center gap-2 px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                                <Download className="w-4 h-4" />
                                <span style={{ fontSize: 'var(--text-sm)' }}>Tải</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* History items */}
                <div className="space-y-6">
                  {report.history.map((item, index) => (
                    <div key={index} className="relative flex gap-4">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center border-4 border-white">
                          <History className="w-5 h-5 text-teal-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 hover:border-teal-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="text-gray-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                              {item.action}
                            </h5>
                            <p className="text-gray-600 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                              {item.details}
                            </p>
                          </div>
                          <span className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                            {item.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                          <User className="w-3 h-3" />
                          <span>{item.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Current status */}
                  {report.status === 'draft' && (
                    <div className="relative flex gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4">
                        <h5 className="text-gray-600" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                          Chờ gửi phê duyệt
                        </h5>
                        <p className="text-gray-500 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                          Biên bản đang ở trạng thái nháp, cần gửi để VNA phê duyệt
                        </p>
                      </div>
                    </div>
                  )}

                  {report.status === 'submitted' && (
                    <div className="relative flex gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white">
                          <Send className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 bg-blue-50 rounded-lg border border-blue-200 p-4">
                        <h5 className="text-blue-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                          Đang chờ phê duyệt
                        </h5>
                        <p className="text-blue-700 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                          Biên bản đã được gửi đến VNA và đang chờ xét duyệt
                        </p>
                      </div>
                    </div>
                  )}

                  {report.status === 'approved' && (
                    <div className="relative flex gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-4 border-white">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 bg-green-50 rounded-lg border border-green-200 p-4">
                        <h5 className="text-green-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                          Đã phê duyệt
                        </h5>
                        <p className="text-green-700 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                          Biên bản đã được VNA phê duyệt và hoàn thành
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-green-700" style={{ fontSize: 'var(--text-xs)' }}>
                          <User className="w-3 h-3" />
                          <span>Phê duyệt bởi: {report.campaign.picName}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {report.status === 'returned' && report.returnReason && (
                    <div className="relative flex gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center border-4 border-white">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 bg-red-50 rounded-lg border border-red-200 p-4">
                        <h5 className="text-red-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                          Yêu cầu bổ sung
                        </h5>
                        <p className="text-red-700 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                          {report.returnReason}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-red-700" style={{ fontSize: 'var(--text-xs)' }}>
                          <Calendar className="w-3 h-3" />
                          <span>{report.returnedDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}