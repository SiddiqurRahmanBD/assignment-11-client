import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

// Create instance outside the hook to prevent multiple instances
const axiosSecure = axios.create({
  baseURL: "https://assignment-11-server-pi-lac.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. REQUEST INTERCEPTOR
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // Look for the token in the user object OR localStorage as a fallback
        const token = user?.accessToken || localStorage.getItem("access-token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 2. RESPONSE INTERCEPTOR
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response?.status;

        // If the server says Unauthorized or Forbidden, log the user out
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // 3. CLEANUP: Remove interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
