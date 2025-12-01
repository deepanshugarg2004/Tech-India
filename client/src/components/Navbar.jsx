// Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogin = () => navigate("/login");
  const handleSignUp = () => navigate("/role");

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    // Hash route so it works on Vercel static hosting
    { label: "Community", href: "/chatroom" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    
    <nav className={`sticky top-0 z-50 text-gray-800 transition-all ${scrolled ? "bg-white/80 backdrop-blur border-b border-white/50 shadow" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="group inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 shadow" />
              <span className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">TechLearn</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-row items-center space-x-1">
            <ul className="flex items-center gap-1 text-sm font-medium">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="px-3 py-2 rounded-lg text-gray-700 hover:text-indigo-600 transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-full text-sm font-semibold transition duration-200 hover:bg-indigo-50"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold transition duration-200 hover:bg-indigo-700 shadow-lg"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-white/70 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-y-2 px-5">
          <button
            onClick={() => { setIsOpen(false); handleLogin(); }}
            className="w-full px-3 py-2 text-indigo-600 border border-indigo-600 rounded-lg text-base font-medium hover:bg-indigo-50"
          >
            Login
          </button>
          <button
            onClick={() => { setIsOpen(false); handleSignUp(); }}
            className="w-full px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-base font-medium hover:shadow"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
