import axios from "axios";

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosAuth.get(`/auth/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("access_token", response.data.access_token);
        axiosAuth.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.access_token;

        originalRequest.headers["Authorization"] =
          "Bearer " + response.data.access_token;
        return axiosAuth(originalRequest);
      } catch (error) {
        localStorage.removeItem("access_token");
        window.location.href = "/signIn";
        console.error("Could not refresh access token:", error);
        return Promise.reject(error);
      }
    }
  }
);

export default axiosAuth;
