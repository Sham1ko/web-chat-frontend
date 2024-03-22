import { API_URL } from "@/config";
import axios from "axios";

const publicApiService = axios.create({
  baseURL: API_URL,
});

export default publicApiService;
