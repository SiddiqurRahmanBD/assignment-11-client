import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://assignment-11-server-pi-lac.vercel.app",
});

const useAxios = () => {
    return axiosInstance;
};


export default useAxios;