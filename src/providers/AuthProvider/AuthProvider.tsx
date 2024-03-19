import { AuthContext } from "@/contexts/AuthContext";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

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
