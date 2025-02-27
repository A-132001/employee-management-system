import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
        if (response.status === 200) {
            const tokenPayload = JSON.parse(atob(response.data.access.split(".")[1]));
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("user_role", "admin");
            // console.log(tokenPayload.role)
            return response.data;
        } else {
            throw new Error("Invalid credentials");
        }

    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    // window.location.reload(); // Refresh page to apply changes
};

export const getUserRole = () => {
    return localStorage.getItem("user_role");
};

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem("access_token");
    return !!accessToken && !isTokenExpired(accessToken);
};

const isTokenExpired = (token) => {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = tokenPayload.exp * 1000;
    return Date.now() > expirationTime;
};