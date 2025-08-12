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
export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[, user], setUser] = useStorageState('user');

    const updateUser = async (userData: any) => {
        await setUser(userData);
    };

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
                router.replace('/sign-in');
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
                router.replace('/sign-in');
        }else {
 console.error("Error fetching user data:", error);
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
    const hadleUpdateUser = async (userData: any) => {
        try {
            const userString = JSON.stringify(userData);
            await setUser(userString);
        } catch (error) {
            console.error("Error updating user data:", error);
            throw error;
        }
    };
    const handleSignIn = (token: string, userData: User) => {
    try {
        await setSession(token);
           await setUser(JSON.stringify(userData));
    } catch (error) {
        console.error("Error during sign in:", error);
        throw error;
    }
    };
    return (
        <AuthContext.Provider
            value={{
              
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}