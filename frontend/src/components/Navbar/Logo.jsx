import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="text-2xl font-extrabold tracking-wider">
      <span className="text-red-600">CINEMA</span>{" "}
      <span className="text-black">FANATICS</span>
    </Link>
  );
}
