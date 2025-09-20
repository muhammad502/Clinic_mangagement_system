import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-purple-600 p-6">
      <div className="text-center bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-10 max-w-md w-full">
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-700 font-medium">Oops! Page not found</p>
        <Link
          to="/login"
          className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}