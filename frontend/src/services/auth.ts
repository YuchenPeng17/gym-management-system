
export interface UserInfo {
    username: string;
    name: string;
    role: "admin" | "member";
}

export const fetchUser = async (): Promise<UserInfo | null> => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        return data.data;
    } catch (error) {
        return null;
    }
};

export const getToken = (): string | null => {
    return localStorage.getItem("access_token");
};