import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  navItems: NavItem[];
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPromoStrip, setShowPromoStrip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Promotional Strip - This will scroll with the page */}
      {showPromoStrip && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2 px-4 relative">
          <div className="max-w-7xl mx-auto text-center">
            <span className="font-medium">
              🚀 Ready to bring your ideas to life? Get 20% off your first project - Limited time offer!
            </span>
            <button
              onClick={() => setShowPromoStrip(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
              aria-label="Close promotional banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar - This will be sticky */}
      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Krishna Chavan
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-blue-600 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <Link to="/admin">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                  <User size={20} />
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 text-foreground hover:text-blue-600 transition-colors duration-300 font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ))}
              <Link to="/admin" className="block px-3 py-2" onClick={() => setIsOpen(false)}>
                <button className="w-full text-left text-foreground hover:text-blue-600 transition-colors duration-300 font-medium">
                  Admin Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;