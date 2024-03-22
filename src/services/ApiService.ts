import axios from "axios";
import { API_URL } from "@/config";
import { setupInterceptors } from "./interceptors";

const ApiService = setupInterceptors(
  axios.create({
    baseURL: API_URL,
    withCredentials: true,
  })
);

export default ApiService;
