import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface BudgetAllocation {
  channel: string;
  amount: number;
}

interface BudgetAllocationEditorProps {
  initialAllocations: BudgetAllocation[];
  approvedBudget: number;
  onSave?: (allocations: BudgetAllocation[]) => void;
}

export default function BudgetAllocationEditor({
  initialAllocations,
  approvedBudget,
  onSave,
}: BudgetAllocationEditorProps) {
  const [allocations, setAllocations] = useState<BudgetAllocation[]>(initialAllocations);
  const [isEditing, setIsEditing] = useState(false);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseNumber = (str: string) => {
    return parseInt(str.replace(/,/g, '')) || 0;
  };

  const calculateTotalBudget = () => {
    return allocations.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculatePercentage = (amount: number) => {
    const total = calculateTotalBudget();
    if (total === 0) return '0%';
    return Math.round((amount / total) * 100) + '%';
  };

  const handleAmountChange = (index: number, value: string) => {
    const newAllocations = [...allocations];
    newAllocations[index].amount = parseNumber(value);
    setAllocations(newAllocations);
  };

  const handleChannelChange = (index: number, value: string) => {
    const newAllocations = [...allocations];
    newAllocations[index].channel = value;
    setAllocations(newAllocations);
  };

  const handleAddChannel = () => {
    setAllocations([...allocations, { channel: '', amount: 0 }]);
  };

  const handleRemoveChannel = (index: number) => {
    const newAllocations = allocations.filter((_, i) => i !== index);
    setAllocations(newAllocations);
  };

  const handleSave = () => {
    onSave?.(allocations);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setAllocations(initialAllocations);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-300 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
          Phân bổ ngân sách theo kênh
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
              Kênh
            </th>
            <th className="text-right py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
              Ngân sách
            </th>
            <th className="text-right py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)' }}>
              Tỷ lệ
            </th>
            {isEditing && (
              <th className="text-center py-2 px-3 text-gray-600" style={{ fontSize: 'var(--text-xs)', width: '60px' }}>
                Xóa
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {allocations.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-3">
                {isEditing ? (
                  <Input
                    type="text"
                    value={item.channel}
                    onChange={(e) => handleChannelChange(index, e.target.value)}
                    className="border-gray-300 h-8"
                    placeholder="Tên kênh"
                  />
                ) : (
                  <span className="text-gray-600">{item.channel}</span>
                )}
              </td>
              <td className="py-2 px-3 text-right">
                {isEditing ? (
                  <Input
                    type="text"
                    value={formatNumber(item.amount)}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    className="border-gray-300 h-8 text-right"
                    placeholder="0"
                  />
                ) : (
                  <span className="text-gray-600">{formatNumber(item.amount)} ₫</span>
                )}
              </td>
              <td className="py-2 px-3 text-gray-600 text-right">
                {calculatePercentage(item.amount)}
              </td>
              {isEditing && (
                <td className="py-2 px-3 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveChannel(index)}
                    className="h-10 w-10 p-0 hover:bg-red-50"
                  >
                    <Trash2 className="w-8 h-8" style={{ color: '#dc2626', strokeWidth: 2 }} />
                  </Button>
                </td>
              )}
            </tr>
          ))}
          <tr className="bg-gray-50">
            <td className="py-2 px-3 text-gray-600" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              Tổng cộng
            </td>
            <td className="py-2 px-3 text-gray-600 text-right" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              {formatNumber(calculateTotalBudget())} ₫
            </td>
            <td className="py-2 px-3 text-gray-600 text-right" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              100%
            </td>
            {isEditing && <td></td>}
          </tr>
        </tbody>
      </table>

      {isEditing && (
        <div className="mt-2 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddChannel}
            className="h-8"
          >
            <Plus className="w-3 h-3 mr-1" />
            Thêm kênh
          </Button>
        </div>
      )}

      {isEditing && calculateTotalBudget() !== approvedBudget && (
        <div className="mt-2 p-2 bg-amber-50 border border-amber-300 rounded">
          <span className="text-amber-600" style={{ fontSize: 'var(--text-xs)' }}>
            ⚠️ Tổng phân bổ ({formatNumber(calculateTotalBudget())} ₫) khác với ngân sách được duyệt ({formatNumber(approvedBudget)} ₫)
          </span>
        </div>
      )}
    </div>
  );
}