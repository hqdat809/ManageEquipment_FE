import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { EAuthToken } from "../interfaces/user-interfaces";
import { SIGNIN } from "../routes/paths";

const instance = axios.create({
  baseURL: "https://manageequipment-production.up.railway.app/api", // Replace with your API URL
  timeout: 10000, // Set request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

const requestHandler = (config: any) => {
  const atk = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

  if (atk) {
    const tempHeaders = {
      ...config.headers,
      Authorization: `Bearer ${atk}`,
    };
    config.headers = tempHeaders;
    config.params = {
      ...config.params,
      version: Date.now(),
    };
  }

  return config;
};

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  try {
    const response = await axios
      .create({
        baseURL: "https://manageequipment-production.up.railway.app/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            EAuthToken.REFRESH_TOKEN
          )}`,
        },
      })
      .post("/v1/auth/refresh", {
        refreshToken: localStorage.getItem(EAuthToken.REFRESH_TOKEN),
      });
    return response.data;
  } catch (error) {
    localStorage.removeItem(EAuthToken.ACCESS_TOKEN);
    localStorage.removeItem(EAuthToken.REFRESH_TOKEN);
    localStorage.removeItem("persist:root");
    window.location.href = SIGNIN;
  }
};

instance.interceptors.request.use(requestHandler, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If response status is 401 (Unauthorized) and we haven't already started token refresh
    if (error.response.status === 403 && !isRefreshing) {
      isRefreshing = true;

      const newAccessToken = await refreshAccessToken();
      failedQueue = [];
      localStorage.setItem(EAuthToken.ACCESS_TOKEN, newAccessToken.token);
      localStorage.setItem(
        EAuthToken.REFRESH_TOKEN,
        newAccessToken.refreshToken
      );

      // Update the Authorization header for the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;

      isRefreshing = false;
      failedQueue = [];
      // Retry the original request
      return instance(originalRequest);
    }

    const data: any = error?.response?.data;
    const message = data?.message;

    if (message) throw new Error(message);

    // If token refresh failed or there was another error, reject the request
    return Promise.reject(error);
  }
);

export { instance as ApiClient };
