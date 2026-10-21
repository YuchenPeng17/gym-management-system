// 侧边栏组件
// 1. 如果检测到未登录，则不显示。没有 access_token 或者 access_token 过期。
// 2. 管理员侧边栏：仪表盘、用户管理、课程管理、报名管理、器械管理
// 3. 普通用户侧边栏：仪表盘、我的课程、个人信息

import { NavLink } from "react-router";
import "./Sidebar.css";
import { useUser } from "@/context/UserContext";

export const Sidebar = () => {
    const { user } = useUser();
    // 未登录 / 没有用户信息时，不显示 Sidebar
    if (!user || !user.role) {
        return null;
    }

    return (
        <aside className="app-sidebar">
            <a className="sidebar-brand" href="/dashboard">
                <span className="sidebar-brand-mark">P</span>
                <span className="sidebar-brand-copy">
                    <strong>PulseGym</strong>
                    <small>Management</small>
                </span>
            </a>

            <nav className="sidebar-nav" aria-label="Main navigation">

                {/* 管理员菜单 */}
                {user.role === "admin" && (
                    <>
                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/dashboard">
                                Dashboard
                            </NavLink>
                        </div>

                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/courses">
                                Course Management
                            </NavLink>
                        </div>

                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/users">
                                User Management
                            </NavLink>
                        </div>

                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/enrollments">
                                Enrollment Management
                            </NavLink>
                        </div>
                    </>
                )}

                {/* 普通用户菜单 */}
                {user.role === "member" && (
                    <>

                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/dashboard-member">
                                Dashboard
                            </NavLink>
                        </div>

                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/courses">
                                Course Management
                            </NavLink>
                        </div>
                        
                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/my-enrollments">
                                My Enrollments
                            </NavLink>
                        </div>

                        <div className="sidebar-nav-group">
                            <NavLink className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} to="/profile">
                                Profile
                            </NavLink>
                        </div>
                    </>
                )}
            </nav>
        </aside>
    );
};