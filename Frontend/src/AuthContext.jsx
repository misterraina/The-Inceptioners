
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await fetch("", {
                    method: "GET",
                    credentials: "include", // Include cookies in requests
                });

                if (response.ok) {
                    setIsAuthenticated(true); // Token is valid
                } else {
                    setIsAuthenticated(false); // Token is invalid or expired
                }
            } catch (error) {
                console.error("Error validating token:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Remove loading state
            }
        };

        validateToken();
    }, []);

    const login = () => setIsAuthenticated(true);
    const logout = async () => {
        try {
            const response = await fetch('', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });
    
            if (response.ok) {
                setIsAuthenticated(false);
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    

    if (loading) {
        // Render a loading spinner or placeholder while verifying token
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);