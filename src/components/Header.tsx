import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userProfile } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <GraduationCap className="h-8 w-8 text-blue-800" />
              <span className="ml-2 text-xl font-bold text-gray-900">CareerGuide<span className="text-blue-800">AI</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/') ? 'border-blue-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/assessment"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/assessment') ? 'border-blue-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assessment
            </Link>
            <Link
              to="/indian-assessment"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/indian-assessment') ? 'border-blue-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Career Assessment
            </Link>
            <Link
              to="/careers"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/careers') ? 'border-blue-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Careers
            </Link>
            <Link
              to="/courses"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/courses') ? 'border-blue-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Courses
            </Link>
            <Link
              to="/internships"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/internships') ? 'border-blue-800 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Internships
            </Link>
          </nav>

          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link
              to="/profile"
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                isActive('/profile') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <User className="h-4 w-4 mr-1" />
              My Profile
              {userProfile.assessmentCompleted && (
                <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-800"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/') 
                ? 'bg-blue-50 border-blue-800 text-blue-800' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/assessment"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/assessment') 
                ? 'bg-blue-50 border-blue-800 text-blue-800' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={closeMenu}
          >
            Assessment
          </Link>
          <Link
            to="/indian-assessment"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/indian-assessment') 
                ? 'bg-blue-50 border-blue-800 text-blue-800' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={closeMenu}
          >
            Career Assessment
          </Link>
          <Link
            to="/careers"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/careers') 
                ? 'bg-blue-50 border-blue-800 text-blue-800' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={closeMenu}
          >
            Careers
          </Link>
          <Link
            to="/courses"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/courses') 
                ? 'bg-blue-50 border-blue-800 text-blue-800' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={closeMenu}
          >
            Courses
          </Link>
          <Link
            to="/internships"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/internships') 
                ? 'bg-blue-50 border-blue-800 text-blue-800' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={closeMenu}
          >
            Internships
          </Link>
          <Link
            to="/profile"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/profile') 
                ? 'bg-blue-50 border-blue-800 text-blue-800' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
            onClick={closeMenu}
          >
            My Profile
            {userProfile.assessmentCompleted && (
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;