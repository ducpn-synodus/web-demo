import { ArrowLeft, Download, Send, FileText, Calendar, User, Building2, DollarSign, CheckCircle, AlertCircle, Edit, TrendingUp, Link as LinkIcon, File, Shield, Save, X, Image, Plus } from 'lucide-react';
import { useState } from 'react';

interface TaskAcceptanceDetailProps {
  acceptanceId: string;
  onBack?: () => void;
  onSubmit?: () => void;
  onDownloadPDF?: () => void;
}

export default function TaskAcceptanceDetail({ 
  acceptanceId, 
  onBack, 
  onSubmit, 
  onDownloadPDF 
}: TaskAcceptanceDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    deliverables: 'Đã triển khai bài post Video giới thiệu lịch bay Tết trên Facebook từ ngày 01/01/2025. Video dài 90 giây, giới thiệu 15 điểm đến hot trong dịp Tết với ưu đãi đặc biệt. Đạt 650K impressions và 28K clicks, vượt KPI cam kết 30%.',
    note: 'Task hoàn thành đúng tiến độ, engagement rate cao hơn mong đợi.',
    links: [
      'https://facebook.com/vietnamairlines/posts/12345',
      'https://drive.google.com/report-fb-001-analytics'
    ],
    images: ['Screenshot_FB_Analytics.png', 'Post_Performance.png', 'Engagement_Report.png'],
    files: ['FB_Ads_Report_Jan2025.pdf', 'Video_Analytics.xlsx']
  });

  // Mock data - sẽ fetch từ API dựa vào acceptanceId
  const getStatusFromId = (id: string) => {
    if (id.includes('submitted') || id === 'ACC-004' || id === 'ACC-006') return 'submitted';
    if (id.includes('approved') || id === 'ACC-001' || id === 'ACC-002') return 'approved';
    if (id.includes('returned') || id === 'ACC-003') return 'returned';
    return 'draft';
  };

  const status = getStatusFromId(acceptanceId);

  const acceptance = {
    id: acceptanceId,
    code: status === 'draft' ? 'NT-TASK-005' : status === 'submitted' ? 'NT-TASK-004' : status === 'returned' ? 'NT-TASK-003' : 'NT-TASK-001',
    status: status as 'draft' | 'submitted' | 'approved' | 'returned',
    createdDate: '02/01/2025',
    createdBy: 'Trần Thị B',
    submittedDate: status !== 'draft' ? '02/01/2025 16:30' : null,
    approvedDate: status === 'approved' ? '03/01/2025 10:15' : null,
    approvedBy: status === 'approved' ? 'Nguyễn Văn A - Phòng Marketing' : null,
    returnReason: status === 'returned' ? 'Thiếu ảnh minh chứng engagement và file báo cáo chi tiết từ Facebook Insights' : null,
    task: {
      code: 'TASK-FB-001',
      name: 'Bài 1: Video giới thiệu lịch bay Tết',
      channel: 'Facebook',
      kpiCommitted: '500K impressions, 20K clicks',
      kpiActual: '650K impressions, 28K clicks',
      achievement: 130,
      budgetAllocated: '5,000,000',
      actualCost: '5,000,000',
      executionDate: '01/01/2025',
      completedDate: '01/01/2025'
    },
    subCampaign: {
      code: 'SUB-001',
      name: 'Facebook - Giai đoạn 1',
      startDate: '01/01/2025',
      endDate: '31/01/2025'
    },
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
      name: 'Digital Marketing Agency Co., Ltd',
      taxCode: '0123456789',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      representative: 'Trần Thị B',
      position: 'Giám đốc',
      phone: '0901234567',
      email: 'contact@agency.vn'
    }
  };

  const getStatusBadge = (status: typeof acceptance.status) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <FileText className="w-4 h-4" />
            Bản nháp
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <Send className="w-4 h-4" />
            Chờ duyệt
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <CheckCircle className="w-4 h-4" />
            Đã duyệt
          </span>
        );
      case 'returned':
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
            <AlertCircle className="w-4 h-4" />
            Yêu cầu bổ sung
          </span>
        );
    }
  };

  const handleSave = () => {
    console.log('Saving changes:', editableData);
    setIsEditing(false);
    // Call API to save
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  const canEdit = status === 'draft' || status === 'returned';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-gray-900">Yêu cầu nghiệm thu</h1>
              {getStatusBadge(acceptance.status)}
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <X className="w-4 h-4" />
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all"
                    style={{ fontSize: 'var(--text-sm)', backgroundColor: '#006885' }}
                  >
                    <Save className="w-4 h-4" />
                    Lưu
                  </button>
                </>
              ) : (
                <>
                  {canEdit && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <Edit className="w-4 h-4" />
                      Chỉnh sửa
                    </button>
                  )}
                  {status === 'draft' && !isEditing && (
                    <button
                      onClick={onSubmit}
                      className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all"
                      style={{ fontSize: 'var(--text-sm)', backgroundColor: '#006885' }}
                    >
                      <Send className="w-4 h-4" />
                      Gửi nghiệm thu
                    </button>
                  )}
                  {status === 'returned' && !isEditing && (
                    <button
                      onClick={onSubmit}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <Send className="w-4 h-4" />
                      Gửi lại
                    </button>
                  )}
                  {(status === 'approved' || status === 'submitted') && (
                    <button
                      onClick={onDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <Download className="w-4 h-4" />
                      Tải PDF
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Return Reason Alert */}
        {status === 'returned' && acceptance.returnReason && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Yêu cầu bổ sung
                </p>
                <p className="text-red-700" style={{ fontSize: 'var(--text-sm)' }}>
                  {acceptance.returnReason}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          {/* Document Info */}
          <div className="grid grid-cols-3 gap-4 pb-6 border-b border-gray-200">
            <div>
              <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Mã yêu cầu</label>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                {acceptance.code}
              </p>
            </div>
            <div>
              <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Ngày lập</label>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                {acceptance.createdDate}
              </p>
            </div>
            <div>
              <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Người lập</label>
              <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                {acceptance.createdBy}
              </p>
            </div>
          </div>

          {/* Campaign Info */}
          <div>
            <h3 className="text-gray-900 mb-4">Thông tin chiến dịch</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Mã Campaign</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.campaign.code}</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Thời gian Campaign</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                    {acceptance.campaign.startDate} - {acceptance.campaign.endDate}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Tên Campaign</label>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.campaign.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Mã Sub-campaign</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.subCampaign.code}</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Thời gian Sub-campaign</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                    {acceptance.subCampaign.startDate} - {acceptance.subCampaign.endDate}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Tên Sub-campaign</label>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.subCampaign.name}</p>
              </div>
              <div>
                <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Người phụ trách (VNA)</label>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                  {acceptance.campaign.picName} - {acceptance.campaign.department}
                </p>
              </div>
            </div>
          </div>

          {/* Vendor Info */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">Thông tin Vendor</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Tên công ty</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.vendor.name}</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Mã số thuế</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.vendor.taxCode}</p>
                </div>
              </div>
              <div>
                <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Địa chỉ</label>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.vendor.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Người đại diện</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                    {acceptance.vendor.representative} - {acceptance.vendor.position}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Số điện thoại</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.vendor.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Task Detail */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">Chi tiết Task</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Mã Task</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.code}</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Kênh</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.channel}</p>
                </div>
              </div>
              <div>
                <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Tên Task</label>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Ngày thực hiện</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.executionDate}</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Ngày hoàn thành</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.completedDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>KPI cam kết</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.kpiCommitted}</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>KPI thực tế</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.kpiActual}</p>
                    <span className={`px-2 py-0.5 rounded text-xs ${acceptance.task.achievement >= 100 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {acceptance.task.achievement}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Ngân sách phân bổ</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.budgetAllocated} VNĐ</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Chi phí thực tế</label>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{acceptance.task.actualCost} VNĐ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="pt-6 border-t border-gray-200">
            <label className="block text-gray-900 mb-2">Nội dung công việc đã thực hiện</label>
            {isEditing ? (
              <textarea
                value={editableData.deliverables}
                onChange={(e) => setEditableData({ ...editableData, deliverables: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                style={{ fontSize: 'var(--text-sm)', focusRingColor: '#006885' }}
                placeholder="Mô tả chi tiết nội dung công việc..."
              />
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-700" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                  {editableData.deliverables}
                </p>
              </div>
            )}
          </div>

          {/* Evidence */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">Minh chứng & Tài liệu</h3>
            
            {/* Links */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>Links báo cáo</label>
                {isEditing && (
                  <button 
                    onClick={() => setEditableData({ ...editableData, links: [...editableData.links, ''] })}
                    className="text-xs px-2 py-1 text-gray-600 hover:text-gray-900"
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    + Thêm link
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {editableData.links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={link}
                          onChange={(e) => {
                            const newLinks = [...editableData.links];
                            newLinks[index] = e.target.value;
                            setEditableData({ ...editableData, links: newLinks });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          style={{ fontSize: 'var(--text-sm)' }}
                          placeholder="https://..."
                        />
                        <button 
                          onClick={() => {
                            const newLinks = editableData.links.filter((_, i) => i !== index);
                            setEditableData({ ...editableData, links: newLinks });
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate" style={{ fontSize: 'var(--text-sm)' }}>
                          {link}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>Hình ảnh minh chứng</label>
                {isEditing && (
                  <button className="text-xs px-2 py-1 text-gray-600 hover:text-gray-900" style={{ fontSize: 'var(--text-xs)' }}>
                    + Upload ảnh
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {editableData.images.map((img, index) => (
                  <div key={index} className="relative group aspect-square bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1.5">
                      <p style={{ fontSize: 'var(--text-xs)' }} className="truncate text-center">{img}</p>
                    </div>
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newImages = editableData.images.filter((_, i) => i !== index);
                          setEditableData({ ...editableData, images: newImages });
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Files */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>Files đính kèm</label>
                {isEditing && (
                  <button className="text-xs px-2 py-1 text-gray-600 hover:text-gray-900" style={{ fontSize: 'var(--text-xs)' }}>
                    + Upload file
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {editableData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{file}</p>
                        <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                          {(Math.random() * 3 + 1).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing && (
                        <button 
                          onClick={() => {
                            const newFiles = editableData.files.filter((_, i) => i !== index);
                            setEditableData({ ...editableData, files: newFiles });
                          }}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {!isEditing && (
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded text-xs">
                          Tải
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="pt-6 border-t border-gray-200">
            <label className="block text-gray-900 mb-2">Ghi chú</label>
            {isEditing ? (
              <textarea
                value={editableData.note}
                onChange={(e) => setEditableData({ ...editableData, note: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                style={{ fontSize: 'var(--text-sm)', focusRingColor: '#006885' }}
                placeholder="Ghi chú thêm..."
              />
            ) : (
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                  {editableData.note}
                </p>
              </div>
            )}
          </div>

          {/* Approval Status */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">Trạng thái phê duyệt</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Vendor */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-gray-500 mb-3" style={{ fontSize: 'var(--text-xs)' }}>Bên thực hiện (Vendor)</p>
                {status === 'draft' ? (
                  <p className="text-gray-400 italic" style={{ fontSize: 'var(--text-sm)' }}>Chờ gửi nghiệm thu</p>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        Đã gửi
                      </p>
                    </div>
                    <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                      {acceptance.vendor.representative}
                    </p>
                    <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                      {acceptance.submittedDate}
                    </p>
                  </div>
                )}
              </div>

              {/* VNA */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-gray-500 mb-3" style={{ fontSize: 'var(--text-xs)' }}>Phòng nội bộ VNA</p>
                {status === 'approved' ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                        Đã duyệt
                      </p>
                    </div>
                    <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                      {acceptance.approvedBy}
                    </p>
                    <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                      {acceptance.approvedDate}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 italic" style={{ fontSize: 'var(--text-sm)' }}>
                    {status === 'draft' ? 'Chờ gửi' : 'Đang chờ phê duyệt'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
