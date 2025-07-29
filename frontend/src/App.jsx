import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import MovieDetail from "./pages/MovieDetail"; // ✅ import the detail page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} /> {/* ✅ movie detail route */}
      </Routes>
    </Router>
  );
}
