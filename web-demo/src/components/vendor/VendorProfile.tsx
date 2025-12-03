import { Building2, User, Mail, Phone, MapPin, FileText, Save } from 'lucide-react';
import { useState } from 'react';

export default function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: 'PR Agency Vietnam Co., Ltd',
    taxCode: '0123456789',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    representative: 'Trần Thị B',
    position: 'Giám đốc',
    phone: '0901234567',
    email: 'contact@pragency.vn',
    bankName: 'Vietcombank - Chi nhánh TP.HCM',
    bankAccount: '0123456789',
    bankAccountName: 'CÔNG TY TNHH PR AGENCY VIETNAM'
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Save profile:', formData);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Hồ sơ Vendor</h1>
          <p className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
            Thông tin doanh nghiệp và liên hệ
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Chỉnh sửa
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <Save className="w-4 h-4" />
              Lưu thay đổi
            </button>
          </div>
        )}
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-teal-600" />
          <h2 className="text-gray-900">Thông tin doanh nghiệp</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Tên công ty <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Mã số thuế <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.taxCode}
                onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Địa chỉ <span className="text-red-600">*</span>
              </div>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>
        </div>
      </div>

      {/* Representative Info */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <User className="w-5 h-5 text-teal-600" />
          <h2 className="text-gray-900">Người đại diện</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Họ và tên <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.representative}
                onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Chức vụ <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Số điện thoại <span className="text-red-600">*</span>
                </div>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email <span className="text-red-600">*</span>
                </div>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Banking Info */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-600" />
          <h2 className="text-gray-900">Thông tin thanh toán</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
              Ngân hàng <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Số tài khoản <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Tên tài khoản <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.bankAccountName}
                onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Channel Access */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-gray-900">Kênh được phân quyền</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-purple-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                PR (Public Relations)
              </p>
              <p className="text-purple-700" style={{ fontSize: 'var(--text-xs)' }}>
                Bạn chỉ có thể xem và quản lý các slot thuộc kênh PR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
