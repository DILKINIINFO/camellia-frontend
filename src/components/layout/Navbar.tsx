import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';
import SignInModal from './SignInModal';
import { useAuth } from '../../context/AuthContext';

// Mock admin users (copied from PlantationAdminDashboard for Navbar's awareness)
const MOCK_PLANTATION_ADMINS: Record<string, { username: string; plantationId: string }> = {
  'pedroadmin': { username: 'pedroadmin', plantationId: '1' },
  'bluefieldadmin': { username: 'bluefieldadmin', plantationId: '2' },
};


export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { user, logOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-[#2D6A4F] font-bold' : 'text-gray-600 hover:text-[#52B788]';
  };

  const handleLogOut = () => {
    logOut();
    navigate('/'); // Redirect to home after logout
  };

  // Determine if the logged-in user is a plantation admin
  const isPlantationAdmin = user && MOCK_PLANTATION_ADMINS[user.username];
  const dashboardPath = isPlantationAdmin ? '/plantation-admin/dashboard' : '/dashboard';


  return (
    <>
      <nav className="flex items-center justify-between px-12 py-6 bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition">
          <div className="w-12 h-12 bg-[#2D6A4F]"></div>
          <div>
            <h1 className="text-3xl font-bold leading-none text-[#2D6A4F]">Camellia</h1>
            <p className="text-xs text-gray-500">Ceylon Tea Tourism</p>
          </div>
        </Link>
        <div className="hidden md:flex gap-10 text-lg font-medium">
          <Link to="/" className={`transition ${isActive('/')}`}>Home</Link>
          <Link to="/plantations" className={`transition ${isActive('/plantations')}`}>Plantations</Link>
          <Link to="/about" className={`transition ${isActive('/about')}`}>About</Link>
          <Link to="/contact" className={`transition ${isActive('/contact')}`}>Contact</Link>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Welcome, {user.username}!</span>
            <Link to={dashboardPath} className="bg-[#2D6A4F] text-white px-10 py-3 rounded-md text-lg font-medium hover:bg-[#1B4332] transition">
              My Dashboard
            </Link>
            <button
              onClick={handleLogOut}
              className="bg-gray-400 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-500 transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2D6A4F] text-white px-10 py-3 rounded-md text-lg font-medium hover:bg-[#1B4332] transition"
          >
            Sign In
          </button>
        )}
      </nav>

      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}