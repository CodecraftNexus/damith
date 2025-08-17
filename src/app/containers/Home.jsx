"use client";

import React, { useEffect, useState } from 'react'
import 'boxicons/css/boxicons.min.css'
import Image from 'next/image';

const homePage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [screenSize, setScreenSize] = useState('desktop');

    useEffect(() => {
        setIsVisible(true);

        const handleResize = () => {
            if (window.innerWidth < 640) {
                setScreenSize('mobile');
            } else if (window.innerWidth < 1024) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const skills = [
        { name: 'React',  color: ' to-white' },
        { name: 'Next',  color: 'to-white' },
        { name: 'Node',  color: ' to-white' },
        { name: 'MongoDB',  color: 'to-white' },
        { name: 'JavaScript',  color: 'to-white' },
        { name: 'CSS',  color: 'to-white' }
    ];

    return (
        <div className='lg:px-[150px] nav-main mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen px-4  py-8 lg:py-0 relative'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 sm:opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-[#0070f3] rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#00d4aa] rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#0070f3] rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-[#00d4aa] rounded-full animate-pulse delay-500"></div>
            </div>

            <div className=' mt-10 lg:mt-0 px-4 flex flex-col items-start justify-center lg:w-[70%] w-full relative z-10'>
                <h2 className={`text-[40px] sm:text-[60px] text-home-3 lg:text-[70px] font-bold leading-[105%] mb-[10px] text-center lg:text-left w-full lg:w-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className={`text-[28px] sm:text-[40px] text-home-1 lg:text-[50px] font-bold text-[#0070f3]`}>Hello,</span>
                    <br /> I'M  Damith.
                </h2>
                <h5 className={`text-[#00d4aa] text-[18px] sm:text-[24px] lg:text-[28px] mb-[20px] text-center lg:text-left w-full lg:w-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Full Stack Web Developer</h5>
                <p className={`text-[14px] sm:text-[16px] lg:text-[18px] mb-[20px] text-gray-300 mt-4 w-full lg:w-[80%] text-home-2 text-wrap lg:text-justify text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>I specialize in building custom websites and web applications using modern technologies like Next.js, React, and Node.js. With a focus on user experience and performance, I help businesses establish their digital presence and grow online.</p>

                {/* Stats Badges */}
                <div className={`flex gap-2 sm:gap-4 mb-4 w-full justify-center lg:justify-start transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/20 shadow-xl">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#00d4aa] rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px] sm:text-xs">✓</span>
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold text-xs sm:text-sm">50+</div>
                                <div className="text-gray-300 text-[8px] sm:text-xs">Projects</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/20 shadow-xl">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#0070f3] rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px] sm:text-xs">⭐</span>
                            </div>
                            <div className="text-left">
                                <div className="text-white font-bold text-xs sm:text-sm">4.9/5</div>
                                <div className="text-gray-300 text-[8px] sm:text-xs">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col sm:flex-row gap-4 w-full lg:w-auto justify-center lg:justify-start transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <a href='#portfolio'  className='bg-[#0070f3] shadow-[0px_0px_3px_3px_#0070f3] text-white px-4 sm:px-6 lg:px-8 font-bold text-[14px] sm:text-[16px] flex justify-center items-center gap-2 py-3 rounded-2xl mt-6 hover:bg-[#005bb5] hover:shadow-none transition duration-500 w-full sm:w-auto transform hover:scale-105'>
                        View My Work  <i className='bx bx-laptop text-[14px] sm:text-[16px]'></i>
                    </a>
                    <a href='#contact' className='bg-[#00d4aa] shadow-[0px_0px_3px_3px_#00d4aa] text-white px-4 sm:px-6 lg:px-8 font-bold text-[14px] sm:text-[16px] flex justify-center items-center gap-2 py-3 rounded-2xl mt-6 hover:bg-[#00d4c2] hover:shadow-none transition-all duration-500 w-full sm:w-auto transform hover:scale-105'>
                        Contact Me   <i className='bx bx-right-arrow-alt text-[14px] sm:text-[16px]'></i>
                    </a>
                </div>
            </div>

            <div className='image mt-8 lg:mt-0 flex justify-center lg:justify-start relative'>
                {/* Hero Image Container with floating skills */}
                <div className="relative">
                    {/* Profile Image with gradient background effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0070f3] via-[#00d4aa] to-purple-600 rounded-full animate-pulse blur-sm"></div>
                        <Image
                            width={500}
                            height={500}
                            src={"/hero.jpg"}

                            alt="Damith - Full Stack Web Developer"
                            className={`relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] lg:mt-10 rounded-full object-cover border-4 border-white/20 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                        />

                        {/* Floating Skill Icons around the image */}
                        {skills.map((skill, index) => {
                            const getPositions = () => {
                                const mobilePositions = [
                                    { top: '10%', left: '80%' },
                                    { top: '25%', left: '-5%' },
                                    { top: '60%', left: '-4%' },
                                    { top: '95%', left: '50%' },
                                    { top: '5%', left: '20%' },
                                    { top: '50%', left: '90%' },
                                ];

                                const tabletPositions = [
                                    { top: '10%', left: '80%' },
                                    { top: '25%', left: '-5%' },
                                    { top: '60%', left: '-4%' },
                                    { top: '95%', left: '50%' },
                                    { top: '5%', left: '20%' },
                                    { top: '50%', left: '90%' },
                                ];

                                const desktopPositions = [
                                    { top: '10%', left: '80%' },
                                    { top: '25%', left: '-5%' },
                                    { top: '60%', left: '-5%' },
                                    { top: '90%', left: '50%' },
                                    { top: '5%', left: '20%' },
                                    { top: '50%', left: '90%' },
                                ];

                                if (screenSize === 'mobile') return mobilePositions[index];
                                if (screenSize === 'tablet') return tabletPositions[index];
                                return desktopPositions[index];
                            };

                            return (
                                <div
                                    key={skill.name}
                                    className={`absolute transition-all duration-1000 delay-${index * 200 + 1000} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                        } sm:block lg:block`}
                                    style={{
                                        ...getPositions(),
                                        animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                                        zIndex: 10
                                    }}
                                >
                                    <div className={`bg-gradient-to-r ${skill.color} p-1 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl backdrop-blur-sm border border-white/20 w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] lg:w-[60px] lg:h-[60px] flex items-center justify-center hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-center">
                                            <div className="text-[8px] sm:text-sm lg:text-lg mb-0 sm:mb-1"><Image
                                                src={`/${skill.name.toLowerCase()}.png`} alt={skill.name} width={24} height={24} className="w-full h-full"
                                            ></Image></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Custom CSS for floating animation */}
                <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
            </div>
        </div>
    )
}

export default homePage