"use client";

import React, { useEffect, useState } from 'react';
import { Code, Globe, Rocket, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import 'boxicons/css/boxicons.min.css';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    { name: 'Front-end Development', icon: <Code className="w-6 h-6" />, description: 'Building responsive UI with React, Next.js, HTML/CSS/JavaScript' },
    { name: 'Back-end Development', icon: <Globe className="w-6 h-6" />, description: 'Robust server-side solutions with Node.js, Express, and databases' },
    { name: 'E-commerce Solutions', icon: <Rocket className="w-6 h-6" />, description: 'Seamless payment integration and shopping cart systems' },
    { name: 'Website Optimization', icon: <CheckCircle className="w-6 h-6" />, description: 'SEO, performance, and mobile responsiveness' },
  ];

  const whyChooseMe = [
    'Local Understanding: Tailored solutions for the Sri Lankan market',
    'Quality Focus: Clean code and modern, user-friendly designs',
    'Communication: Transparent updates and collaborative process',
    'Support: Ongoing maintenance and dedicated technical support',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 lg:px-[150px] bg-gradient-to-br from-[#0F0F23] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-[#0070f3] rounded-full animate-pulse"></div>
        <div className="absolute top-2/5 right-1/4 w-1 h-1 bg-[#00d4aa] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/5 left-2/5 w-1.5 h-1.5 bg-[#0070f3] rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-2/5 right-1/5 w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        {/* Profile Image Card */}
        <div
          className={`w-full lg:w-1/3 flex justify-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="lg:h-[430px] relative bg-[#1a1a2e] p-4 rounded-2xl border-2 border-[#0070f3]/30 shadow-2xl hover:shadow-[#00d4aa]/50 hover:border-[#00d4aa]/50 transition-all duration-500 w-[280px] sm:w-[340px] lg:w-[400px] overflow-hidden group">
            <Image
              width={400}
              height={500}
              src="/hero.jpg" // Replace with your actual image path
              alt="Damith - Web Developer"
              className="relative w-full h-[250px] sm:h-[300px] lg:h-[400px] rounded-xl object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
            {/* Overlay Badge */}
            <div className="absolute bottom-4 left-4 bg-[#0070f3]/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm sm:text-base font-semibold transition-all duration-500 group-hover:bg-[#00d4aa]/80">
              Damith Akalanka - Full Stack Developer
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div
          className={`w-full lg:w-2/3 bg-[#1a1a2e]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#0070f3]/30 shadow-xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-center lg:text-left">
            <span className="bg-gradient-to-r from-[#0070f3] to-[#00d4aa] bg-clip-text text-transparent">About Me</span>
          </h2>
          <p
            className={`text-sm sm:text-base lg:text-lg text-gray-300 mb-8 text-center lg:text-left transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            I'm a passionate web developer with 5 years of experience creating digital solutions. My journey began with a fascination for coding during my university days, and I've since empowered over 50 businesses to elevate their online presence.
          </p>

          {/* What I Do */}
          <h3
            className={`text-xl sm:text-2xl font-semibold text-[#00d4aa] mb-6 text-center lg:text-left transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            What I Do
          </h3>
          <div className="space-y-6 mb-8">
            {services.map((service, index) => (
              <div
                key={service.name}
                className={`flex items-start gap-4 transition-all duration-1000 delay-${index * 200 + 700} ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                } hover:bg-[#0070f3]/10 p-4 rounded-lg hover:scale-[1.02]`}
              >
                <div className="bg-[#0070f3] p-2 rounded-full text-white">{service.icon}</div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white">{service.name}</h4>
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Me */}
          <h3
            className={`text-xl sm:text-2xl font-semibold text-[#00d4aa] mb-6 text-center lg:text-left transition-all duration-1000 delay-1100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Why Choose Me
          </h3>
          <div className="space-y-4 mb-8">
            {whyChooseMe.map((reason, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 transition-all duration-1000 delay-${index * 200 + 1300} ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                } hover:text-white hover:bg-[#00d4aa]/10 p-3 rounded-lg`}
              >
                <CheckCircle className="w-5 h-5 text-[#00d4aa] flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-300">{reason}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`flex justify-center lg:justify-start transition-all duration-1000 delay-1700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a href='#contact' className="bg-[#0070f3] shadow-[0px_0px_3px_3px_#0070f3] text-white px-6 sm:px-8 font-bold text-sm sm:text-base flex justify-center items-center gap-2 py-3 rounded-2xl hover:bg-[#00d4aa] hover:shadow-[0px_0px_3px_3px_#00d4aa] transition-all duration-500 w-full sm:w-auto transform hover:scale-105">
              Get in Touch <i className="bx bx-right-arrow-alt text-sm sm:text-base"></i>
            </a>
          </div>
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
    </div>
  );
};

export default AboutMe;