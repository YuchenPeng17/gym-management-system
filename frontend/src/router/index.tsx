// 配置 React Router
import type { RouteObject } from 'react-router'
import { createBrowserRouter } from 'react-router'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Register/Register'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { DashboardMember } from '../pages/DashboardMember/DashboardMember'
import { MainLayout } from '@/pages/MainLayout'
import { Courses } from '@/pages/Courses/Courses'
import { Enrollments } from '@/pages/Enrollments/Enrollments'
import { Users } from '@/pages/Users/Users'
import { CoursesMember } from '@/pages/CoursesMember/CoursesMember'

// 1. 定义路由配置
const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "dashboard-member", element: <DashboardMember /> },
            { path: "courses", element: <Courses /> },
            { path: "my-enrollments", element: <CoursesMember /> },
            { path: "enrollments", element: <Enrollments /> },
            { path: "users", element: <Users /> },
        ],
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
]

// 2. 创建并导出路由配置
export const router = createBrowserRouter(routes)

// 3. 在 app.tsx 中通过 RouterProvider 使用路由