import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Refs for Liquid Animation
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Combined Scroll Listener for Scroll State and Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Header Background Styling
      setIsScrolled(window.scrollY > 20);

      // 2. Handle Active Section Spy
      // Trigger point is slightly down the viewport (e.g. 180px) to account for header height
      const spyLine = window.scrollY + 180; 
      
      // Calculate document height more robustly
      const bodyHeight = document.documentElement.scrollHeight;
      
      // Special check for bottom of page to activate Contact if we are truly at the bottom
      // Added window.scrollY > 100 to prevent this from firing at the top of the page
      if (window.scrollY > 100 && (window.innerHeight + window.scrollY) >= bodyHeight - 20) {
         setActiveSection(SECTIONS[SECTIONS.length - 1].id);
         return;
      }

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          // Use getBoundingClientRect to get absolute position relative to viewport, then add scrollY
          // This avoids issues where offsetTop is 0 because of parent containers (like SectionReveal)
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementHeight = rect.height;

          // Check if the spy line is within the bounds of this section
          if (spyLine >= elementTop && spyLine < elementTop + elementHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update Liquid Indicator Position
  useEffect(() => {
    const updateIndicator = () => {
      const activeElement = itemRefs.current[activeSection];
      if (activeElement && navRef.current) {
        // Calculate position relative to the nav container
        const { offsetLeft, offsetWidth } = activeElement;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
          opacity: 1
        });
      }
    };

    // Run initially and on resize
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    
    // Timeout to handle any layout shifts or font loading
    const timeout = setTimeout(updateIndicator, 100);

    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timeout);
    };
  }, [activeSection, isMobileMenuOpen]); 

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Adjusted scroll position to account for fixed header
      const headerOffset = 80;
      // Get absolute position
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Manually set active section immediately for snappiness
      setActiveSection(id);
    }
  };

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      {/* 
        Liquid Glass Background Container 
        Full-width, semi-transparent background with backdrop blur effect.
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base Glass Layer with Semi-Transparency and Blur */}
        <div className={`absolute inset-0 backdrop-blur-3xl border-b transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/75 dark:bg-slate-900/75 border-white/20 shadow-sm' 
            : 'bg-white/20 dark:bg-slate-900/20 border-white/5'
        }`}></div>
        
        {/* Animated Liquid Gradient Layer - Always active and visible */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay animate-liquid-glass"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 25%, transparent 50%, rgba(255,255,255,0.4) 75%, transparent 100%)',
            backgroundSize: '200% 100%'
          }}
        ></div>
        
        {/* Subtle Shine/Refraction Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-10">
        {/* Logo */}
        <div 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
          onClick={goHome}
        >
          Saron Portfolio
        </div>

        {/* Desktop Nav - Liquid Glass "Dynamic Island" Style */}
        <nav 
          ref={navRef}
          className="hidden md:flex items-center relative bg-black/20 dark:bg-black/40 backdrop-blur-2xl p-1.5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] ring-1 ring-white/10"
        >
          {/* Moving Liquid Glass Pill */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              // Glass Styles
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(12px)',
              boxShadow: `
                inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), 
                inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1),
                0 4px 15px 0 rgba(0, 0, 0, 0.1)
              `,
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Internal Flowing Light Animation */}
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-gloss-flow"></div>
          </div>

          {SECTIONS.map((section) => (
            <button
              key={section.id}
              ref={(el) => { itemRefs.current[section.id] = el; }}
              onClick={() => handleNavClick(section.id)}
              className={`relative z-10 px-6 py-2 text-sm font-bold rounded-full transition-all duration-700 hover:scale-105 ${
                activeSection === section.id
                  ? 'text-white text-shadow-sm scale-105'
                  : 'text-slate-400 dark:text-slate-300 hover:text-white'
              }`}
              style={{
                textShadow: activeSection === section.id ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown with Animation */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`text-left font-bold text-lg py-3 px-4 rounded-xl transition-all duration-300 transform ${
                activeSection === section.id
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 translate-x-2'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 hover:translate-x-2'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;