import { ArrowLeft, Save, Send, Upload, X, File, Image, FileText, Calendar, DollarSign, Target, TrendingUp, AlertCircle, Eye, Download } from 'lucide-react';
import { useState } from 'react';
import DigitalSignatureModal from './DigitalSignatureModal';

interface CreateAcceptanceReportProps {
  onBack?: () => void;
  onSave?: (data: any) => void;
  onSubmit?: (data: any) => void;
  slotId?: string;
  acceptanceId?: string; // For editing
}

export default function CreateAcceptanceReport({ 
  onBack, 
  onSave, 
  onSubmit,
  slotId,
  acceptanceId 
}: CreateAcceptanceReportProps) {
  const [showSignModal, setShowSignModal] = useState(false);
  const [deliverables, setDeliverables] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [note, setNote] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // Mock slot data
  const slot = {
    code: 'FB-003',
    name: 'Facebook Carousel Ads - Điểm đến Tết',
    campaignCode: 'CP-2025-001',
    campaignName: 'Chiến dịch Tết Nguyên Đán 2025',
    channel: 'Facebook',
    kpiCommitted: '300K impressions, 10K clicks',
    kpiActual: '350K impressions, 12K clicks',
    budget: '20,000,000',
    timeline: '10/01/2025 - 20/01/2025',
    deliverableRequired: 'Carousel ads + Performance metrics + Screenshot'
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'file'
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id: number) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  const handleSaveDraft = () => {
    onSave?.({
      slotId,
      deliverables,
      actualCost,
      executionDate,
      note,
      files: uploadedFiles
    });
  };

  const handlePreviewPDF = () => {
    alert('Chức năng xem trước PDF sẽ mở biên bản nghiệm thu ở tab mới');
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!deliverables || !actualCost || !executionDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    if (uploadedFiles.length === 0) {
      alert('Vui lòng upload ít nhất 1 file minh chứng');
      return;
    }
    // Show signature modal
    setShowSignModal(true);
  };

  const handleSignConfirm = () => {
    onSubmit?.({
      slotId,
      deliverables,
      actualCost,
      executionDate,
      note,
      files: uploadedFiles,
      signedAt: new Date().toISOString()
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-blue-600" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-gray-900 mb-1">
              {acceptanceId ? 'Chỉnh sửa biên bản nghiệm thu' : 'Lập biên bản nghiệm thu'}
            </h1>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
              {slot.code} - {slot.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviewPDF}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <Eye className="w-4 h-4" />
            Xem trước PDF
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <Save className="w-4 h-4" />
            Lưu nháp
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all"
            style={{ fontSize: 'var(--text-sm)', backgroundColor: '#006885' }}
          >
            <Send className="w-4 h-4" />
            Ký số và gửi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Slot Info (Read-only) */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-gray-900 mb-4" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              Thông tin Slot
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Mã Slot</p>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  {slot.code}
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Chiến dịch</p>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                  {slot.campaignName}
                </p>
                <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                  {slot.campaignCode}
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Kênh</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full" style={{ fontSize: 'var(--text-xs)' }}>
                  {slot.channel}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                    KPI Cam kết
                  </p>
                </div>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                  {slot.kpiCommitted}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                    KPI Thực tế
                  </p>
                </div>
                <p className="text-green-700" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {slot.kpiActual}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                    Ngân sách phân bổ
                  </p>
                </div>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {slot.budget} VNĐ
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                    Thời gian thực hiện
                  </p>
                </div>
                <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>
                  {slot.timeline}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)' }}>
                    Deliverable yêu cầu
                  </p>
                </div>
                <p className="text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                  {slot.deliverableRequired}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Acceptance Form */}
        <div className="col-span-2 space-y-4">
          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Lưu ý quan trọng
              </p>
              <p className="text-blue-800" style={{ fontSize: 'var(--text-sm)' }}>
                Sau khi ký số và gửi, bạn không thể chỉnh sửa biên bản. Vui lòng kiểm tra kỹ thông tin và file đính kèm trước khi gửi.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h3 className="text-gray-900 pb-3 border-b border-gray-200" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              Thông tin nghiệm thu
            </h3>

            {/* Deliverables */}
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Danh sách deliverable đã bàn giao <span className="text-red-600">*</span>
              </label>
              <textarea
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                placeholder="Mô tả chi tiết các deliverable đã hoàn thành và bàn giao cho VNA..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>

            {/* Execution Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  Ngày thực hiện <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={executionDate}
                  onChange={(e) => setExecutionDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  Chi phí thực tế <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={actualCost}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setActualCost(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    }}
                    placeholder="20,000,000"
                    className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
                    VNĐ
                  </span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Ghi chú
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú bổ sung (nếu có)..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                File minh chứng <span className="text-red-600">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-900 mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  Kéo thả file vào đây hoặc click để chọn
                </p>
                <p className="text-gray-500 mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                  Hỗ trợ: PDF, PNG, JPG, Excel, Word. Tối đa 10MB/file
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.xlsx,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <Upload className="w-4 h-4" />
                  Chọn file
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)' }}>{file.name}</p>
                          <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>{file.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Digital Signature Modal */}
      <DigitalSignatureModal
        isOpen={showSignModal}
        onClose={() => setShowSignModal(false)}
        onConfirm={handleSignConfirm}
        documentType="acceptance"
        documentName={`Biên bản nghiệm thu - ${slot.code}`}
      />
    </div>
  );
}
