import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  console.log(decoded);
  return decoded.exp > currentTime;
};

const saveTokensToStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken, { httpOnly: false });
};

const removeCookiesFromStorage = () => {
  localStorage.removeItem("accessToken");
  Cookies.remove("refreshToken");
};

const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = (): string | undefined => {
  return Cookies.get("refreshToken");
};

export {
  isValidToken,
  saveTokensToStorage,
  removeCookiesFromStorage,
  getAccessToken,
  getRefreshToken,
};
