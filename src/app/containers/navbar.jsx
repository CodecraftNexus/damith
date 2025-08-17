"use client";

import React, { useState, useEffect, useCallback } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Throttle function for better performance
  const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  };

  // Get current active section based on scroll position
  const getCurrentSection = useCallback(() => {
    const sections = ['home', 'services', 'portfolio', 'testimonials', 'about', 'contact'];
    const scrollPosition = window.scrollY + 150; // Offset for navbar
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= sectionTop) {
          return sections[i];
        }
      }
    }
    return 'home';
  }, []);

  useEffect(() => {
    // Handle scroll for navbar background and active section
    const handleScroll = throttle(() => {
      // Navbar background
      setIsScrolled(window.scrollY > 50);
      
      // Active section detection
      const currentSection = getCurrentSection();
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    }, 100);

    // Set initial state
    setIsScrolled(window.scrollY > 50);
    
    // Set initial active section after component mounts
    setTimeout(() => {
      const currentSection = getCurrentSection();
      setActiveSection(currentSection);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, getCurrentSection]);

  // Close mobile menu when clicking outside or on backdrop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (href) => {
    const targetId = href.replace('#', '');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const navbarHeight = 80; // Fixed navbar height
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      // Update active section immediately for better UX
      setActiveSection(targetId);
      
      // Close mobile menu with slight delay
      setTimeout(() => {
        closeMobileMenu();
      }, 150);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Service', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none ${
          isScrolled
            ? 'bg-[#0f0f23]/90 backdrop-blur-lg shadow-lg border-b border-[#1a1a2e]/50'
            : 'bg-transparent '
        }`}
      >
        <nav className="flex justify-between items-center px-4 md:px-8 lg:px-[150px] py-4 md:py-6 nav-main">
          {/* Logo */}
          <div className="logo">
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl font-bold text-white hover:text-[#00d4aa] transition-colors duration-300"
            >
              Damith.
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:text-[#00d4aa] ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#00d4aa] border-b-2 border-[#00d4aa] pb-1'
                      : 'text-white'
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden z-50 relative mobile-menu-button p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`mobile-menu absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0f0f23]/95 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#1a1a2e]/50">
              <h3 className="text-xl font-bold text-white">Navigation</h3>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-[#1a1a2e]/50 rounded-full transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg font-semibold uppercase tracking-wide transition-all duration-200 ${
                        activeSection === link.href.slice(1)
                          ? 'text-[#00d4aa] bg-[#00d4aa]/10 border-l-4 border-[#00d4aa]'
                          : 'text-white hover:text-[#00d4aa] hover:bg-[#1a1a2e]/30'
                      }`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className="p-6 border-t border-[#1a1a2e]/50">
              <p className="text-sm text-gray-300 text-center">
                © 2025 Damith. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;