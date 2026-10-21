import { useNavigate } from 'react-router';
export const useNavigateToLogin = () => {
    const navigate = useNavigate();
    navigate('/login', { replace: true });
}

export const baseURL = import.meta.env.VITE_API_BASE_URL;