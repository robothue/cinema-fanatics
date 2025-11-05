// src/Context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const AuthContext = createContext();

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const EXPIRY_WARNING_TIME = 1 * 60 * 1000; // 1 minute before logout

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);

  const lastActiveRef = useRef(Date.now());
  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);

  // --- Fetch user from token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("/localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("❌ /me failed:", err.response?.data || err.message);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // --- Handle inactivity logout
  useEffect(() => {
    const handleActivity = () => {
      lastActiveRef.current = Date.now();
      localStorage.setItem("lastActive", lastActiveRef.current);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, handleActivity));

    const checkInactivity = setInterval(() => {
      const lastActive = lastActiveRef.current;
      if (Date.now() - lastActive > INACTIVITY_LIMIT) {
        logout();
      }
    }, 60 * 1000);

    return () => {
      clearInterval(checkInactivity);
      events.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, []);

  // --- Auto-refresh token before expiry
  useEffect(() => {
    const interval = setInterval(async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;

      try {
        const res = await axios.post("/api/auth/refresh", { token: refreshToken });
        localStorage.setItem("accessToken", res.data.accessToken);
        setUser(res.data.user);
      } catch (err) {
        console.warn("⚠️ Token refresh failed:", err.response?.data || err.message);
        logout();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // --- Show “Session expiring soon” warning
  useEffect(() => {
    if (user) {
      clearTimeout(warningTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);

      warningTimeoutRef.current = setTimeout(() => {
        setShowExpiryWarning(true);
      }, INACTIVITY_LIMIT - EXPIRY_WARNING_TIME);

      logoutTimeoutRef.current = setTimeout(() => {
        logout();
      }, INACTIVITY_LIMIT);
    }

    return () => {
      clearTimeout(warningTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);
    };
  }, [user]);

  const login = (accessToken, userData, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    setUser(userData);
    localStorage.setItem("lastActive", Date.now());
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, loading, logout, showExpiryWarning }}
    >
      {children}

      {showExpiryWarning && (
        <div className="fixed bottom-6 right-6 bg-yellow-500 text-white p-4 rounded-xl shadow-lg">
          <p>⚠️ Your session is expiring soon...</p>
          <button
            className="mt-2 bg-white text-yellow-600 px-3 py-1 rounded"
            onClick={() => setShowExpiryWarning(false)}
          >
            Stay Logged In
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
