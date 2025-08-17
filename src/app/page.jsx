"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "./containers/navbar";
import HomePage from "./containers/Home";
import Sevice from "./containers/Sevice"; // Note: Fix typo to "Service"
import PortfolioSection from "./containers/portfolioPage";
import TestimonialsSlider from "./containers/Terminsional"; // Note: Fix typo to "Testimonial"
import AboutMe from "./containers/about";
import GetInTouch from "./containers/GetInTouch";
import Footer from "./containers/Footer";

// Utility to check if all images in a container are loaded
const checkImagesLoaded = (containerRef) => {
  return new Promise((resolve) => {
    const images = containerRef.current?.querySelectorAll('img') || [];
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      resolve(true);
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount >= totalImages) resolve(true);
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount >= totalImages) resolve(true);
        }, { once: true });
        img.addEventListener('error', () => {
          loadedCount++;
          if (loadedCount >= totalImages) resolve(true);
        }, { once: true });
      }
    });
  });
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const containerRefs = {
    home: useRef(null),
    service: useRef(null),
    portfolio: useRef(null),
    testimonials: useRef(null),
    about: useRef(null),
    getInTouch: useRef(null),
    footer: useRef(null),
  };

  // Preloader logic
  useEffect(() => {
    const checkAllContainersLoaded = async () => {
      await new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve, { once: true });
        }
      });

      const containerPromises = Object.values(containerRefs).map((ref) =>
        checkImagesLoaded(ref)
      );
      await Promise.all(containerPromises);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    checkAllContainersLoaded();

    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('load', checkAllContainersLoaded);
    };
  }, []);

  // Back to Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Preloader animation variants
  const preloaderVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 1.3,
      transition: { duration: 0.5, ease: 'easeIn' },
    },
  };

  // Back to Top button animation variants
  const backToTopVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="bg-[#0f0f23] text-white relative">
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-[#0f0f23] flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={preloaderVariants}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 w-48 h-48 bg-gradient-to-r from-[#0070f3] to-[#00d4aa] rounded-full animate-wave-scale blur-2xl opacity-50"></div>
              <div className="absolute w-32 h-32">
                <div className="absolute w-4 h-4 bg-[#0070f3] rounded-full animate-orbit top-0 left-1/2"></div>
                <div className="absolute w-4 h-4 bg-[#00d4aa] rounded-full animate-orbit delay-300 bottom-0 left-1/2"></div>
              </div>
              <motion.div
                className="relative text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0070f3] to-[#00d4aa] bg-clip-text text-transparent"
                animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                Damith akalanka
              </motion.div>
              <motion.p
                className="mt-4 text-base sm:text-lg text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Crafting Digital Solutions...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render containers only when not loading */}
      {!isLoading && (
        <main className="relative">
          <Navbar />
          <motion.div
            id="home"
            ref={containerRefs.home}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <HomePage />
          </motion.div>
          <motion.div
            id="services"
            ref={containerRefs.service}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <Sevice />
          </motion.div>
          <motion.div
            id="portfolio"
            ref={containerRefs.portfolio}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <PortfolioSection />
          </motion.div>
          <motion.div
            id="testimonials"
            ref={containerRefs.testimonials}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <TestimonialsSlider />
          </motion.div>
          <motion.div
            id="about"
            ref={containerRefs.about}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <AboutMe />
          </motion.div>
          <motion.div
            id="contact"
            ref={containerRefs.getInTouch}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <GetInTouch />
          </motion.div>
          <motion.div
            id="footer"
            ref={containerRefs.footer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <Footer />
          </motion.div>

          {/* Back to Top Button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-[#0070f3] to-[#00d4aa] text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 focus:outline-none z-40"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={backToTopVariants}
                title="Back to Top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </main>
      )}

      {/* Custom CSS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes wave-scale {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }
        .animate-wave-scale {
          animation: wave-scale 2s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Home;