import type { UserInfo } from "@/services/auth";
import { createContext, useContext } from "react";

interface UserContextType {
    user: UserInfo | null;
}

export const UserContext = createContext<UserContextType>({
    user: null,
});

export const useUser = () => {
    return useContext(UserContext);
};