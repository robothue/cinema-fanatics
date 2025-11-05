// src/components/Auth/GoogleSignInButton.jsx
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

export default function GoogleSignInButton() {
  const { login } = useAuth();

  const handleCredentialResponse = async (response) => {
    const { credential } = response;
    try {
      const res = await axios.post("/api/auth/google", { credential });
      login(res.data.token, res.data.user);
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Google login error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "1043421473458-oikmehvjgu4gr6pf9ct2706r0gs9u4rj.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "filled_white", size: "large" }
      );
    }
  }, []);

  return <div id="google-button" className="w-full flex justify-center" />;
}
