import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { userApi } from "@/services/userApi";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //Check for existing logged in user
    const storeUser = localStorage.getItem("currentUser");
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
  }, []);
  // Verifies login details and if correct sets user as currentUser
  const login = async (email: string, password: string): Promise<string> => {
    try {
      const loggedInUser = await userApi.loginUser({ email, password });
      if (!loggedInUser) {
        return "Invalid";
      }
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return loggedInUser.role;
    } catch (error) {
      console.error("Login failed", error);
      return "Invalid";
    }
  };
  // When logout button is clicked logs out user and removes currentUser and details
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
