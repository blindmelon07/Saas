import axiosInstance from "@/app/config/axiosConfig";
import { useStorageState } from "@/hooks/useStorageState";
import axios from "axios";
import { router } from "expo-router";
import { createContext, type PropsWithChildren, useContext, useEffect } from "react";


interface User {
    id: string;
      name: string;
    email: string;
    email_verified_at: string | null;
    credits: number | null;

}
interface AuthContextType {
   signIn:(token: string, user: User) => Promise<void>;
   signOut: () => Promise<void>;
   session?: string | null;
    user?: User | null;
    isLoading?: boolean;
    updateUser: (userData: any) => Promise<void>;
}
const AuthContext = createContext<AuthContextType>({

    signIn: async () => {},
    signOut: async () => {},
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
export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[, user], setUser] = useStorageState('user');

    const handleSignOut = async () =>{
        try {
            if (session) {
                await axiosInstance.post('/api/logout', null, {
                    headers: {
                        'Authorization': `Bearer ${session}`
                    }

                });
                setSession(null);
                setUser(null);
                router.replace('/signIn');
            }
        } catch (error) {
            console.error("Error during sign out:", error);
        }

    };
    const loadUserInfo = async (token: string) => {
        try {
            const response = await axiosInstance.get('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(JSON.stringify(response.data));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setSession(null);
                setUser(null);
                router.replace('/signIn');
        }else {
 console.error("Error fetching user data:", error);
        }
        }
    };
    useEffect(() => {
        if (session) {
            loadUserInfo(session);
        } else {
            setUser(null);
        }
    }, [session]);
    const parsedUser = user ? (() => {
        try {
            return JSON.parse(user);
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    })() : null;
    const handleUpdateUser = async (userData: any) => {
        try {
            const userString = JSON.stringify(userData);
            setUser(userString);
        } catch (error) {
            console.error("Error updating user data:", error);
            throw error;
        }
    };
    const handleSignIn = async  (token: string, userData: User) => {
    try {
        setSession(token);
           setUser(JSON.stringify(userData));
    } catch (error) {
        console.error("Error during sign in:", error);
        throw error;
    }
    };
    return (
        <AuthContext.Provider
            value={{
              signIn: handleSignIn,
              signOut: handleSignOut,
                session,
                user: parsedUser,
                isLoading,
                updateUser: handleUpdateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}