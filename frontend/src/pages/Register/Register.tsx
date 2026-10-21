// 用户注册页面
// 卡片：注册标题 -> 用户名字+用户名+密码 -> 创建按钮 -> 已有账户登录

import { useActionState, useEffect } from "react"
import { useNavigate } from "react-router"
import "./Register.css"

// 1. 注册结果状态
type RegisterState = {
    success: boolean,
    errorMessage?: string,
}

// 3. 初始注册状态
const initialRegisterState: RegisterState = {
    success: false,
}

export const Register = () => {

    // 2. 注册动作处理函数
    async function registerAction(_prevState: RegisterState, formData: FormData){
        const payload = {
            name: formData.get("name"),
            username: formData.get("username"),
            password: formData.get("password"),
        }
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                errorMessage: errorData.message || "Registration failed",
            }
        }

        return {
            success: true,
        }
    }

    // 4. 使用注册动作和初始状态初始化动作状态钩子
    const [state, action, isPending] = useActionState(registerAction, initialRegisterState)
    const navigate = useNavigate()

    // 注册成功后跳转登录页，useActionState 不会自动导航，需手动触发
    useEffect(() => {
        if (state.success) {
            navigate("/login")
        }
    }, [state.success, navigate])

    return (
        <div className="register-page">
            <div id="register-card" className="register-card">
                <h3 className="register-title">Create Account</h3>
                <form className="register-form" action={action}>
                    <div className="register-field">
                        <label htmlFor="name">Full Name: </label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className="register-field">
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="register-field">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div className="register-actions">
                        <button disabled={isPending} type="submit">{isPending ? "Creating Account..." : "Create Account"}</button>
                    </div>
                    {state.errorMessage && <p className="register-error" role="alert">{state.errorMessage}</p>}

                </form>
            <div className="register-footer">
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
            </div>
        </div>
    );
}