import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-[#2D6A4F] font-bold' : 'text-gray-600 hover:text-[#52B788]';
  };

  return (
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
      <button className="bg-[#2D6A4F] text-white px-10 py-3 rounded-md text-lg font-medium hover:bg-[#1B4332] transition">
        Sign In
      </button>
    </nav>
  );
}