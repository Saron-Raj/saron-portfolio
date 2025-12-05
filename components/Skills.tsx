import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { PORTFOLIO_DATA } from '../constants';

const Skills: React.FC = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Create a shallow copy using spread syntax before sorting to avoid mutating the original array
  const data = [...PORTFOLIO_DATA.skills].sort((a, b) => b.level - a.level);

  // Custom colors for bars
  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  // Categories based on Saron's skills
  const categories = ['Frontend', 'Admin'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect(); // Only trigger animation once
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen flex flex-col pt-[33px] pb-[33px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <div className="mb-12 text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">Professional Skills</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
          <p className="mt-4 text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">My technical and professional proficiency across development and administration.</p>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8 items-center justify-center">
          
          {/* Chart Container */}
          <div className="w-full lg:w-2/3 h-[400px] bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-start">
            {startAnimation ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'black', fontSize: 13, fontWeight: 500 }} 
                    width={130}
                    stroke="black"
                    className="text-black"
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar 
                    dataKey="level" 
                    radius={[0, 4, 4, 0]} 
                    barSize={24} 
                    animationDuration={2000} // Smooth 2s animation
                    isAnimationActive={true}
                  >
                     {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full"></div> // Placeholder to maintain height before animation
            )}
          </div>

          {/* Categories List */}
          <div className="w-full lg:w-1/3 grid grid-cols-1 gap-4">
             {categories.map((category) => (
               <div key={category} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-100 dark:border-gray-700 text-center shadow-sm flex flex-col items-center justify-center">
                 <h3 className="font-bold text-lg text-black dark:text-white mb-4">{category}</h3>
                 <div className="flex flex-wrap justify-center gap-3">
                   {PORTFOLIO_DATA.skills
                     .filter(s => s.category === category)
                     .map(s => (
                       <span key={s.name} className="text-sm font-medium px-4 py-2 rounded-full bg-blue-100 text-black border border-blue-200 hover:bg-blue-200 transition-colors cursor-default">
                         {s.name}
                       </span>
                     ))}
                 </div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;