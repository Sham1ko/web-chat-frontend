import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/ApiService";
import { AuthContext, SignInCredentials, User } from "@/contexts/AuthContext";
import {
  getAccessToken,
  removeCookiesFromStorage,
  saveTokensToStorage,
} from "@/utils/jwt";
import { setAuthorizationHeader } from "@/services/interceptors";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
  const navigate = useNavigate();

  const token = getAccessToken();
  const isAuthenticated = Boolean(token);

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken, userData } = response.data;
      saveTokensToStorage(accessToken, refreshToken);
      setUser(userData);
      setLoadingUserData(false);
    } catch (error: any) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const signOut = () => {
    removeCookiesFromStorage();
    setUser(undefined);
    setLoadingUserData(false);
    navigate("/auth/login");
  };

  useEffect(() => {
    if (!token) {
      removeCookiesFromStorage();
      setUser(undefined);
      setLoadingUserData(false);
    }
  }, [token]);

  useEffect(() => {
    const accessToken = getAccessToken();

    async function getUserData() {
      setLoadingUserData(true);

      try {
        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userData = response.data;
        setUser(userData);
        setLoadingUserData(false);
      } catch (error: any) {
        console.error("Failed to fetch user data:", error.message);
        removeCookiesFromStorage();
        setLoadingUserData(false);
      }
    }

    if (token) {
      setAuthorizationHeader({ request: api.defaults, accessToken });
      getUserData();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
