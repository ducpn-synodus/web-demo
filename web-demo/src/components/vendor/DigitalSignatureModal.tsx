import { X, Shield, AlertCircle, CheckCircle, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface DigitalSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentType: 'acceptance' | 'contract';
  documentName: string;
}

export default function DigitalSignatureModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  documentType,
  documentName
}: DigitalSignatureModalProps) {
  const [step, setStep] = useState<'confirm' | 'otp' | 'success'>('confirm');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('0901 234 567'); // Mock phone number
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSendOTP = () => {
    setIsSubmitting(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOTP = () => {
    setIsSubmitting(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      // Auto close and confirm after success
      setTimeout(() => {
        onConfirm();
        onClose();
        // Reset state
        setStep('confirm');
        setOtp('');
      }, 1500);
    }, 1000);
  };

  const handleResendOTP = () => {
    setOtp('');
    // Simulate resend OTP
    alert('Mã OTP mới đã được gửi đến số điện thoại của bạn');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-gray-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Ký số biên bản nghiệm thu
              </h3>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                Xác thực bằng OTP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'confirm' && (
            <div className="space-y-4">
              {/* Document Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-600 mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  Tài liệu cần ký
                </p>
                <p className="text-gray-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {documentName}
                </p>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-900 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                    Lưu ý quan trọng
                  </p>
                  <ul className="text-amber-800 space-y-1" style={{ fontSize: 'var(--text-sm)' }}>
                    <li>• Chữ ký số có giá trị pháp lý tương đương chữ ký tay</li>
                    <li>• Sau khi ký, tài liệu không thể chỉnh sửa</li>
                    <li>• Bạn chịu tr책nhiệm với nội dung đã ký</li>
                  </ul>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  Số điện thoại nhận OTP
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    {phone}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button
                  onClick={handleSendOTP}
                  className="flex-1 px-4 py-2.5 text-white rounded-lg hover:opacity-90 transition-all"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', backgroundColor: '#006885' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi mã OTP'}
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              {/* Info */}
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-teal-600" />
                </div>
                <p className="text-gray-900 mb-2" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  Nhập mã OTP
                </p>
                <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                  Mã OTP đã được gửi đến số điện thoại {phone}
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  Mã OTP (6 số)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-center tracking-widest"
                  style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)' }}
                  autoFocus
                />
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  onClick={handleResendOTP}
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  Gửi lại mã OTP
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('confirm')}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}
                  disabled={isSubmitting}
                >
                  Quay lại
                </button>
                <button
                  onClick={handleVerifyOTP}
                  className="flex-1 px-4 py-2.5 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', backgroundColor: '#006885' }}
                  disabled={otp.length !== 6 || isSubmitting}
                >
                  {isSubmitting ? 'Đang xác thực...' : 'Xác nhận ký'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-900 mb-2" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                Ký số thành công!
              </p>
              <p className="text-gray-600" style={{ fontSize: 'var(--text-sm)' }}>
                Biên bản nghiệm thu đã được gửi đến VNA
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
