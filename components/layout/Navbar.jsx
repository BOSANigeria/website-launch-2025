"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Lock, Home, Users, Calendar, BookOpen, Phone, Info } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { title: "Home", path: "/", icon: Home },
    { title: "About", path: "/about", icon: Info },
    { title: "Committee", path: "/committee", icon: Users },
    { title: "Events", path: "/events", icon: Calendar },
    { title: "Members", path: "/members", icon: Users },
    { title: "Resources", path: "/resources", icon: BookOpen },
    { title: "Contact", path: "/contact", icon: Phone },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-[60px] w-[60px] overflow-hidden bg-[#0F2C59] flex justify-center items-center">
              <Image
                src="/assets/BOSAN-logo.png"
                alt="BOSAN Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-black font-Quicksand font-bold text-2xl sm:text-3xl">
                BOSAN
              </h3>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-lg">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center space-x-1 font-medium group ${
                    pathname === link.path
                      ? "text-[#0F2C59] border-b-4 border-[#D4AF37]"
                      : "text-[#343A40]"
                  } hover:text-[#D4AF37] transition duration-300`}
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>{link.title}</span>
                </Link>
              );
            })}
            <Link
              href="/login"
              className="ml-4 inline-flex items-center px-4 py-4 text-lg font-medium text-white bg-black hover:bg-[#D4AF37] transition"
            >
              <Lock className="w-4 h-4 mr-2" />
              Member Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className={`relative z-50 p-2 rounded-lg transition-all duration-300 ${
                mobileMenuOpen 
                  ? "bg-black text-white fixed top-0" 
                  : "text-[#0F2C59] hover:bg-gray-100"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-9 w-9" />
              ) : (
                <Menu className="h-9 w-9" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl transform transition-all duration-300 ease-out flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="bg-black px-6 py-6 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Image
                  src="/assets/BOSAN-logo.png"
                  alt="BOSAN Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">BOSAN</h3>
                <p className="text-white/80 text-xs">Navigation Menu</p>
              </div>
            </div>
          </div>

          {/* Menu Content - Scrollable */}
          <div className="flex-1 flex flex-col px-6 py-4 min-h-0">
            <nav className="flex-1 space-y-4 overflow-y-auto">
              {navLinks.map((link, index) => {
                const IconComponent = link.icon;
                const isActive = pathname === link.path;
                
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                      isActive
                        ? "bg-black text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#0F2C59]"
                    }`}
                    style={{
                      animationDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                      animation: mobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-white/20" 
                        : "bg-gray-100 group-hover:bg-[#0F2C59]/10"
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-[#0F2C59]"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold">{link.title}</span>
                      {isActive && (
                        <div className="w-8 h-0.5 bg-[#D4AF37] mt-1 rounded-full" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Member Login Button - Fixed at bottom */}
            <div className="pt-4 border-t border-gray-200 flex-shrink-0">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full p-3 bg-black text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                <Lock className="w-4 h-4" />
                <span>Member Login</span>
              </Link>
              
              {/* Footer */}
              <div className="mt-3 text-center text-gray-500 text-xs">
                <p>Body of Senior Advocates of Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;