import { ArrowLeft, Save, Send, Plus, X, CheckSquare, Square, AlertCircle, Package, DollarSign, FileText, Upload, Link as LinkIcon, Image as ImageIcon, Trash2, Download, FileCheck } from 'lucide-react';
import { useState } from 'react';

interface TaskReport {
  links: string[];
  images: File[];
  files: File[];
  deliverables: string;
}

interface Task {
  id: string;
  code: string;
  name: string;
  channel: string;
  subCampaign: string;
  subCampaignCode: string;
  campaign: string;
  campaignCode: string;
  kpiCommitted: string;
  kpiActual: string;
  cost: string;
  executionDate: string;
}

interface CreateAcceptanceBatchProps {
  onBack?: () => void;
  onSave?: (data: any) => void;
  onSubmit?: (data: any) => void;
  batchId?: string;
}

export default function CreateAcceptanceBatch({ onBack, onSave, onSubmit, batchId }: CreateAcceptanceBatchProps) {
  const [batchName, setBatchName] = useState(batchId ? 'Đợt 1 - Giai đoạn đầu Tết' : '');
  const [note, setNote] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>(batchId ? ['1', '2', '3'] : []);
  const [taskReports, setTaskReports] = useState<Record<string, TaskReport>>({
    '1': {
      links: ['https://facebook.com/vietnamairlines/posts/12345'],
      images: [],
      files: [],
      deliverables: 'Đã triển khai bài post Video giới thiệu lịch bay Tết'
    },
    '2': {
      links: ['https://dantri.com/article-12345'],
      images: [],
      files: [],
      deliverables: 'Bài PR trên Dân Trí về ưu đãi Tết'
    },
    '3': {
      links: [],
      images: [],
      files: [],
      deliverables: ''
    }
  });

  const availableTasks: Task[] = [
    {
      id: '1',
      code: 'TASK-FB-001',
      name: 'Bài 1: Video giới thiệu lịch bay Tết',
      channel: 'Facebook',
      subCampaign: 'Facebook - Giai đoạn 1',
      subCampaignCode: 'SUB-001',
      campaign: 'Chiến dịch Tết Nguyên Đán 2025',
      campaignCode: 'CP-2025-001',
      kpiCommitted: '500K impressions, 20K clicks',
      kpiActual: '650K impressions, 28K clicks',
      cost: '5,000,000',
      executionDate: '01/01/2025'
    },
    {
      id: '2',
      code: 'TASK-PR-002',
      name: 'Bài 2: PR trên Dân Trí',
      channel: 'PR',
      subCampaign: 'PR - Giai đoạn 1',
      subCampaignCode: 'SUB-002',
      campaign: 'Chiến dịch Tết Nguyên Đán 2025',
      campaignCode: 'CP-2025-001',
      kpiCommitted: '1 bài đăng + PR native',
      kpiActual: '1 bài đăng - 22.5K views + Video',
      cost: '18,500,000',
      executionDate: '02/01/2025'
    },
    {
      id: '3',
      code: 'TASK-IG-003',
      name: 'Bài 3: Instagram Stories',
      channel: 'Instagram',
      subCampaign: 'Social Media - Giai đoạn 1',
      subCampaignCode: 'SUB-003',
      campaign: 'Quảng bá dịch vụ Business Class',
      campaignCode: 'CP-2025-002',
      kpiCommitted: '10 stories, 200K reach',
      kpiActual: '12 stories, 250K reach',
      cost: '3,000,000',
      executionDate: '03/01/2025'
    },
    {
      id: '4',
      code: 'TASK-YT-004',
      name: 'Bài 4: YouTube Video Campaign',
      channel: 'YouTube',
      subCampaign: 'Video Marketing',
      subCampaignCode: 'SUB-004',
      campaign: 'Quảng bá dịch vụ Business Class',
      campaignCode: 'CP-2025-002',
      kpiCommitted: '500K views',
      kpiActual: '680K views',
      cost: '25,000,000',
      executionDate: '05/01/2025'
    }
  ];

  const toggleTask = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
      // Initialize report if not exists
      if (!taskReports[taskId]) {
        setTaskReports({
          ...taskReports,
          [taskId]: { links: [], images: [], files: [], deliverables: '' }
        });
      }
    }
  };

  const updateTaskReport = (taskId: string, field: keyof TaskReport, value: any) => {
    setTaskReports({
      ...taskReports,
      [taskId]: {
        ...taskReports[taskId],
        [field]: value
      }
    });
  };

  const addLink = (taskId: string) => {
    const report = taskReports[taskId];
    updateTaskReport(taskId, 'links', [...report.links, '']);
  };

  const updateLink = (taskId: string, index: number, value: string) => {
    const report = taskReports[taskId];
    const newLinks = [...report.links];
    newLinks[index] = value;
    updateTaskReport(taskId, 'links', newLinks);
  };

  const removeLink = (taskId: string, index: number) => {
    const report = taskReports[taskId];
    updateTaskReport(taskId, 'links', report.links.filter((_, i) => i !== index));
  };

  const validateTask = (taskId: string): boolean => {
    const report = taskReports[taskId];
    if (!report) return false;
    if (!report.deliverables.trim()) return false;
    if (report.links.length === 0 && report.images.length === 0 && report.files.length === 0) return false;
    return true;
  };

  const handleSaveDraft = () => {
    if (!batchName.trim()) {
      alert('Vui lòng nhập tên đợt nghiệm thu');
      return;
    }
    if (selectedTasks.length === 0) {
      alert('Vui lòng chọn ít nhất 1 task');
      return;
    }
    onSave?.({ batchName, selectedTasks, taskReports, note, status: 'draft' });
    alert('Đã lưu bản nháp thành công!');
  };

  const handleSubmit = () => {
    if (!batchName.trim()) {
      alert('Vui lòng nhập tên đợt nghiệm thu');
      return;
    }
    if (selectedTasks.length === 0) {
      alert('Vui lòng chọn ít nhất 1 task');
      return;
    }

    // Validate all selected tasks
    const invalidTasks = selectedTasks.filter(taskId => !validateTask(taskId));
    if (invalidTasks.length > 0) {
      const taskNames = invalidTasks.map(id => {
        const task = availableTasks.find(t => t.id === id);
        return task?.code;
      }).join(', ');
      alert(`Các task sau chưa có đầy đủ báo cáo/minh chứng: ${taskNames}`);
      return;
    }

    onSubmit?.({ batchName, selectedTasks, taskReports, note, status: 'submitted' });
    alert('Yêu cầu nghiệm thu đã được gửi đến VNA!');
    onBack?.();
  };

  const selectedTasksData = availableTasks.filter(task => selectedTasks.includes(task.id));
  const totalCost = selectedTasksData.reduce((sum, task) => sum + parseInt(task.cost.replace(/,/g, '')), 0);

  // Group tasks by campaign
  const tasksByCampaign = availableTasks.reduce((acc, task) => {
    if (!acc[task.campaignCode]) {
      acc[task.campaignCode] = {
        campaign: task.campaign,
        tasks: []
      };
    }
    acc[task.campaignCode].tasks.push(task);
    return acc;
  }, {} as Record<string, { campaign: string; tasks: Task[] }>);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
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
          <div>
            <h1 className="text-gray-900 mb-1">
              {batchId ? 'Chỉnh sửa yêu cầu nghiệm thu' : 'Tạo yêu cầu nghiệm thu mới'}
            </h1>
            <p className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
              Chọn task và đính kèm báo cáo cho từng task
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Thông tin chung</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                  Tên đợt nghiệm thu <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  placeholder="VD: Đợt 1 - Giai đoạn đầu Tết 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                  Ghi chú
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú cho đợt nghiệm thu..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>
            </div>
          </div>

          {/* Summary - Moved to top */}
          {selectedTasks.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Tổng quan</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Số task đã chọn</p>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {selectedTasks.length}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Đã có báo cáo</p>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {selectedTasks.filter(id => validateTask(id)).length}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-1" style={{ fontSize: 'var(--text-xs)' }}>Tổng giá trị</p>
                  <p className="text-gray-900" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {totalCost.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>

              {selectedTasks.some(id => !validateTask(id)) && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">
                      Vui lòng bổ sung báo cáo cho tất cả các task đã chọn trước khi gửi nghiệm thu
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Task Selection & Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Danh sách Task ({selectedTasks.length} đã chọn)</h3>
              <p className="text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
                Tổng giá trị: <span className="text-gray-900" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                  {totalCost.toLocaleString()} VNĐ
                </span>
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(tasksByCampaign).map(([campaignCode, data]) => (
                <div key={campaignCode}>
                  <div className="mb-3 pb-2 border-b border-gray-200">
                    <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {data.campaign} ({campaignCode})
                    </p>
                  </div>
                  <div className="space-y-4">
                    {data.tasks.map((task) => {
                      const isSelected = selectedTasks.includes(task.id);
                      const report = taskReports[task.id] || { links: [], images: [], files: [], deliverables: '' };
                      const isValid = validateTask(task.id);

                      return (
                        <div key={task.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          {/* Task Header - Clickable */}
                          <div
                            onClick={() => toggleTask(task.id)}
                            className={`p-4 cursor-pointer transition-colors ${
                              isSelected ? 'bg-blue-50 border-b border-gray-200' : 'bg-white hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {isSelected ? (
                                  <CheckSquare className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <Square className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                        {task.code} - {task.name}
                                      </p>
                                      {isSelected && !isValid && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                                          <AlertCircle className="w-3 h-3" />
                                          Chưa có báo cáo
                                        </span>
                                      )}
                                      {isSelected && isValid && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                          <CheckSquare className="w-3 h-3" />
                                          Đã có báo cáo
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-gray-500" style={{ fontSize: 'var(--text-xs)' }}>
                                      {task.channel} • {task.subCampaign} • {task.executionDate}
                                    </p>
                                  </div>
                                  <p className="text-gray-900" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    {task.cost} VNĐ
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                                  <div>
                                    <span className="text-gray-500">KPI cam kết:</span>
                                    <p className="text-gray-700">{task.kpiCommitted}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">KPI thực tế:</span>
                                    <p className="text-gray-700">{task.kpiActual}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Task Report Form - Only show when selected */}
                          {isSelected && (
                            <div className="p-4 bg-gray-50 space-y-4">
                              {/* Deliverables */}
                              <div>
                                <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                                  Nội dung công việc đã thực hiện <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                  value={report.deliverables}
                                  onChange={(e) => updateTaskReport(task.id, 'deliverables', e.target.value)}
                                  rows={3}
                                  placeholder="Mô tả chi tiết nội dung công việc đã thực hiện..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                />
                              </div>

                              {/* Links */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-gray-700" style={{ fontSize: 'var(--text-sm)' }}>
                                    Links báo cáo <span className="text-red-600">*</span>
                                  </label>
                                  <button
                                    onClick={() => addLink(task.id)}
                                    className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-900 text-xs"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Thêm link
                                  </button>
                                </div>
                                {report.links.length === 0 ? (
                                  <p className="text-gray-400 text-xs italic">Chưa có link báo cáo</p>
                                ) : (
                                  <div className="space-y-2">
                                    {report.links.map((link, index) => (
                                      <div key={index} className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          value={link}
                                          onChange={(e) => updateLink(task.id, index, e.target.value)}
                                          placeholder="https://..."
                                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <button
                                          onClick={() => removeLink(task.id, index)}
                                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* File Upload Placeholders */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                                    Hình ảnh minh chứng
                                  </label>
                                  <button className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    <span style={{ fontSize: 'var(--text-xs)' }}>Upload ảnh</span>
                                  </button>
                                  {report.images.length > 0 && (
                                    <p className="text-gray-600 mt-1 text-xs">{report.images.length} file đã chọn</p>
                                  )}
                                </div>
                                <div>
                                  <label className="block text-gray-700 mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                                    Files đính kèm
                                  </label>
                                  <button className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    <span style={{ fontSize: 'var(--text-xs)' }}>Upload file</span>
                                  </button>
                                  {report.files.length > 0 && (
                                    <p className="text-gray-600 mt-1 text-xs">{report.files.length} file đã chọn</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {selectedTasks.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => alert('Xuất PDF...')}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <Download className="w-4 h-4" />
                  Xuất PDF
                </button>
                <button
                  onClick={() => alert('Ký số...')}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <FileCheck className="w-4 h-4" />
                  Ký số
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all"
                  style={{ fontSize: 'var(--text-sm)', backgroundColor: '#006885' }}
                >
                  <Send className="w-4 h-4" />
                  Gửi duyệt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}