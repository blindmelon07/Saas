import { useContext, createContext, type PropsWithChildren, useEffect } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { router } from "expo-router";
import axios from "axios";
import axiosInstance from "@/app/config/axiosConfig";


interface User {
    id: string;
      name: string;
    email: string;
    email_verified_at: string | null;
    credits: number | null;

}
interface AuthContextType {
   singIn:(token: string, user: User) => void;
   signOut: () => void;
   session?: string | null;
    user?: User | null;
    updateUser: (userData: any) => Promise<void>;
}
const AuthContext = createContext<AuthContextType>({

    singIn: () => {},
    signOut: () => {},
    session: null,
    user: null,
    isLoading: false,
    updateUser: async () => {}


});


export function useSession() {
   const value = useContext(AuthContext);
    if (!value) {
         throw new Error("useSession must be used within an AuthProvider");
    }
    return value;
}