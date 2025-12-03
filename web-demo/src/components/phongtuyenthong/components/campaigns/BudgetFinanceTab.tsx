import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Edit,
  Save,
  X,
  PieChart as PieChartIcon,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface BudgetFinanceTabProps {
  campaignName: string;
}

// Mock data - Chi phí theo loại
const costByTypeData = [
  { name: 'Facebook Ads', value: 280000000, color: '#1877f2' },
  { name: 'Production', value: 120000000, color: '#8b5cf6' },
  { name: 'Agency Fee', value: 80000000, color: '#f59e0b' },
  { name: 'KOL/Influencer', value: 20000000, color: '#10b981' },
];

// Mock data - Kế hoạch vs Thực tế
const planVsActualData = [
  { category: 'FB Ads', planned: 350000000, actual: 280000000 },
  { category: 'Production', planned: 150000000, actual: 120000000 },
  { category: 'Agency', planned: 100000000, actual: 80000000 },
  { category: 'KOL', planned: 50000000, actual: 20000000 },
  { category: 'Khác', planned: 150000000, actual: 0 },
];

// Mock data - Trendline theo tháng
const monthlyTrendData = [
  { month: 'T12/2025', planned: 150000000, actual: 120000000, revenue: 800000000 },
  { month: 'T1/2026', planned: 400000000, actual: 280000000, revenue: 1500000000 },
  { month: 'T2/2026', planned: 250000000, actual: 100000000, revenue: 900000000 },
];

export default function BudgetFinanceTab({ campaignName }: BudgetFinanceTabProps) {
  const [isEditingRevenue, setIsEditingRevenue] = useState(false);
  const [revenue, setRevenue] = useState(3200000000);
  const [tempRevenue, setTempRevenue] = useState('3200000000');
  const [showRevenueDialog, setShowRevenueDialog] = useState(false);

  // Budget data
  const originalBudget = 800000000;
  const adjustedBudget = 750000000; // Điều chỉnh giảm
  const actualCost = 500000000;
  const budgetAdjustment = adjustedBudget - originalBudget;
  const burnRate = (actualCost / originalBudget) * 100;
  const variance = adjustedBudget - actualCost;
  const variancePercent = ((variance / adjustedBudget) * 100);
  const roi = ((revenue - actualCost) / actualCost) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
  };

  const handleSaveRevenue = () => {
    setRevenue(parseFloat(tempRevenue));
    setIsEditingRevenue(false);
    setShowRevenueDialog(false);
  };

  const handleCancelEdit = () => {
    setTempRevenue(revenue.toString());
    setIsEditingRevenue(false);
    setShowRevenueDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ngân sách */}
        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 rounded-xl flex items-center justify-center border border-gray-200">
                <DollarSign className="size-6 text-gray-600" />
              </div>
              {budgetAdjustment !== 0 && (
                <Badge variant="outline" className="gap-1 border-gray-200 text-gray-700">
                  {budgetAdjustment > 0 ? '+' : ''}{formatCurrency(budgetAdjustment)}
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">Ngân sách gốc</div>
                <div className="text-xl text-gray-900">{formatCurrency(originalBudget)}</div>
              </div>
              {budgetAdjustment !== 0 && (
                <div>
                  <div className="text-xs text-gray-500">Ngân sách điều chỉnh</div>
                  <div className="text-lg text-gray-900">{formatCurrency(adjustedBudget)}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Chi phí thực tế */}
        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 rounded-xl flex items-center justify-center border border-gray-200">
                <TrendingDown className="size-6 text-gray-600" />
              </div>
              <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
                {burnRate.toFixed(1)}%
              </Badge>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">Chi phí thực tế</div>
                <div className="text-2xl text-gray-900">{formatCurrency(actualCost)}</div>
              </div>
              <div className="text-xs text-gray-600">
                Burn Rate: {burnRate.toFixed(1)}% ngân sách gốc
              </div>
              <Progress value={burnRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Doanh thu */}
        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 rounded-xl flex items-center justify-center border border-gray-200">
                <ArrowUpRight className="size-6 text-gray-600" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTempRevenue(revenue.toString());
                  setShowRevenueDialog(true);
                }}
                className="h-8 w-8 p-0"
              >
                <Edit className="size-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">Doanh thu</div>
                <div className="text-2xl text-gray-900">{formatCurrency(revenue)}</div>
              </div>
              <div className="text-xs text-gray-600">
                Nhập tay / Tracking pixel
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: ROI */}
        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 rounded-xl flex items-center justify-center border border-gray-200">
                <TrendingUp className="size-6 text-gray-600" />
              </div>
              <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
                {roi > 0 ? '+' : ''}{roi.toFixed(1)}%
              </Badge>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500">ROI</div>
                <div className="text-2xl text-gray-900">
                  {roi.toFixed(1)}%
                </div>
              </div>
              <div className="text-xs text-gray-600">
                Lợi nhuận: {formatCurrency(revenue - actualCost)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Variance Analysis */}
      <Card className="border-2" style={{ borderColor: '#006885' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            Phân tích chênh lệch dự toán - thực tế
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ngân sách điều chỉnh</span>
                <span className="text-sm font-medium">{formatCurrency(adjustedBudget)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Chi phí thực tế</span>
                <span className="text-sm font-medium">{formatCurrency(actualCost)}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Chênh lệch</span>
                <div className="flex items-center gap-2">
                  {variance > 0 ? (
                    <ArrowDownRight className="size-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="size-4 text-red-600" />
                  )}
                  <span className={`font-medium ${variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(variance))}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">% Sử dụng ngân sách</span>
                  <span className="text-sm font-medium">{(100 - variancePercent).toFixed(1)}%</span>
                </div>
                <Progress value={100 - variancePercent} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">% Còn lại</span>
                  <span className="text-sm font-medium text-green-600">{variancePercent.toFixed(1)}%</span>
                </div>
                <Progress value={variancePercent} className="h-2" style={{ backgroundColor: '#d1fae5' }} />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: variance > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
                <div className="text-xs text-gray-600 mb-2">Trạng thái</div>
                <Badge className="text-base px-4 py-2" style={{
                  backgroundColor: variance > 0 ? '#10b981' : '#ef4444',
                  color: 'white'
                }}>
                  {variance > 0 ? 'Dưới ngân sách' : 'Vượt ngân sách'}
                </Badge>
                {variance > 0 && (
                  <div className="text-xs text-gray-500 mt-2">
                    Tiết kiệm {variancePercent.toFixed(1)}%
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Chi phí theo loại */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="size-5" />
              Chi phí theo loại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costByTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costByTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {costByTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-600">{item.name}</div>
                    <div className="text-sm font-medium">{formatCurrency(item.value)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart - Kế hoạch vs Thực tế */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Kế hoạch vs Thực tế
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={planVsActualData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="planned" name="Kế hoạch" fill="#94a3b8" />
                <Bar dataKey="actual" name="Thực tế" fill="#006885" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart - Trendline theo tháng */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            Xu hướng theo tháng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="planned" name="Chi phí KH" stroke="#94a3b8" strokeWidth={2} />
              <Line type="monotone" dataKey="actual" name="Chi phí TT" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" name="Doanh thu" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Edit Dialog */}
      <Dialog open={showRevenueDialog} onOpenChange={setShowRevenueDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật doanh thu</DialogTitle>
            <DialogDescription>
              Nhập doanh thu thực tế từ chiến dịch này
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Doanh thu (VNĐ)</Label>
              <Input
                type="number"
                value={tempRevenue}
                onChange={(e) => setTempRevenue(e.target.value)}
                placeholder="Nhập doanh thu"
              />
              <div className="text-xs text-gray-500">
                Preview: {formatCurrency(parseFloat(tempRevenue) || 0)}
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={handleCancelEdit}>
                <X className="size-4 mr-2" />
                Hủy
              </Button>
              <Button onClick={handleSaveRevenue} style={{ backgroundColor: '#006885' }}>
                <Save className="size-4 mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Note */}
      <Card className="border-2 border-blue-200" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-600 mt-0.5" />
            <div className="flex-1 text-sm text-gray-700">
              <strong className="text-blue-900">Lưu ý:</strong> Chi phí thực tế sẽ tự động cập nhật khi liên kết với module Payment & Contract. 
              Hiện tại đang sử dụng dữ liệu nhập tay. Doanh thu có thể được tracking tự động qua Facebook Pixel hoặc nhập thủ công.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
