import { useState } from 'react';
import { ArrowLeft, Send, Upload, X, FileText, Calendar, CheckSquare, Square } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface OrderCreateProps {
  orderId: string | null;
  onBack: () => void;
  onSuccess: () => void;
}

export default function OrderCreate({ orderId, onBack, onSuccess }: OrderCreateProps) {
  const isEditMode = !!orderId;

  const [formData, setFormData] = useState({
    planName: isEditMode ? 'Chiến dịch Tết Nguyên Đán 2025' : '',
    description: isEditMode ? 'Chiến dịch truyền thông toàn diện nhân dịp Tết Nguyên Đán 2025' : '',
    startDate: isEditMode ? '2025-02-01' : '',
    endDate: isEditMode ? '2025-02-15' : '',
    channels: isEditMode ? ['facebook', 'google'] : [] as string[],
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Available channels with logos/icons
  const availableChannels = [
    { 
      id: 'facebook', 
      name: 'Facebook Ads', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
      color: '#1877F2'
    },
    { 
      id: 'google', 
      name: 'Google Ads', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
      color: '#4285F4'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok Ads', 
      logo: 'https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png',
      color: '#000000'
    },
    { 
      id: 'instagram', 
      name: 'Instagram Ads', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg',
      color: '#E4405F'
    },
    { 
      id: 'youtube', 
      name: 'YouTube Ads', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
      color: '#FF0000'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn Ads', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
      color: '#0A66C2'
    },
    { 
      id: 'email', 
      name: 'Email Marketing', 
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
      color: '#EA4335'
    },
    { 
      id: 'sms', 
      name: 'SMS Marketing', 
      logo: 'https://cdn-icons-png.flaticon.com/512/1034/1034131.png',
      color: '#00C853'
    },
    { 
      id: 'zalo', 
      name: 'Zalo Ads', 
      logo: 'https://i.pinimg.com/736x/35/b0/e7/35b0e7f4986056b70c8a070e64830243.jpg',
      color: '#0068FF'
    },
    { 
      id: 'pr', 
      name: 'PR Báo chí', 
      logo: 'https://cdn-icons-png.flaticon.com/512/3074/3074767.png',
      color: '#FF6B6B'
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleToggleChannel = (channelId: string) => {
    if (formData.channels.includes(channelId)) {
      setFormData({
        ...formData,
        channels: formData.channels.filter((c) => c !== channelId),
      });
    } else {
      setFormData({
        ...formData,
        channels: [...formData.channels, channelId],
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Submit for review logic
    onSuccess();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-gray-900 text-2xl">
            {isEditMode ? 'Chỉnh sửa yêu cầu' : 'Tạo yêu cầu truyền thông mới'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode ? `Mã yêu cầu: ${orderId}` : 'Điền thông tin chi tiết cho yêu cầu truyền thông'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Tên kế hoạch */}
              <div className="space-y-2">
                <label htmlFor="planName" className="block text-sm text-gray-700">
                  Tên kế hoạch <span className="text-red-500">*</span>
                </label>
                <Input
                  id="planName"
                  type="text"
                  placeholder="Nhập tên kế hoạch truyền thông"
                  value={formData.planName}
                  onChange={(e) => handleInputChange('planName', e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Mô tả yêu cầu */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm text-gray-700">
                  Mô tả yêu cầu <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="description"
                  placeholder="Mô tả chi tiết về yêu cầu truyền thông, mục tiêu, đối tượng..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="resize-none min-h-[140px]"
                />
              </div>

              {/* Thời gian dự kiến triển khai */}
              <div className="space-y-3">
                <label className="block text-sm text-gray-700">
                  Thời gian dự kiến triển khai <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="block text-xs text-gray-500">
                      Từ ngày
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="endDate" className="block text-xs text-gray-500">
                      Đến ngày
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* File đính kèm */}
              <div className="space-y-3">
                <label className="block text-sm text-gray-700">
                  File đính kèm <span className="text-gray-400 text-xs">(Tùy chọn)</span>
                </label>
                
                {/* File upload area */}
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#006885] hover:bg-blue-50/50 transition-all">
                    <div className="flex items-center justify-center gap-3 text-center">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-700">
                          Nhấp để tải file lên
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, Word, Excel, PowerPoint, hình ảnh
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                  />
                </label>

                {/* Uploaded files list */}
                {attachedFiles.length > 0 && (
                  <div className="space-y-2 max-h-[120px] overflow-y-auto">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5 flex flex-col">
              {/* Kênh truyền thông */}
              <div className="space-y-3 flex-1 flex flex-col">
                <label className="block text-sm text-gray-700">
                  Kênh truyền thông <span className="text-gray-400 text-xs">(Tùy chọn)</span>
                </label>
                
                <div className="border border-gray-200 rounded-xl p-4 flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-3">
                    {availableChannels.map((channel) => {
                      const isSelected = formData.channels.includes(channel.id);
                      return (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => handleToggleChannel(channel.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50/50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="w-8 h-8 flex-shrink-0 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden border border-gray-100">
                            <img
                              src={channel.logo}
                              alt={channel.name}
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className={`text-xs truncate ${
                              isSelected ? 'text-teal-900' : 'text-gray-700'
                            }`}>
                              {channel.name}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-teal-600" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected channels summary */}
                {formData.channels.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-teal-50 px-3 py-2 rounded-lg">
                    <span className="text-teal-700">
                      Đã chọn {formData.channels.length} kênh
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex items-center justify-between">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="border-gray-300"
          >
            Hủy
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Gửi yêu cầu
          </Button>
        </div>
      </div>
    </div>
  );
}