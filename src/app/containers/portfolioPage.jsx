"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, X, ZoomIn, ZoomOut, RotateCcw, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import 'boxicons/css/boxicons.min.css';
import Image from 'next/image';

const PortfolioSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const [imagePreview, setImagePreview] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Video-specific states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);
  }, []);

  // Generate stable particle positions
  const particlePositions = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      left: `${(i * 37) % 100}%`,
      top: `${(i * 23) % 100}%`,
      animationDelay: `${(i * 0.1) % 3}s`,
    }));
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && imagePreview) {
        setImagePreview(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [imagePreview]);

  const projects = [
    {
      id: 1,
      title: 'Clara Portfolio Page',
      description: 'Clara Montgomery professional portfolio website built with HTML & CSS. Showcasing digital design projects, UX/UI skills, and creative work. View my projects online.',
      technologies: [
        { name: 'HTML', icon: 'bx bxl-react', image: '/html.png' },
        { name: 'Javascript', icon: 'bx bx-credit-card', image: '/javascript.png' },
        { name: 'Three.Js', icon: 'bx bx-data', image: '/threejs.png' },
        { name: 'CSS', icon: 'bx bxl-css3', image: '/css.png' },
      ],
      images: [
        { src: '/claraProject/home.mp4', alt: 'Home Section Demo', type: 'video' },
        { src: '/claraProject/about.png', alt: 'About Section Demo', type: 'image' },
        { src: '/claraProject/education.mp4', alt: 'Education Section Demo', type: 'video' },
        { src: '/claraProject/skill.png', alt: 'Skill Section Demo', type: 'image' },
        { src: '/claraProject/contact.png', alt: 'Contact Section Demo', type: 'image' }
      ],
      image: '/claraProject/homepreview.png',
      liveDemo: 'https://codecraftnexus.github.io/Clara-Portfolio/',
      codeLink: 'https://github.com/CodecraftNexus/Clara-Portfolio',
      icon: 'bx bx-store',
      accentColor: '#0070f3',
      particles: 'blue',
      popular: true,
      showLiveDemo: true, // Show Live Demo button
      showViewCode: true, // Hide View Code button
    },
    {
      id: 2,
      title: 'Fincro Holding',
      description: 'Fincro Holdings - Premium Sri Lankan food products company. Quality and originality in every product, showcasing authentic Sri Lankan cultural value beyond business.',
      technologies: [
        { name: 'PHP', icon: 'bx bxl-react', image: '/php.png' },
        { name: 'MySQL', icon: 'bx bxl-nodejs', image: '/mysql.png' },
        { name: 'Javascript', icon: 'bx bx-data', image: '/javascript.png' },
        { name: 'CSS', icon: 'bx bx-server', image: '/css.png' },
        { name: 'Boostrap', icon: 'bx bx-server', image: '/bootstrap.png' },
      ],
      images: [
        { src: '/fincroholding/home.mp4', alt: 'Home Page View', type: 'video' },
        { src: '/fincroholding/localtea.png', alt: 'Local Tea Page View', type: 'image' },
        { src: '/fincroholding/exporttea.mp4', alt: 'Export Tea Page View', type: 'video' },
        { src: '/fincroholding/bulktea.mp4', alt: 'Bulk Tea Page View', type: 'video' },
        { src: '/fincroholding/spices.mp4', alt: 'Spices Page View', type: 'video' },
        { src: '/fincroholding/food.mp4', alt: 'Food Page View', type: 'video' },
        { src: '/fincroholding/about.png', alt: 'About Page View', type: 'image' },
        { src: '/fincroholding/contact.png', alt: 'Contact Page View', type: 'image' },
 
      ],
      image: '/fincroholding/preview.png',
      liveDemo: 'https://www.fincroholding.com',
      icon: 'bx bx-task',
      accentColor: '#00d4aa',
      particles: 'teal',
      popular: false,
      showLiveDemo: true, // Show Live Demo button
      showViewCode: false, // Show View Code button
    },
    {
      id: 3,
      title: 'Farmerce Fertilizer',
      description: 'QR Code Genarated System.',
      technologies: [
        { name: 'Next.js', icon: 'bx bxl-react', image: '/next.png' },
        { name: 'MongoDB', icon: 'bx bx-data', image: '/mongodb.png' },
        { name: 'Tailwind CSS', icon: 'bx bxl-tailwind-css', image: '/tailwind.png' },
        { name: 'Express Js', icon: 'bx bxl-tailwind-css', image: '/express.png' },
        { name: 'Python', icon: 'bx bxl-tailwind-css', image: '/python.png' },
      ],
      images: [
        { src: '/farmercedashbord/full.mp4', alt: 'Full Tour', type: 'video' },
        { src: '/farmercedashbord/loging.png', alt: 'Loging Page Preview', type: 'image' },
        { src: '/farmercedashbord/selectedproductdashbord.png', alt: 'Dashbord Preview', type: 'image' },
        { src: '/farmercedashbord/addproduct.png', alt: 'Add Product Model', type: 'image' },
        { src: '/farmercedashbord/addbatch.png', alt: 'Add Batch Model', type: 'image' },
        { src: '/farmercedashbord/updateproduct.png', alt: 'Update Product Model', type: 'image' },
        { src: '/farmercedashbord/deleteproduct.png', alt: 'Delete Product Model', type: 'image' },
        { src: '/farmercedashbord/updatebatch.png', alt: 'Update Batch Model', type: 'image' },
        { src: '/farmercedashbord/deletebatch.png', alt: 'Delete Batch Model', type: 'image' },
        { src: '/farmercedashbord/productdetails.png', alt: 'Product Details Page', type: 'image' },
        { src: '/farmercedashbord/qrcode.png', alt: 'QR Code Model', type: 'image' },
    
      ],
      image: '/farmercedashbord/dashbord.png',

      icon: 'bx bx-news',
      accentColor: '#0070f3',
      particles: 'blue',
      popular: false,
      showLiveDemo: false, // Hide Live Demo button
      showViewCode: false, // Show View Code button
    },
    
  ];

  // Utility function to check if current media is video
  const getCurrentMediaType = () => {
    if (imagePreview && imagePreview.images && imagePreview.images[previewImageIndex]) {
      return imagePreview.images[previewImageIndex].type || 'image';
    }
    return 'image';
  };

  const getCurrentMediaSrc = () => {
    if (imagePreview && imagePreview.images && imagePreview.images[previewImageIndex]) {
      return imagePreview.images[previewImageIndex].src;
    }
    return imagePreview?.image || '';
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
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

  const handleViewProject = (projectTitle) => {
    alert(`Viewing project: ${projectTitle}`);
  };

  const handleImageClick = (project) => {
    setImagePreview(project);
    setPreviewImageIndex(0);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsVideoPlaying(false);
    setIsVideoMuted(true);
    setVideoCurrentTime(0);
    setVideoDuration(0);
  };

  const closeImagePreview = () => {
    setImagePreview(null);
    setPreviewImageIndex(0);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsVideoPlaying(false);
    setIsVideoMuted(true);
    setVideoCurrentTime(0);
    setVideoDuration(0);
  };

  const nextPreviewImage = () => {
    if (imagePreview && imagePreview.images) {
      setPreviewImageIndex((prev) => (prev + 1) % imagePreview.images.length);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
      setIsVideoPlaying(false);
      setIsVideoMuted(true);
      setVideoCurrentTime(0);
      setVideoDuration(0);
    }
  };

  const prevPreviewImage = () => {
    if (imagePreview && imagePreview.images) {
      setPreviewImageIndex((prev) => (prev - 1 + imagePreview.images.length) % imagePreview.images.length);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
      setIsVideoPlaying(false);
      setIsVideoMuted(true);
      setVideoCurrentTime(0);
      setVideoDuration(0);
    }
  };

  const handleZoomIn = () => {
    if (getCurrentMediaType() === 'image') {
      setZoomLevel(prev => Math.min(prev + 0.5, 3));
    }
  };

  const handleZoomOut = () => {
    if (getCurrentMediaType() === 'image') {
      setZoomLevel(prev => {
        const newZoom = Math.max(prev - 0.5, 1);
        if (newZoom === 1) {
          setPanPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    }
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1 && getCurrentMediaType() === 'image') {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1 && getCurrentMediaType() === 'image') {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetImageView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    if (zoomLevel > 1 && e.touches.length === 1 && getCurrentMediaType() === 'image') {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({
        x: touch.clientX - panPosition.x,
        y: touch.clientY - panPosition.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1 && getCurrentMediaType() === 'image') {
      e.preventDefault();
      const touch = e.touches[0];
      setPanPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleVideoPlay = () => {
    const video = document.getElementById('preview-video');
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    const video = document.getElementById('preview-video');
    if (video) {
      video.muted = !video.muted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleVideoTimeUpdate = (e) => {
    setVideoCurrentTime(e.target.currentTime);
  };

  const handleVideoLoadedMetadata = (e) => {
    setVideoDuration(e.target.duration);
  };

  const handleVideoSeek = (e) => {
    const video = document.getElementById('preview-video');
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * videoDuration;
    
    if (video) {
      video.currentTime = newTime;
      setVideoCurrentTime(newTime);
    }
  };

  const toggleVideoFullscreen = () => {
    const video = document.getElementById('preview-video');
    if (video) {
      if (!isVideoFullscreen && video.requestFullscreen) {
        video.requestFullscreen();
        setIsVideoFullscreen(true);
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsVideoFullscreen(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#0F0F23] via-[#1a1a2e] to-[#16213e] py-12 px-4 relative overflow-hidden">
      {/* Background Particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-${projects[currentSlide].particles}-400/50 rounded-full animate-pulse`}
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
              }}
            />
          ))}
        </div>
      )}

      {/* Background Waves */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0070f3]/10 via-[#00d4aa]/10 to-[#0070f3]/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      </div>

      {/* Image/Video Preview Modal */}
      {imagePreview && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex flex-col">
            {/* Header Controls */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-sm border-b border-white/10 p-4 z-20">
              <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold truncate">{imagePreview.title}</h3>
                  {imagePreview.images && imagePreview.images.length > 1 && (
                    <p className="text-xs sm:text-sm text-gray-300">
                      {previewImageIndex + 1} of {imagePreview.images.length} - {imagePreview.images[previewImageIndex]?.alt}
                      <span className="ml-2 px-2 py-0.5 bg-gray-600 rounded text-xs">
                        {getCurrentMediaType().toUpperCase()}
                      </span>
                    </p>
                  )}
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-1 sm:gap-2 ml-4">
                  {getCurrentMediaType() === 'image' && (
                    <>
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 1}
                        className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-300"
                        title="Zoom Out"
                      >
                        <ZoomOut size={16} className="sm:w-5 sm:h-5" />
                      </button>
                      <span className="text-xs bg-black/50 px-2 py-1 rounded min-w-[50px] text-center">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-300"
                        title="Zoom In"
                      >
                        <ZoomIn size={16} className="sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}
              
                  <button
                    onClick={closeImagePreview}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300"
                    title="Close"
                  >
                    <X size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4">
              <div className="max-w-7xl mx-auto">
                {/* Media Container */}
                <div className="relative mb-6">
                  {/* Media Navigation Arrows */}
                  {imagePreview.images && imagePreview.images.length > 1 && (
                    <>
                      <button
                        onClick={prevPreviewImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
                      >
                        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={nextPreviewImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
                      >
                        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}

                  {/* Media Viewport */}
                  <div 
                    className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-[#1a1a2e] rounded-xl overflow-hidden border border-[#0070f3]/30"
                    style={{ touchAction: zoomLevel > 1 ? 'none' : 'auto' }}
                  >
                    {getCurrentMediaType() === 'video' ? (
                      <div className="relative w-full h-full">
                        <video
                          id="preview-video"
                          src={getCurrentMediaSrc()}
                          className="w-full h-full object-contain rounded-xl"
                          muted={isVideoMuted}
                          onTimeUpdate={handleVideoTimeUpdate}
                          onLoadedMetadata={handleVideoLoadedMetadata}
                          onPlay={() => setIsVideoPlaying(true)}
                          onPause={() => setIsVideoPlaying(false)}
                          controls={false}
                        />
                        
                        {/* Video Controls Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                          <button
                            onClick={toggleVideoPlay}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                          >
                            {isVideoPlaying ? <Pause size={32} /> : <Play size={32} />}
                          </button>

                          <div className="absolute bottom-4 left-4 right-4">
                            <div 
                              className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
                              onClick={handleVideoSeek}
                            >
                              <div 
                                className="h-full bg-[#0070f3] rounded-full transition-all duration-100"
                                style={{ 
                                  width: videoDuration > 0 ? `${(videoCurrentTime / videoDuration) * 100}%` : '0%' 
                                }}
                              />
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={toggleVideoPlay}
                                  className="text-white hover:text-[#0070f3] transition-colors"
                                >
                                  {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                                <button
                                  onClick={toggleVideoMute}
                                  className="text-white hover:text-[#0070f3] transition-colors"
                                >
                                  {isVideoMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                                <span className="text-white text-sm">
                                  {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
                                </span>
                              </div>
                              
                              <button
                                onClick={toggleVideoFullscreen}
                                className="text-white hover:text-[#0070f3] transition-colors"
                              >
                                <Maximize size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-full transition-all duration-300 ease-out"
                        style={{
                          transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                          cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      >
                        <Image
                          src={getCurrentMediaSrc()}
                          alt={imagePreview.images ? imagePreview.images[previewImageIndex]?.alt : imagePreview.title}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-xl"
                        />
                      </div>
                    )}
                    
                    {getCurrentMediaType() === 'image' && (
                      <div 
                        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full cursor-pointer hover:bg-black/70 transition-all duration-300"
                        onClick={zoomLevel === 1 ? handleZoomIn : resetImageView}
                        title={zoomLevel === 1 ? "Click to zoom" : "Click to reset"}
                      >
                        {zoomLevel === 1 ? <ZoomIn size={20} /> : <RotateCcw size={20} />}
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      {getCurrentMediaType() === 'video' 
                        ? "Click controls to play/pause • Click fullscreen icon to expand" 
                        : zoomLevel === 1 
                          ? "Click zoom icon or use controls • Ctrl+scroll to zoom" 
                          : "Click and drag to pan • Use controls to zoom out"
                      }
                    </div>
                  </div>
                </div>

                {imagePreview.images && imagePreview.images.length > 1 && (
                  <div className="mb-6">
                    <div className="flex justify-center">
                      <div className="flex gap-2 overflow-x-auto pb-2 max-w-full px-4">
                        {imagePreview.images.map((media, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setPreviewImageIndex(index);
                              setZoomLevel(1);
                              setPanPosition({ x: 0, y: 0 });
                              setIsVideoPlaying(false);
                              setIsVideoMuted(true);
                              setVideoCurrentTime(0);
                              setVideoDuration(0);
                            }}
                            className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                              index === previewImageIndex
                                ? 'border-[#0070f3] scale-110'
                                : 'border-gray-600 hover:border-gray-400'
                            }`}
                          >
                            {media.type === 'video' ? (
                              <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
                                <Play size={16} className="text-white" />
                                <video
                                  src={media.src}
                                  className="absolute inset-0 w-full h-full object-cover rounded-md opacity-50"
                                  muted
                                />
                              </div>
                            ) : (
                              <Image
                                src={media.src}
                                alt={media.alt}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                              />
                            )}
                            
                            <div className="absolute top-0.5 right-0.5 bg-black/70 text-white text-xs px-1 rounded">
                              {media.type === 'video' ? '▶' : '📷'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-[#1a1a2e]/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-[#0070f3]/30">
                  <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">{imagePreview.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {imagePreview.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="bg-[#0070f3]/20 text-[#0070f3] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5"
                      >
                        {tech.image ? (
                          <Image
                            src={tech.image}
                            alt={tech.name}
                            width={16}
                            height={16}
                            className="w-4 h-4 filter brightness-200"
                          />
                        ) : (
                          <i className={`${tech.icon} text-sm`}></i>
                        )}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {imagePreview.showLiveDemo !== false && (
                      <a
                        href={imagePreview.liveDemo}
                        className="bg-[#0070f3] hover:bg-[#00d4aa] text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <i className="bx bx-link-external"></i>
                        Live Demo
                      </a>
                    )}
                    {imagePreview.showViewCode !== false && (
                      <a
                        href={imagePreview.codeLink}
                        className="bg-[#00d4aa] hover:bg-[#0070f3] text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <i className="bx bx-code-alt"></i>
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-12 mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#0070f3] to-[#00d4aa] bg-clip-text text-white animate-pulse">
            My Projects
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore a collection of my work, showcasing modern web applications built with cutting-edge technologies.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:flex justify-center items-center space-x-6 perspective-1000">
            {projects.map((project, index) => {
              const isCenter = index === currentSlide;
              const isLeft = index === (currentSlide - 1 + projects.length) % projects.length;
              const isRight = index === (currentSlide + 1) % projects.length;
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
                  key={project.id}
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
                    animation: isCenter && !isTransitioning && isMounted ? `cardFloat ${2 + index * 0.3}s ease-in-out infinite` : 'none',
                  }}
                  onClick={() => !isCenter && goToSlide(index)}
                >
                  <ProjectCard
                    project={project}
                    onViewProject={handleViewProject}
                    onImageClick={handleImageClick}
                    isHighlighted={isCenter}
                    index={index}
                    isTransitioning={isTransitioning}
                  />
                </div>
              );
            })}
          </div>

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
                animation: !isTransitioning && isMounted ? `cardFloat ${2 + currentSlide * 0.3}s ease-in-out infinite` : 'none',
              }}
            >
              <ProjectCard
                project={projects[currentSlide]}
                onViewProject={handleViewProject}
                onImageClick={handleImageClick}
                isHighlighted={true}
                index={currentSlide}
                isTransitioning={isTransitioning}
              />
            </div>
          </div>

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

        <div className="flex justify-center mt-8 space-x-3">
          {projects.map((_, index) => (
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
      `}</style>
    </div>
  );
};

const ProjectCard = ({ project, onViewProject, onImageClick, isHighlighted, index, isTransitioning }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`relative bg-[#1a1a2e] text-white p-6 w-72 sm:w-80 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl group cursor-pointer ${
        isHighlighted ? 'border-2 border-[#0070f3]/50' : 'hover:border-2 hover:border-[#0070f3]/30'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-white/10 rounded-xl transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      <div
        className={`absolute inset-0 rounded-xl overflow-hidden transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>

      {project.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-[#0070f3] text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-md">
            <Star size={14} fill="currentColor" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {isMounted && (
        <div
          className={`absolute -top-4 -right-4 w-12 h-12 bg-[#0070f3] rounded-lg flex items-center justify-center border border-white/20 shadow-md transition-all duration-500 ${
            isHovered ? 'scale-110 bg-[#00d4aa]' : 'scale-100'
          }`}
          style={{ animation: `iconFloat ${2 + index * 0.3}s ease-in-out infinite` }}
        >
          <i className={`${project.icon} text-white text-2xl`}></i>
        </div>
      )}

      <div className="text-center mb-6 relative z-10">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">{project.title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
      </div>

      <div 
        className="relative w-full h-[140px] sm:h-[160px] mb-4 rounded-lg overflow-hidden cursor-pointer group/image"
        onClick={() => onImageClick(project)}
      >
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover/image:scale-105"
        />
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover/image:scale-100 transition-transform duration-300">
            <ZoomIn size={24} className="text-white" />
          </div>
        </div>
        
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
          Click to preview
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 justify-center relative z-10">
        {project.technologies.map((tech, techIndex) => (
          <div
            key={techIndex}
            className={`p-2 rounded-full transition-all duration-300 ${
              isHovered ? `bg-[#00d4aa]/20 text-[#00d4aa]` : `bg-[#0070f3]/20 text-[#0070f3]`
            }`}
            style={{ transitionDelay: `${techIndex * 50}ms` }}
            title={tech.name}
          >
            {tech.image ? (
              <Image
                src={tech.image}
                alt={tech.name}
                width={24}
                height={24}
                className="w-6 h-6 filter brightness-200"
              />
            ) : (
              <i className={`${tech.icon} text-lg sm:text-xl text-white`}></i>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-2 justify-center relative z-10">
        {project.showLiveDemo !== false && (
          <a
            href={project.liveDemo}
            className={`w-auto py-2 px-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 bg-[#0070f3] text-white hover:bg-[#00d4aa] hover:scale-105 border border-[#0070f3]/50 flex items-center justify-center gap-1.5 ${
              isHovered ? 'shadow-md shadow-[#00d4aa]/50' : 'shadow-md shadow-[#0070f3]/50'
            }`}
         
          >
            <i className="bx bx-link-external text-sm sm:text-base"></i>
            Live Demo
          </a>
        )}
        {project.showViewCode !== false && (
          <a
            href={project.codeLink}
            className={`w-auto py-2 px-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 bg-[#00d4aa] text-white hover:bg-[#0070f3] hover:scale-105 border border-[#00d4aa]/50 flex items-center justify-center gap-1.5 ${
              isHovered ? 'shadow-md shadow-[#0070f3]/50' : 'shadow-md shadow-[#00d4aa]/50'
            }`}
           
          >
            <i className="bx bx-code-alt text-sm sm:text-base"></i>
            View Code
          </a>
        )}
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

export default PortfolioSlider;