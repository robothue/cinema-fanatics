import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import MovieDetail from "./pages/MovieDetail";
import AllMovies from "./pages/AllMovies";
import AllTvShows from "./pages/AllTvShows"; // ✅ new import
import MyWatchlist from "./pages/MyWatchlist";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

// ✅ new import
import WatchProviders from "./components/MovieDetail/WatchProviders";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout-wrapped routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<AllMovies />} />
            <Route path="/tv" element={<AllTvShows />} /> {/* ✅ TV Shows page */}

            {/* ✅ handle both movies & tv */}
            <Route path="/:media_type/:id" element={<MovieDetail />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/tv/:id" element={<MovieDetail />} />

            <Route
              path="/watchlist"
              element={
                <PrivateRoute>
                  <MyWatchlist />
                </PrivateRoute>
              }
            />

            {/* ✅ Watch Providers page */}
            <Route path="/watch/:type/:id" element={<WatchProviders />} />
          </Route>

          {/* Standalone route */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
