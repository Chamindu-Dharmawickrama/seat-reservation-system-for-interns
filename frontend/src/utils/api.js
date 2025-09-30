import axios from "axios";

// Create axios instance with default configuration
//Requests that take longer than 10 seconds (10,000 ms) will fail automatically
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add auth token
// Runs before every request leaves
// Adding Authorization token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
// Runs after the server responds
//If the request succeeds, it just returns the response
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // If the response has a status code 401
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        // For other errors it just rejects the promise
        return Promise.reject(error);
    }
);

export default api;
