import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // for uploading files
  const [preview, setPreview] = useState(null); // for showing preview

  if (!user) {
    return <p className="mt-20 text-center">You must be logged in to view your profile.</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      if (file) formData.append("picture", file);

      const res = await axios.put("/api/auth/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data);
      setMessage("✅ Profile updated!");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  // 👇 Auto-hide message after 3s
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 rounded-full border object-cover"
          />
        ) : user.picture ? (
            <img    //Updated for local uploads
            src={
              user.picture?.startsWith("http")
                ? user.picture // Google / Cloudinary
                : `${import.meta.env.VITE_API_BASE_URL}${user.picture}` // Local
            }
            alt={user.name}
            className="w-16 h-16 rounded-full border object-cover"
          />
          
        ) : (
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Update form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>

      {/* ✅ Popup message */}
      {message && (
        <p
          className={`mt-4 text-sm px-4 py-2 rounded-md shadow-sm ${
            message.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <hr className="my-6" />

      {/* Logout */}
      <button
        onClick={logout}
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >
        Logout
      </button>
    </div>
  );
}
