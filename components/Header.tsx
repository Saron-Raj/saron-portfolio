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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
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
  }, [activeSection]);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3 border-b border-gray-100 dark:border-gray-800' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
          onClick={goHome}
        >
          Saron Portfolio
        </div>

        {/* Desktop Nav - Liquid Animation Style */}
        <nav 
          ref={navRef}
          className="hidden md:flex items-center relative bg-gray-100/50 dark:bg-slate-800/50 p-1.5 rounded-full backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          {/* Moving Liquid Background Pill */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white dark:bg-slate-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          {SECTIONS.map((section) => (
            <button
              key={section.id}
              ref={(el) => { itemRefs.current[section.id] = el; }}
              onClick={() => handleNavClick(section.id)}
              className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                activeSection === section.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
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
              className={`text-left font-medium text-lg py-3 px-4 rounded-xl transition-all duration-300 transform ${
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