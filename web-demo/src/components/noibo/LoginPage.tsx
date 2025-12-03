import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#006885] via-[#007a9a] to-[#008eb0] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006885]/90 via-[#007a9a]/70 to-[#008eb0]/60 z-10" />
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1565444007614-6b38c78224df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHN1bnNldCUyMGZsaWdodHxlbnwxfHx8fDE3NjM5NDAwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Vietnam Airlines"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="relative z-20 flex flex-col justify-between p-12 text-white w-full">
          <div>
            {/* Vietnam Airlines Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                <ImageWithFallback 
                  src="https://careerfinder.vn/wp-content/uploads/2020/05/vietnam-airline-logo.jpg"
                  alt="Vietnam Airlines"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-2xl tracking-tight">VIETNAM AIRLINES</div>
                <div className="text-sm opacity-90">SẢI CÁNH VƯƠN CAO</div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-5xl mb-4 leading-tight font-[Abril_Fatface]">
              Communication<br />Program<br />Management<br />System
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Nền tảng quản lý truyền thông tập trung
            </p>
            <div className="flex gap-4 text-sm opacity-75">
              <div>
                <div className="text-3xl mb-1">300+</div>
                <div>Chiến dịch/năm</div>
              </div>
              <div className="w-px bg-white/30" />
              <div>
                <div className="text-3xl mb-1">15+</div>
                <div>Thị trường</div>
              </div>
              <div className="w-px bg-white/30" />
              <div>
                <div className="text-3xl mb-1">50+</div>
                <div>Thành viên</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1.5 border border-gray-200">
                <ImageWithFallback 
                  src="https://careerfinder.vn/wp-content/uploads/2020/05/vietnam-airline-logo.jpg"
                  alt="Vietnam Airlines"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-xl text-[#006885]">VIETNAM AIRLINES</div>
                <div className="text-xs text-gray-600">Hãng hàng không Quốc gia</div>
              </div>
            </div>
            <div className="text-gray-600">CPMS - Hệ thống quản lý truyền thông</div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <div className="mb-8 text-center">
              <h2 className="text-gray-900 mb-3 text-2xl">Đăng nhập hệ thống</h2>
              <p className="text-gray-600 text-base">Nhập thông tin để truy cập CPMS</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700">
                  Email / Tên đăng nhập
                </label>
                <Input
                  id="email"
                  type="text"
                  placeholder="username@vietnamairlines.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="h-12"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-700">
                  Mật khẩu
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="h-12"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-gray-700 cursor-pointer select-none text-sm"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <a href="#" className="text-sm text-[#006885] hover:text-[#005670] hover:underline">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-[#006885] hover:bg-[#005670] text-white text-base"
              >
                Đăng nhập
              </Button>
            </form>

            {/* Help Link */}
            <div className="mt-8 text-center">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-700 hover:underline">
                Cần hỗ trợ? Liên hệ IT Support
              </a>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            © 2025 Vietnam Airlines. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </div>
  );
}