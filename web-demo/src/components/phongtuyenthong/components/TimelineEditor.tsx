import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TimelinePhase {
  phase: string;
  start: string;
  end: string;
  status: string;
}

interface TimelineEditorProps {
  initialPhases?: TimelinePhase[];
  onSave?: (phases: TimelinePhase[]) => void;
}

export default function TimelineEditor({
  initialPhases = [],
  onSave,
}: TimelineEditorProps) {
  const [phases, setPhases] = useState<TimelinePhase[]>(initialPhases);
  const [isEditing, setIsEditing] = useState(false);

  const handlePhaseChange = (index: number, field: keyof TimelinePhase, value: string) => {
    const newPhases = [...phases];
    newPhases[index][field] = value;
    setPhases(newPhases);
  };

  const handleAddPhase = () => {
    setPhases([...phases, { phase: '', start: '', end: '', status: 'Chưa bắt đầu' }]);
  };

  const handleRemovePhase = (index: number) => {
    const newPhases = phases.filter((_, i) => i !== index);
    setPhases(newPhases);
  };

  const handleSave = () => {
    onSave?.(phases);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPhases(initialPhases);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-gray-700" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
          TIMELINE TRIỂN KHAI
        </div>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-7 px-2"
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="h-7 px-2"
            >
              <X className="w-3 h-3 mr-1" />
              Hủy
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              className="h-7 px-2"
            >
              <Check className="w-3 h-3 mr-1" />
              Lưu
            </Button>
          </div>
        )}
      </div>

      <table className="w-full border-collapse" style={{ fontSize: 'var(--text-sm)' }}>
        <thead>
          <tr className="border-y bg-gray-50">
            <th className="text-left py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
              Mô tả
            </th>
            <th className="text-left py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
              Ngày bắt đầu
            </th>
            <th className="text-left py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
              Ngày kết thúc
            </th>
            <th className="text-left py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
              Trạng thái
            </th>
            {isEditing && (
              <th className="text-center py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)', width: '60px' }}>
                Xóa
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {phases.length === 0 ? (
            <tr>
              <td colSpan={isEditing ? 5 : 4} className="py-4 px-3 text-center text-gray-500" style={{ fontSize: 'var(--text-sm)' }}>
                {isEditing ? 'Nhấn "Thêm giai đoạn" để bắt đầu' : 'Chưa có timeline'}
              </td>
            </tr>
          ) : (
            phases.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-3">
                  {isEditing ? (
                    <Input
                      type="text"
                      value={item.phase}
                      onChange={(e) => handlePhaseChange(index, 'phase', e.target.value)}
                      className="border-gray-300 h-8"
                      placeholder="Tên giai đoạn"
                    />
                  ) : (
                    <span className="text-gray-700">{item.phase}</span>
                  )}
                </td>
                <td className="py-2 px-3">
                  {isEditing ? (
                    <Input
                      type="text"
                      value={item.start}
                      onChange={(e) => handlePhaseChange(index, 'start', e.target.value)}
                      className="border-gray-300 h-8"
                      placeholder="dd/mm/yyyy"
                    />
                  ) : (
                    <span className="text-gray-700">{item.start}</span>
                  )}
                </td>
                <td className="py-2 px-3">
                  {isEditing ? (
                    <Input
                      type="text"
                      value={item.end}
                      onChange={(e) => handlePhaseChange(index, 'end', e.target.value)}
                      className="border-gray-300 h-8"
                      placeholder="dd/mm/yyyy"
                    />
                  ) : (
                    <span className="text-gray-700">{item.end}</span>
                  )}
                </td>
                <td className="py-2 px-3">
                  {isEditing ? (
                    <Input
                      type="text"
                      value={item.status}
                      onChange={(e) => handlePhaseChange(index, 'status', e.target.value)}
                      className="border-gray-300 h-8"
                      placeholder="Trạng thái"
                    />
                  ) : (
                    <span className="text-gray-600">{item.status}</span>
                  )}
                </td>
                {isEditing && (
                  <td className="py-2 px-3 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePhase(index)}
                      className="h-10 w-10 p-0 hover:bg-red-50"
                    >
                      <Trash2 className="w-8 h-8" style={{ color: '#dc2626', strokeWidth: 2 }} />
                    </Button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isEditing && (
        <div className="mt-2 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddPhase}
            className="h-8"
          >
            <Plus className="w-3 h-3 mr-1" />
            Thêm giai đoạn
          </Button>
        </div>
      )}
    </div>
  );
}