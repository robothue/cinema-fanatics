import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext"; // ✅ import provider
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import MovieDetail from "./pages/MovieDetail";
import AllMovies from "./pages/AllMovies";
import MyWatchlist from "./pages/MyWatchlist";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute"; // ✅ import wrapper

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout-wrapped routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<AllMovies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route
              path="/watchlist"
              element={
                <PrivateRoute>
                  <MyWatchlist />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Standalone route */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
