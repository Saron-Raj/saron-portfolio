import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Resume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-8 bg-transparent scroll-mt-24">
      <div className="w-full max-w-[95%] mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
        </div>

        <div className="relative pl-4 md:pl-0 space-y-8">
          {/* Vertical Line - Grows when visible */}
          <div className={`absolute top-0 left-[-7px] md:left-1/2 md:-ml-[1px] w-[2px] bg-gray-200 dark:bg-gray-700 transition-all duration-[1500ms] ease-out ${isVisible ? 'h-full' : 'h-0'}`}></div>

          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-0">
              
              <div className={`md:flex items-start justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
                
                {/* Spacer for the other side of timeline */}
                <div className="hidden md:block w-5/12"></div>
                
                {/* Content Card with Staggered Animation */}
                <div 
                  className={`w-full md:w-5/12 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-700 border border-gray-100 dark:border-gray-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                  <h4 className="text-md font-medium text-gray-500 dark:text-gray-400 mb-3">{exp.company}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Timeline Dot with Delay */}
                <div 
                  className={`absolute top-6 left-[-11px] md:left-1/2 md:-ml-[11px] w-[22px] h-[22px] rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 z-10 transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ transitionDelay: `${index * 300 + 100}ms` }}
                ></div>

              </div>
            </div>
          ))}
        </div>
        
        <div className={`mt-12 text-center transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Full Resume
            </a>
        </div>

      </div>
    </section>
  );
};

export default Resume;