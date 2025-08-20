import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // backend should now return { id, name, email, picture }
        setUser(res.data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // ⬇️ for when you sign in with Google directly and want to set user + token
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/auth"; // redirect back to auth page
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using auth in components
export function useAuth() {
  return useContext(AuthContext);
}
