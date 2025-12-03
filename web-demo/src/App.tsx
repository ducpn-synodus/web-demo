import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import VendorLayout from "./components/VendorLayout";
import Layout from "./components/Layout";
import { LOGIN_USERS } from "./auth/users";
import Dashboard from "./components/noibo/Dashboard";

type UserRole = "vendor" | "noibo" | "phongtuyenthong";
type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};


export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser;
        queueMicrotask(() => setUser(parsed));
      }
    } catch (err) {
      console.log('err', err)
      // ignore parse errors
    }
  }, []);

  const handleLogin = (u: AuthUser) => {
    setUser(u);
    console.log("Đăng nhập thành công:", u.role);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth");
      localStorage.removeItem("rememberMe");
    } catch (err) {
      console.log('err', err)
      // ignore storage errors
    }
    setUser(null);
    console.log("Đã đăng xuất và xoá dữ liệu localStorage");
  };

  if (!user) {
    return <LoginPage users={LOGIN_USERS} onLogin={handleLogin} />;
  }

  if (user.role === "vendor") {
    return <VendorLayout onLogout={handleLogout} />;
  }

  if (user.role === "noibo") {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <Layout onMenuChange={() => {}} onLogout={handleLogout}>
      <div className="p-6">
        <h2 className="text-gray-700 mb-2">Xin chào, {user.name}</h2>
        <p className="text-gray-600">
          Tài khoản hiện tại thuộc vai trò <span className="font-medium">{user.role}</span>.
        </p>
        <p className="text-gray-600 mt-2">Giao diện dành cho vai trò này đang được chuẩn bị.</p>
      </div>
    </Layout>
  );
}
