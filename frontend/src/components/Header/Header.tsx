// 在组件挂载时用 local storage 的 access_token 向后端请求用户信息，请求路径为 /api/users/me
// 如果请求失败了，或者什么都没有返回，则认为用户未登录
import "./Header.css";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router";


export const Header = () => {

    const { user } = useUser();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("access_token");
        navigate("/login", { replace: true });
    };

    return (
        <header className="app-header">
            <div className="header-context">
                <span className="header-context-label">PulseGym Central</span>
                <span className="header-context-status"><span /> Operational</span>
            </div>
            <div className="header-account">
                {user ? (
                    <>
                        <span className="header-role">
                            {user.role}
                        </span>
                        <div className="header-user-copy">
                            <span className="header-user-name">{user.name}</span>
                            <span className="header-user-handle">@{user.username}</span>
                        </div>
                        <span className="header-avatar" aria-hidden="true">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                        <button className="header-logout" onClick={logout}>
                            退出登录
                        </button>
                    </>
                ) : (
                    <span className="header-signed-out">
                        未登录 <a href="/login">去登录</a>
                    </span>
                )}
            </div>
        </header>
    );
}