import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CyberMario from './CyberMario/CyberMario';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] text-white">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="h-1 bg-gradient-to-r from-[#3e92cc] to-[#ff8c42]"></div>
          
          {/* Main Navigation */}
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="w-8 h-8 text-[#3e92cc] transform transition-transform group-hover:scale-110" />
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm group-hover:blur-md transition-all"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                  ZaiBai
                </span>
                <span className="text-[#3e92cc] ml-2 font-medium">Tech</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`nav-link relative py-2 text-gray-100 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#ff8c42] after:transition-all hover:after:w-full ${
                  location.pathname === '/' ? 'active' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/tools" 
                className={`nav-link relative py-2 text-gray-100 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#ff8c42] after:transition-all hover:after:w-full ${
                  location.pathname === '/tools' ? 'active' : ''
                }`}
              >
                Tools
              </Link>
              <Link 
                to="/about" 
                className={`nav-link relative py-2 text-gray-100 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#ff8c42] after:transition-all hover:after:w-full ${
                  location.pathname === '/about' ? 'active' : ''
                }`}
              >
                About
              </Link>
              <Link 
                to="/portfolio" 
                className={`nav-link relative py-2 text-gray-100 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#ff8c42] after:transition-all hover:after:w-full ${
                  location.pathname === '/portfolio' ? 'active' : ''
                }`}
              >
                Portfolio
              </Link>
              <Link to="/contact" className="bg-[#ff8c42] hover:bg-[#e67e3b] px-6 py-2 rounded-full font-medium transition-colors">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <Link to="/" className="block text-gray-100 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/tools" className="block text-gray-100 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
              <Link to="/about" className="block text-gray-100 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/portfolio" className="block text-gray-100 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
              <Link to="/contact" className="inline-block bg-[#ff8c42] hover:bg-[#e67e3b] px-6 py-2 rounded-full font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          )}
        </div>
      </nav>

      <Outlet />

      {/* Footer */}
      <footer className="bg-[#212529] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6" />
                <span className="text-xl font-bold">ZaiBai Tech</span>
              </div>
              <p className="text-gray-400">
                Security Tools for the Digital Future
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">Tools</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">Security Assessment</Link></li>
                <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">AI Consultation</Link></li>
                <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">Website Builder</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ZaiBai Tech. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add Cyber Mario */}
      <CyberMario />
    </div>
  );
}