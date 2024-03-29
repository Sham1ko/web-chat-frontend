import { SignInCredentials } from "@/contexts/AuthContext";
import ApiService from "./ApiService";

export default class AuthService {
  static async login(credentials: SignInCredentials) {
    try {
      return await ApiService.post("/auth/login", credentials).then(
        (res) => res.data
      );
    } catch (error) {
      throw new Error("Failed to login");
    }
  }

  static async logout() {
    try {
      return await ApiService.post("/auth/logout");
    } catch (error) {
      throw new Error("Failed to logout");
    }
  }
}
