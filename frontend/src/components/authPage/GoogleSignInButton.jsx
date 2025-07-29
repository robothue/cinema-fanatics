// src/components/GoogleSignInButton.jsx
import { useEffect } from 'react';
import axios from 'axios';

export default function GoogleSignInButton() {
  const handleCredentialResponse = async (response) => {
    const { credential } = response;

    try {
      const res = await axios.post('/api/auth/google', { credential }); // ✅ FIXED name
      console.log('✅ Google login success:', res.data);

      // Optionally: store token and redirect
      localStorage.setItem('token', res.data.token);
      window.location.href = '/'; // redirect to home or dashboard
    } catch (err) {
      console.error('❌ Google login error:', err.response?.data || err.message);
    }
  };

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID// ✅ Replace with actual key
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "1043421473458-oikmehvjgu4gr6pf9ct2706r0gs9u4rj.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-button'),
        { theme: 'filled_white', size: 'large' }
      );
      
    }
  }, []);

  return <div id="google-button" className="w-full flex justify-center" />;
}
