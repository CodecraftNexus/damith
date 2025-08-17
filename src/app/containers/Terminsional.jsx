"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Generate stable particle positions
  const particlePositions = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      left: `${(i * 37) % 100}%`,
      top: `${(i * 23) % 100}%`,
      animationDelay: `${(i * 0.1) % 3}s`,
    }));
  }, []);

  const testimonials = [
    {
      id: 1,
      quote: "[Your Name] created an amazing website for our restaurant. The online ordering system has increased our sales by 40%. Highly professional and responsive!",
      author: "Nimal Perera",
      title: "Owner, Colombo Spice Restaurant",
      rating: 5,
      image: "https://via.placeholder.com/150?text=Nimal+Perera", // Replace with actual image URL or path
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#0070f3",
      particles: "blue",
    },
    {
      id: 2,
      quote: "Excellent work on our e-commerce site. The payment integration works perfectly and our customers love the user experience.",
      author: "Saman Silva",
      title: "Manager, Fashion Store Lanka",
      rating: 5,
      image: "https://via.placeholder.com/150?text=Saman+Silva", // Replace with actual image URL or path
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#00d4aa",
      particles: "teal",
    },
    {
      id: 3,
      quote: "Professional service from start to finish. Our clinic website looks modern and the appointment booking system saves us so much time.",
      author: "Dr. Kumari Fernando",
      title: "Health Care Clinic",
      rating: 5,
      image: "https://via.placeholder.com/150?text=Kumari+Fernando", // Replace with actual image URL or path
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#0070f3",
      particles: "blue",
    },
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setDirection(index > currentSlide ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#0F0F23] via-[#1a1a2e] to-[#16213e] py-12 px-4 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-${testimonials[currentSlide].particles}-400/50 rounded-full animate-pulse`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Background Waves */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0070f3]/10 via-[#00d4aa]/10 to-[#0070f3]/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#0070f3] to-[#00d4aa] bg-clip-text text-white animate-pulse">
              Client Testimonials
            </h1>
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Quote className="text-yellow-400 w-8 h-8" />
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hear what our satisfied clients have to say about our services.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Desktop View */}
          <div className="hidden lg:flex justify-center items-center space-x-6 perspective-1000">
            {testimonials.map((testimonial, index) => {
              const isCenter = index === currentSlide;
              const isLeft = index === (currentSlide - 1 + testimonials.length) % testimonials.length;
              const isRight = index === (currentSlide + 1) % testimonials.length;
              const isVisible = isCenter || isLeft || isRight;

              if (!isVisible) return null;

              let transformClass = '';
              let zIndex = 10;
              let opacity = 0.5;

              if (isCenter) {
                transformClass = 'scale-105 rotateY-0';
                zIndex = 30;
                opacity = 1;
              } else if (isLeft) {
                transformClass = 'scale-95 -rotate-y-10 -translate-x-2';
                zIndex = 20;
                opacity = 0.7;
              } else if (isRight) {
                transformClass = 'scale-95 rotate-y-10 translate-x-2';
                zIndex = 20;
                opacity = 0.7;
              }

              return (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ease-out transform-gpu ${transformClass} ${
                    isTransitioning
                      ? direction === 'next'
                        ? 'animate-slideOutLeft'
                        : 'animate-slideOutRight'
                      : 'animate-slideInCenter'
                  }`}
                  style={{
                    zIndex,
                    opacity,
                    animation: isCenter && !isTransitioning ? `cardFloat ${2 + index * 0.3}s ease-in-out infinite` : 'none',
                  }}
                  onClick={() => !isCenter && goToSlide(index)}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isHighlighted={isCenter}
                    index={index}
                    isTransitioning={isTransitioning}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet View */}
          <div className="lg:hidden flex justify-center">
            <div
              className={`transition-all duration-500 ${
                isTransitioning
                  ? direction === 'next'
                    ? 'animate-slideOutLeft'
                    : 'animate-slideOutRight'
                  : 'animate-slideInCenter'
              }`}
              style={{
                animation: !isTransitioning ? `cardFloat ${2 + currentSlide * 0.3}s ease-in-out infinite` : 'none',
              }}
            >
              <TestimonialCard
                testimonial={testimonials[currentSlide]}
                isHighlighted={true}
                index={currentSlide}
                isTransitioning={isTransitioning}
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#1a1a2e]/80 hover:bg-[#1a1a2e] text-white p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 z-40 group border border-[#0070f3]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} className="text-[#0070f3] group-hover:text-[#00d4aa]" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#1a1a2e]/80 hover:bg-[#1a1a2e] text-white p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 z-40 group border border-[#0070f3]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} className="text-[#0070f3] group-hover:text-[#00d4aa]" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-10 bg-[#0070f3]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              } disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInCenter {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideOutLeft {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50px);
          }
        }

        @keyframes slideOutRight {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(50px);
          }
        }

        .wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(0, 112, 243, 0.05), transparent);
          border-radius: 50%;
        }

        .wave1 {
          animation: wave 10s ease-in-out infinite;
        }

        .wave2 {
          animation: wave 8s ease-in-out infinite reverse;
          animation-delay: -2s;
        }

        .wave3 {
          animation: wave 12s ease-in-out infinite;
          animation-delay: -4s;
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: rotate(180deg) scale(1.1);
            opacity: 0.15;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .rotate-y-10 {
          transform: rotateY(10deg);
        }

        .-rotate-y-10 {
          transform: rotateY(-10deg);
        }

        .animate-slideInCenter {
          animation: slideInCenter 0.5s ease-out forwards;
        }

        .animate-slideOutLeft {
          animation: slideOutLeft 0.3s ease-in forwards;
        }

        .animate-slideOutRight {
          animation: slideOutRight 0.3s ease-in forwards;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

const TestimonialCard = ({ testimonial, isHighlighted, index, isTransitioning }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-[#1a1a2e] text-white p-6 w-72 sm:w-80 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl group cursor-pointer ${
        isHighlighted ? 'border-2 border-[#0070f3]/50' : 'hover:border-2 hover:border-[#0070f3]/30'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 bg-white/10 rounded-xl transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      {/* Shimmer Effect */}
      <div
        className={`absolute inset-0 rounded-xl overflow-hidden transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>

      {/* Floating Icon */}
      <div
        className={`absolute -top-4 -right-4 w-12 h-12 bg-[#0070f3] rounded-lg flex items-center justify-center border border-white/20 shadow-md transition-all duration-500 ${
          isHovered ? 'scale-110 bg-[#00d4aa]' : 'scale-100'
        }`}
        style={{ animation: `iconFloat ${2 + index * 0.3}s ease-in-out infinite` }}
      >
        <Quote className="text-white w-6 h-6" />
      </div>

      {/* Testimonial Content */}
      <div className="text-center mb-6 relative z-10">
        {/* Author Image */}
        <div className="flex justify-center mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className={`w-20 h-20 rounded-full border-2 border-[#0070f3]/50 object-cover transition-all duration-500 ${
              isHovered ? 'scale-110 border-[#00d4aa]/50' : ''
            }`}
          />
        </div>
        <div className="flex justify-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={`text-yellow-400 ${isHovered ? 'animate-bounce' : ''}`}
              fill="currentColor"
            />
          ))}
        </div>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{testimonial.quote}</p>
        <h3 className="text-lg font-semibold text-white">{testimonial.author}</h3>
        <p className="text-sm text-gray-400">{testimonial.title}</p>
      </div>

      <style jsx>{`
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSlider;