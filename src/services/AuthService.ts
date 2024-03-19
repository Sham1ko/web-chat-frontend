import api from "./api";

export default class AuthService {
  static async login(username: string, password: string) {
    try {
      return await api
        .post(
          "/auth/login",
          JSON.stringify({ username: username, password: password })
        )
        .then((res) => res.data);
    } catch (error) {
      throw new Error("Failed to login");
    }
  }
}
