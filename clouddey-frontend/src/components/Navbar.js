// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logo from '../assets/logo1.webp';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-0">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Clouddey" style={{ height: '100px' }} className="w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link to="/solutions" className="text-gray-600 hover:text-gray-900">Solutions</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            <Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
          </div>
          
          {/* Right side - Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 font-medium hover:text-gray-900">Login</Link>
            <Link to="/signup"   style={{ backgroundColor: '#F36404' }}
          className="bg-gray-200 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-lg transition duration-300">Sign Up</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link to="/features" className="text-gray-600 hover:text-gray-900 py-2">Features</Link>
              <Link to="/solutions" className="text-gray-600 hover:text-gray-900 py-2">Solutions</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 py-2">Pricing</Link>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900 py-2">Blog</Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900 py-2">Resources</Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <Link to="/login" className="text-gray-600 font-medium hover:text-gray-900 py-2">Login</Link>
                <Link to="/signup" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-center">Sign Up</Link>
                <Link to="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg text-center">Contact Sales</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;