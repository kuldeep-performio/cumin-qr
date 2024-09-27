import axios from "axios";

const AUTH_URL = "http://localhost:8000/api/v1";
const REFRESH_TOKEN_URL = `${AUTH_URL}/users/refresh-token`;

const axiosInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 10000, // Increase timeout for production
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('error: ', error);
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "Token expired"
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // Handle case when refreshToken is not available
          // Redirect user to login page or display appropriate message
          console.error("Refresh token not available.");
          return Promise.reject(error);
        }
        const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken });
        console.log('response: ', response);
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error
        // Redirect user to login page or display appropriate message
        console.error("Error refreshing token:", refreshError);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
};

export default api;
