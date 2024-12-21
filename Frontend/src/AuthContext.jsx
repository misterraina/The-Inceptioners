import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            const token = Cookies.get("auth_token");
            if (!token) {
                console.warn("No token found in cookies");
                setIsAuthenticated(false);
                setLoading(false)
                return;
            }
        
            try {
                const response = await fetch("http://localhost:3000/api/admins/verify-token", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                    credentials: "include",
                });
        
                if (response.ok) {
                    setIsAuthenticated(true);

                } else {
                    console.warn("Token validation failed");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error during token validation:", error);
                setIsAuthenticated(false);
            } finally{
                setLoading(false)
            }
        };
        
        

        validateToken();
    }, []);

    const login = (token) => {
        Cookies.set("auth_token", token, { expires: 7 }); // Store token in cookies
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admins/logout", {
                method: "POST",
                credentials: "include", // Include cookies
            });

            if (response.ok) {
                Cookies.remove("auth_token");
                setIsAuthenticated(false);
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
