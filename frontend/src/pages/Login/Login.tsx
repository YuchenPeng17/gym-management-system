// 登录页面
// 1. 检测用户是否登录，如果登录了，给一个跳转到 Dashboard 页面的按钮。后续改为直接跳转。
// 2. 用户输入用户名和密码进行登录，登录成功后将 access_token 存储到 localStorage 中。

import { useActionState, useEffect } from "react"
import { useNavigate } from "react-router"
import "./Login.css"
// 1. 定义用户登录 interface 和 用户数据
interface LoginUserInterface {
    username: string,
    name: string,
    role: string,
}

// 2. 定义 action 状态
type LoginState = {
    status: "idle" | "success" | "error",
    message: string,
    accessToken: string | null,
    user: LoginUserInterface | null,

}

// 3. 定义初始状态
const initialLoginState: LoginState = {
    status: "idle",
    message: "",
    accessToken: null,
    user: null,
}

export const Login = () => {

    // 4. 定义登录 action 函数
    const loginAction = async (_prevState: LoginState, formData: FormData): Promise<LoginState> => {
        const payload = {
            username: formData.get("username"),
            password: formData.get("password"),
        }
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        const result = await response.json();
        if (!response.ok) {
            return {
                status: "error",
                message: result.message,
                accessToken: null,
                user: null,
            }
        }
        // 将 access_token 存储到 localStorage 中
        localStorage.setItem("access_token", result.data.access_token)
        return {
            status: "success",
            message: result.message,
            accessToken: result.data.access_token,
            user: result.data.user,
        }
    }
    // 5. 通过 登录 action 函数和初始状态，注册 useActionState 钩子
    const [state, action, isPending] = useActionState(loginAction, initialLoginState);

    const navigate = useNavigate();
    useEffect(() => {
        if (state.status !== "success" || !state.user) return;
        if (state.user.role === "member") {
        navigate("/dashboard-member", { replace: true });
    } else if (state.user.role === "admin") {
        navigate("/dashboard", { replace: true });
    }
    }, [state.status, state.user, navigate]);

    return (
        <div className="login-page">
            <section className="login-card">
            <h3 className="login-title">Login</h3>
            <form className="login-form" action={action}>
                <div className="login-field">
                    <label htmlFor="username">Username: </label>
                    <input required type="text" id="username" name="username" />
                </div>
                <div className="login-field">
                    <label htmlFor="password">Password: </label>
                    <input required type="password" id="password" name="password" />
                </div>
                <div className="login-actions">
                    <button type="submit" disabled={isPending}>Login</button>
                </div>

            </form>
            </section>
        </div>
    );
}