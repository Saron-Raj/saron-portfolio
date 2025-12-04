import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import GeminiChat from './components/GeminiChat';
import { SectionReveal } from './components/SectionReveal';

const App: React.FC = () => {
  return (
    <div className={`min-h-screen relative pt-20 overflow-x-hidden`}>
      {/* Global Beautiful Background (Light Mode) */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white">
         <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
         <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <Header />
      
      <main>
        <Hero />
        <SectionReveal>
          <Skills />
        </SectionReveal>
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <SectionReveal>
          <Resume />
        </SectionReveal>
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>

      <footer className="bg-white/80 backdrop-blur-md py-6 text-center border-t border-gray-200 mt-0 flex flex-col items-center gap-4">
        <p className="text-gray-600 font-medium text-sm">
          @2025 Saron Portfolio developed by Saron
        </p>
      </footer>

      <GeminiChat />
    </div>
  );
};

export default App;