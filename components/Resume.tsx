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
    <section id="experience" ref={sectionRef} className="min-h-screen flex flex-col pt-[33px] pb-[33px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
        </div>

        <div className="w-full">
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
        </div>
      </div>
    </section>
  );
};

export default Resume;