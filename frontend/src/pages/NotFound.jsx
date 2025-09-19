import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-6xl font-bold text-gray-700">404</h1>
      <p className="text-lg text-gray-500">Page not found</p>
      <Link to="/login" className="text-blue-500 underline">
        Go back Home
      </Link>
    </div>
  );
}
