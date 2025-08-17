"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, Star, Zap, Sparkles } from "lucide-react";

const PricingSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("next");

  // Replace with your actual WhatsApp Business number (e.g., +94712345678)
  const whatsappNumber = "+94726805029"; // Update this!

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pricingPlans = [
    {
      id: 1,
      name: "Starter Package",
      price: "35,000",
      currency: "Rs.",
      period: "One-Time",
      description: "Perfect for small businesses and startups",
      features: [
        "Single page website (Landing page)",
        "Mobile responsive design",
        "Contact form integration",
        "Basic SEO setup",
        "1 month free support",
        "Delivery: 5-7 days",
      ],
      buttonText: "Choose Starter Package",
      popular: false,
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#0070f3",
      icon: "🚀",
      particles: "blue",
    },
    {
      id: 2,
      name: "Business Package",
      price: "75,000",
      currency: "Rs.",
      period: "One-Time",
      description: "Ideal for established businesses",
      features: [
        "Multi-page website (up to 5 pages)",
        "Professional design",
        "Contact forms & WhatsApp integration",
        "Google Maps integration",
        "Basic SEO optimization",
        "Social media links",
        "3 months free support",
        "Delivery: 10-14 days",
      ],
      buttonText: "Choose Business Package",
      popular: false,
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#00d4aa",
      icon: "💼",
      particles: "teal",
    },
    {
      id: 3,
      name: "E-Commerce Package",
      price: "150,000",
      currency: "Rs.",
      period: "One-Time",
      description: "Complete online store solution",
      features: [
        "Product catalog (up to 50 products)",
        "Shopping cart & checkout",
        "Payment gateway integration",
        "Order management system",
        "Customer accounts",
        "Mobile responsive design",
        "SEO optimization",
        "6 months free support",
        "Delivery: 3-4 weeks",
      ],
      buttonText: "Choose E-Commerce",
      popular: true,
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#0070f3",
      icon: "🛒",
      particles: "blue",
    },
    {
      id: 4,
      name: "Custom",
      price: "Custom",
      currency: "",
      period: "pricing",
      description: "Tailored solutions for complex needs",
      features: [
        "Custom web applications",
        "Advanced functionality",
        "Third-party integrations",
        "Custom admin panels",
        "Performance optimization",
        "Ongoing consultation",
      ],
      buttonText: "Contact Us",
      popular: false,
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#00d4aa",
      icon: "⚙️",
      particles: "teal",
    },
    {
      id: 5,
      name: "Maintenance Services",
      price: "12,000",
      currency: "Rs.",
      period: "per month",
      description: "Monthly Website Maintenance",
      features: [
        "Content updates",
        "Security updates",
        "Backup management",
        "Performance monitoring",
        "Technical support",
        "Minor design changes",
      ],
      buttonText: "Contact Sales",
      popular: false,
      color: "from-[#1a1a2e] to-[#16213e]",
      accentColor: "#0070f3",
      icon: "🔧",
      particles: "blue",
    },
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setDirection("next");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % pricingPlans.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setDirection("prev");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + pricingPlans.length) % pricingPlans.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setDirection(index > currentSlide ? "next" : "prev");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const handleChoosePlan = (plan) => {
    console.log("Selected Plan:", plan.name); // Debug log
    const message = `Hi, I'm interested in the ${plan.name} priced at ${plan.currency}${plan.price}${plan.period ? `/${plan.period}` : ""}. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    console.log("WhatsApp URL:", whatsappUrl); // Debug log
    try {
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      alert("Unable to open WhatsApp. Please contact us directly.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#0F0F23] via-[#1a1a2e] to-[#16213e] py-12 px-4 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 mt-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#0070f3] to-[#00d4aa] bg-clip-text text-white animate-pulse">
              Service Packages
            </h1>
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Sparkles className="text-yellow-400 w-8 h-8" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-500">
              <Zap className="text-[#0070f3] w-6 h-6" />
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our premium solutions tailored to transform your vision into reality.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Desktop View */}
          <div className="hidden lg:flex justify-center items-center space-x-6 perspective-1000">
            {pricingPlans.map((plan, index) => {
              const isCenter = index === currentSlide;
              const isLeft = index === (currentSlide - 1 + pricingPlans.length) % pricingPlans.length;
              const isRight = index === (currentSlide + 1) % pricingPlans.length;
              const isVisible = isCenter || isLeft || isRight;

              if (!isVisible) return null;

              let transformClass = "";
              let zIndex = 10;
              let opacity = 0.5;

              if (isCenter) {
                transformClass = "scale-105 rotateY-0";
                zIndex = 30;
                opacity = 1;
              } else if (isLeft) {
                transformClass = "scale-95 -rotate-y-10 -translate-x-2";
                zIndex = 20;
                opacity = 0.7;
              } else if (isRight) {
                transformClass = "scale-95 rotate-y-10 translate-x-2";
                zIndex = 20;
                opacity = 0.7;
              }

              return (
                <div
                  key={plan.id}
                  className={`transition-all duration-700 ease-out transform-gpu ${transformClass} ${
                    isTransitioning
                      ? direction === "next"
                        ? "animate-slideOutLeft"
                        : "animate-slideOutRight"
                      : "animate-slideInCenter"
                  }`}
                  style={{
                    zIndex,
                    opacity,
                    animation: isCenter && !isTransitioning ? `cardFloat ${2 + index * 0.3}s ease-in-out infinite` : "none",
                  }}
                  onClick={() => !isCenter && goToSlide(index)}
                >
                  <PricingCard
                    plan={plan}
                    onChoosePlan={handleChoosePlan}
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
                  ? direction === "next"
                    ? "animate-slideOutLeft"
                    : "animate-slideOutRight"
                  : "animate-slideInCenter"
              }`}
              style={{
                animation: !isTransitioning ? `cardFloat ${2 + currentSlide * 0.3}s ease-in-out infinite` : "none",
              }}
            >
              <PricingCard
                plan={pricingPlans[currentSlide]}
                onChoosePlan={handleChoosePlan}
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
          {pricingPlans.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide ? "w-10 bg-[#0070f3]" : "w-2 bg-white/30 hover:bg-white/50"
              } disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideInCenter {
          0% { opacity: 0; transform: translateY(30px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideOutLeft {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-50px); }
        }
        @keyframes slideOutRight {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(50px); }
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
        .wave1 { animation: wave 10s ease-in-out infinite; }
        .wave2 { animation: wave 8s ease-in-out infinite reverse; animation-delay: -2s; }
        .wave3 { animation: wave 12s ease-in-out infinite; animation-delay: -4s; }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.05; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.15; }
        }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-10 { transform: rotateY(10deg); }
        .-rotate-y-10 { transform: rotateY(-10deg); }
        .animate-slideInCenter { animation: slideInCenter 0.5s ease-out forwards; }
        .animate-slideOutLeft { animation: slideOutLeft 0.3s ease-in forwards; }
        .animate-slideOutRight { animation: slideOutRight 0.3s ease-in forwards; }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
};

const PricingCard = ({ plan, onChoosePlan, isHighlighted, index, isTransitioning }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-[#1a1a2e] text-white p-6 w-72 sm:w-80 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl group cursor-pointer ${
        isHighlighted ? "border-2 border-[#0070f3]/50" : "hover:border-2 hover:border-[#0070f3]/30"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 bg-white/10 rounded-xl transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Shimmer Effect */}
      <div
        className={`absolute inset-0 rounded-xl overflow-hidden transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        } pointer-events-none`} // Added pointer-events-none to prevent click interference
        style={{ zIndex: 5 }} // Lower z-index than button
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>

      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-[#0070f3] text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-md">
            <Star size={14} fill="currentColor" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* Floating Icon */}
      <div
        className={`absolute -top-4 -right-4 w-12 h-12 bg-[#0070f3] rounded-lg flex items-center justify-center border border-white/20 shadow-md transition-all duration-500 ${
          isHovered ? "scale-110 bg-[#00d4aa]" : "scale-100"
        }`}
        style={{ animation: `iconFloat ${2 + index * 0.3}s ease-in-out infinite` }}
      >
        <span className="text-2xl">{plan.icon}</span>
      </div>

      {/* Plan Header */}
      <div className="text-center mb-6 relative z-10">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">{plan.name}</h3>
        <div className="mb-3">
          <span className="text-4xl font-bold text-white">
            {plan.currency}
            {plan.price}
          </span>
          {plan.period && <span className="text-sm opacity-75 ml-2 block mt-1">/{plan.period}</span>}
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{plan.description}</p>
      </div>

      {/* Features List */}
      <ul className="space-y-3 mb-6 relative z-10">
        {plan.features.map((feature, featureIndex) => (
          <li
            key={featureIndex}
            className={`flex items-center text-sm transition-all duration-500 ${
              isHovered ? "translate-x-2 text-white" : "text-gray-300"
            }`}
            style={{ transitionDelay: `${featureIndex * 50}ms` }}
          >
            <div
              className={`bg-white/20 rounded-full p-1.5 mr-4 transition-all duration-300 ${
                isHovered ? "bg-[#00d4aa]/80 scale-110" : ""
              }`}
            >
              <Check size={14} className={`transition-colors duration-300 ${isHovered ? "text-white" : ""}`} />
            </div>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => onChoosePlan(plan)}
        className={`relative w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 bg-[#0070f3] text-white hover:bg-[#00d4aa] hover:scale-105 border border-[#0070f3]/50 flex items-center justify-center gap-1.5 ${
          isHovered ? "shadow-md shadow-[#00d4aa]/50" : "shadow-md shadow-[#0070f3]/50"
        }`}
        style={{ zIndex: 20 }} // Ensure button is above shimmer effect
      >
        <span>{plan.buttonText}</span>
        {isHovered && <Zap size={16} className="animate-bounce" />}
      </button>

      <style jsx>{`
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
};


export default PricingSlider;