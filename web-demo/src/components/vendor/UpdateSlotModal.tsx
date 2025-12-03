import { X, Upload, Link as LinkIcon, Image as ImageIcon, FileText, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface UpdateSlotModalProps {
  slotId: string;
  slotType: 'digital' | 'pr' | 'ooh' | 'tvc' | 'event';
  slotName: string;
  onClose?: () => void;
  onSave?: (data: any) => void;
}

export default function UpdateSlotModal({ slotId, slotType, slotName, onClose, onSave }: UpdateSlotModalProps) {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  const renderDigitalForm = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Impression
          </label>
          <input
            type="number"
            placeholder="Nhập số impression"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Click
          </label>
          <input
            type="number"
            placeholder="Nhập số click"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Reach
          </label>
          <input
            type="number"
            placeholder="Nhập số reach"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            CTR (%)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Nhập CTR"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Link campaign
        </label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="url"
            placeholder="https://..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Screenshot placement
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Kéo thả hoặc click để tải ảnh lên
          </p>
          <p className="text-gray-400 mt-1" style={{ fontSize: 'var(--text-xs)' }}>
            PNG, JPG tối đa 10MB
          </p>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Báo cáo Excel
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Tải lên file báo cáo
          </p>
        </div>
      </div>
    </>
  );

  const renderPRForm = () => (
    <>
      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Link bài PR
        </label>
        <div className="space-y-2">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              placeholder="https://vnexpress.net/..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>
          <button
            type="button"
            className="text-teal-600 hover:text-teal-700"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            + Thêm link
          </button>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Ảnh chụp màn hình
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Tải ảnh screenshot bài PR
          </p>
          <p className="text-gray-400 mt-1" style={{ fontSize: 'var(--text-xs)' }}>
            Có thể tải nhiều ảnh
          </p>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Số view (nếu có)
        </label>
        <input
          type="number"
          placeholder="Nhập số lượt xem"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          style={{ fontSize: 'var(--text-sm)' }}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          File nghiệm thu / Media kit
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Tải lên file PDF
          </p>
        </div>
      </div>
    </>
  );

  const renderOOHForm = () => (
    <>
      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Hình ảnh billboard (3-5 góc)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Tải ảnh chụp thực tế billboard
          </p>
          <p className="text-gray-400 mt-1" style={{ fontSize: 'var(--text-xs)' }}>
            Tối thiểu 3 ảnh từ các góc khác nhau
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Ngày treo thực tế
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            Tình trạng biển
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <option>Tốt</option>
            <option>Khá</option>
            <option>Cần bảo trì</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderTVCForm = () => (
    <>
      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Số spot đã chạy
        </label>
        <input
          type="number"
          placeholder="Nhập số spot"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          style={{ fontSize: 'var(--text-sm)' }}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Lịch phát sóng
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Upload lịch phát sóng
          </p>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Video record (nếu có)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Upload video hoặc link
          </p>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          File đối soát
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Upload file đối soát
          </p>
        </div>
      </div>
    </>
  );

  const renderEventForm = () => (
    <>
      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Hình ảnh sự kiện
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Tải ảnh sự kiện thực tế
          </p>
          <p className="text-gray-400 mt-1" style={{ fontSize: 'var(--text-xs)' }}>
            Có thể tải nhiều ảnh
          </p>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Timeline hoạt động
        </label>
        <textarea
          rows={3}
          placeholder="Mô tả timeline các hoạt động trong sự kiện..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          style={{ fontSize: 'var(--text-sm)' }}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
          Báo cáo tổng kết
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-teal-500 transition-colors cursor-pointer">
          <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
            Upload báo cáo tổng kết sự kiện
          </p>
        </div>
      </div>
    </>
  );

  const getFormTitle = () => {
    const titles = {
      digital: 'Cập nhật kết quả Digital',
      pr: 'Cập nhật kết quả PR',
      ooh: 'Cập nhật kết quả OOH',
      tvc: 'Cập nhật kết quả TVC',
      event: 'Cập nhật kết quả Event'
    };
    return titles[slotType];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">{getFormTitle()}</h2>
            <p className="text-gray-500 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
              {slotName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-4">
          {slotType === 'digital' && renderDigitalForm()}
          {slotType === 'pr' && renderPRForm()}
          {slotType === 'ooh' && renderOOHForm()}
          {slotType === 'tvc' && renderTVCForm()}
          {slotType === 'event' && renderEventForm()}

          {/* Common Fields */}
          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Chi phí thực tế
              </div>
            </label>
            <input
              type="number"
              placeholder="Nhập chi phí thực tế (VNĐ)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
              Ghi chú
            </label>
            <textarea
              rows={3}
              placeholder="Thêm ghi chú nếu cần..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Hủy
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Lưu nháp
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Gửi cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}