// src/components/GoogleSignInButton.jsx
import { useEffect } from 'react';
import axios from 'axios';

export default function GoogleSignInButton() {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // <-- Replace this!
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-button'),
        { theme: 'filled_black', size: 'large', width: '100%' }
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const { credential } = response;

    try {
      const res = await axios.post('/api/auth/google', { token: credential });
      console.log('Google login success:', res.data);
      // Save token, redirect, etc.
    } catch (err) {
      console.error('Google login error:', err.response?.data || err.message);
    }
  };

  return <div id="google-button" className="w-full flex justify-center" />;
}
