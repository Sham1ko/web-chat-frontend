import { AuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { Props } from "./AuthProvider";

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: null,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
