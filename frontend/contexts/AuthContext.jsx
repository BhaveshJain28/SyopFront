import React, { createContext, useContext, useState, useEffect, Children } from "react";
import axios from "axios";
export const AuthContext = createContext(null);

const backendUrl = "http://localhost:3000";

// Create a special Axios instance for protected API calls
const authApi = axios.create({
    baseURL: `${backendUrl}/api`,
})

// Axios Request Interceptor
// This will attach the access token to every outgoing request
authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Axios Response Interceptor
// This will handle expired tokens and try to refresh them
authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Check for a 401 Unauthorized status and ensure it's not a refresh loop
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call the refresh token endpoint to get a new token
                // This is a separate, unprotected endpoint
                const response = await axios.post(`${backendUrl}/api/user/refresh-token`);

                const newAuthToken = response.data.accessToken;
                localStorage.setItem("authToken", newAuthToken);

                // Update the header of the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;

                // Retry the original failed request with the new token
                return authApi(originalRequest);
            } catch (refreshError) {
                // If the refresh token also fails, clear the token and log the user out
                localStorage.removeItem("authToken");
                // You might want to redirect to the login page here
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        return !!localStorage.getItem("authToken");
    });
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("authUser");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    const token = localStorage.getItem("authToken");

    const fetchProfile = async () => {
        try {
            const res = await authApi.get("/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(res.data.user);
            setIsLogin(true);
            localStorage.setItem("authUser", JSON.stringify(res.data.user));
        }
        catch (error) {
            console.error("Failed to fetch profile:", error);
            setIsLogin(false);
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUser");
        }
    }

    useEffect(() => {
        if (token) {
            fetchProfile();
        } else {
            setIsLogin(false);
            setUser(null);
        }
    }, [token])

    const login = (userData, userToken) => {
        setIsLogin(true);
        setUser(userData);
        localStorage.setItem("authToken", userToken);
        localStorage.setItem("authUser", JSON.stringify(userData));
    };
    
    const logout = () => {
        setIsLogin(false);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
    };

    return (
        <AuthContext.Provider value={{ isLogin, user, login, logout, token, backendUrl }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UseAuth = () => {
    return useContext(AuthContext);
}



