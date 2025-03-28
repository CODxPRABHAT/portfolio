import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto px-4">
          <Link to="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Your Portfolio
          </Link>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className="hidden sm:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#about" className="text-neutral-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-neutral-400 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard" className="text-neutral-400 hover:text-white transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-neutral-400 hover:text-white transition-colors">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} bg-black/90`}>
        <nav className="px-4 pt-2 pb-4">
          <ul className="space-y-2">
            <li>
              <a href="#about" className="block text-neutral-400 hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="block text-neutral-400 hover:text-white transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="block text-neutral-400 hover:text-white transition-colors">
                Contact
              </a>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/dashboard" className="block text-neutral-400 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block w-full text-left text-neutral-400 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="block text-neutral-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;