import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  async function login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  }

  async function register(name, email, password) {
    const res = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}