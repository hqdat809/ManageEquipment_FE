import axios from "axios";

const instance = axios.create({
  baseURL: "https://manageequipment-production.up.railway.app/api", // Replace with your API URL
  timeout: 10000, // Set request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If response status is 401 (Unauthorized) and we haven't already started token refresh
    const data: any = error?.response?.data;
    const message = data?.message;

    if (message) throw new Error(message);

    // If token refresh failed or there was another error, reject the request
    return Promise.reject(error);
  }
);

export { instance as ApiClient };
