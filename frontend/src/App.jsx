// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import MovieDetail from "./pages/MovieDetail";
import AllMovies from "./pages/AllMovies"; // ✅ Import AllMovies
import MyWatchlist from "./pages/MyWatchlist"; // ✅ Import the page
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes that should share the Navbar/Footer inside the layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<AllMovies />} /> {/* ✅ New All Movies route */}
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<MyWatchlist />} />

        </Route>

        {/* Standalone route that doesn't need layout */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
