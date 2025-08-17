"use client";

import React, { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import 'boxicons/css/boxicons.min.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Website Development',
    'E-commerce',
    'Maintenance',
  ];

  const contactDetails = [
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6 text-[#00d4aa]" />,
      value: 'akalankadamith2004@gmail.com',
      href: 'mailto:akalankadamith2004@gmail.com',
    },
    {
      name: 'WhatsApp',
      icon: <Phone className="w-6 h-6 text-[#00d4aa]" />,
      value: '+94 77 924 4785',
      href: 'https://wa.me/+94779244785',
    },
  ];

  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#0F0F23] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-[#0070f3] rounded-full animate-pulse"></div>
        <div className="absolute top-2/5 right-1/4 w-1 h-1 bg-[#00d4aa] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/5 left-2/5 w-1.5 h-1.5 bg-[#0070f3] rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-2/5 right-1/5 w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Footer Content */}
      <div
        className={`w-full bg-[#1a1a2e]/80 backdrop-blur-sm p-6 sm:p-8 lg:p-12 rounded-2xl border border-[#0070f3]/30 shadow-xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } relative z-10`}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start">
          {/* Branding */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-2xl font-semibold text-white mb-3">
              <span className="bg-gradient-to-r from-[#0070f3] to-[#00d4aa] bg-clip-text text-transparent text-4xl">Damith Akalanka</span> <br /> Web Developer
            </h3>
            <p className="text-base sm:text-lg text-gray-300">Creating digital solutions for Sri Lankan businesses</p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-semibold text-[#00d4aa] mb-4 text-center lg:text-left">Quick Links</h4>
            <ul className="space-y-3 flex flex-col items-center lg:items-start">
              {quickLinks.map((link, index) => (
                <li
                  key={link.name}
                  className={`text-base sm:text-lg text-gray-300 hover:text-[#00d4aa] transition-all duration-300 transform hover:scale-105 delay-${index * 100 + 200}`}
                >
                  <a href={link.href} className="block" onClick={(e) => {
                    e.preventDefault(); // Prevent default navigation
                    const section = document.querySelector(link.href);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-semibold text-[#00d4aa] mb-4 text-center lg:text-left">Services</h4>
            <ul className="space-y-3 flex flex-col items-center lg:items-start">
              {services.map((service, index) => (
                <li
                  key={index}
                  className={`text-base sm:text-lg text-gray-300 transition-all duration-300 delay-${index * 100 + 400}`}
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-semibold text-[#00d4aa] mb-4 text-center lg:text-left">Contact</h4>
            <div className="space-y-4 flex flex-col items-center lg:items-start">
              {contactDetails.map((detail, index) => (
                <a
                  key={detail.name}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 text-gray-300 hover:text-[#00d4aa] transition-all duration-300 transform hover:scale-105 delay-${index * 100 + 600}`}
                >
                  {detail.icon}
                  <span className="text-base sm:text-lg">{detail.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm sm:text-base text-gray-400 border-t border-[#0070f3]/20 pt-6">
          © 2025 Damith. All rights reserved.
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;