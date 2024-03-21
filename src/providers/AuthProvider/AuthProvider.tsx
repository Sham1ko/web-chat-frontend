import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { AuthContext, SignInCredentials, User } from "@/contexts/AuthContext";
import {
  getAccessToken,
  removeCookiesFromStorage,
  saveTokensToStorage,
} from "@/lib/jwt";

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

  useEffect(() => {}, []);
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
