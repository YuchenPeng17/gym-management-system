// 检查是否已登录，如果未登录则重定向到登录页面，否则渲染主布局
// 主布局包含 sidebar，header 和内容区域。将 current user 作为 prop 传递给子组件。

import { Header } from "@/components/Header/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import type { UserInfo } from "@/services/auth";
import { fetchUser } from "@/services/auth";
import { UserContext } from "@/context/UserContext";

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import "./MainLayout.css";

export const MainLayout = () => {
  // 定义 current user 状态
  const [user, setUser] = useState<UserInfo | null>(null);
  // 定义导航对象
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;
    // 检查用户是否已登录的逻辑
    const getCurrentUser = async () => {
      const currentUser = await fetchUser();
      if (!isActive) return;

      if (!currentUser) {
        navigate("/login", { replace: true });
        return;
      }
      setUser(currentUser);
    };
    void getCurrentUser();
    
    return () => {
      isActive = false;
    };
    
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user }}>
      <div className="app-layout">
        <Sidebar />

        <div className="app-main">
          <Header />

          <main className="app-content">
            <Outlet />
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
};