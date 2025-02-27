import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Function to refresh the token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    try {
        const response = await axios.post(`${API_BASE_URL}/refresh/`, {
            refresh: refreshToken,
        });
        localStorage.setItem("access_token", response.data.access);
        return response.data.access;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

// Function to make authenticated requests with automatic token refresh
const apiRequest = async (method, url, data = null) => {
    let token = localStorage.getItem("access_token");
    let headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const response = await axios({ method, url: `${API_BASE_URL}${url}`, data, headers });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Token expired, refreshing...");
            token = await refreshToken();
            if (token) {
                headers = { Authorization: `Bearer ${token}` };
                return axios({ method, url: `${API_BASE_URL}${url}`, data, headers }).then((res) => res.data);
            }
        }
        throw error;
    }
};

// Replace all API calls with apiRequest
export const getCompanies = async () => apiRequest("get", "/companies/");
export const getDepartments = async () => apiRequest("get", "/departments/");
export const getEmployees = async () => apiRequest("get", "/employees/");
export const addCompany = async (companyData) => apiRequest("post", "/companies/", companyData);
export const addDepartment = async (departmentData) => apiRequest("post", "/departments/", departmentData);
export const addEmployee = async (employeeData) => apiRequest("post", "/employees/", employeeData);
export const updateDepartment = async (id, updatedData) => apiRequest("patch", `/departments/${id}/`, updatedData);
export const updateEmployee = async (id, updatedData) => apiRequest("patch", `/employees/${id}/`, updatedData);
export const deleteCompany = async (companyId) => apiRequest("delete", `/companies/${companyId}/`);
export const deleteDepartment = async (id) => apiRequest("delete", `/departments/${id}/`);
export const deleteEmployee = async (id) => apiRequest("delete", `/employees/${id}/`);
