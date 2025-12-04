import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const toRotate = [ "Web Developer", "Administrator", "Designer" ];
  const TYPING_SPEED_MIN = 80;
  const TYPING_SPEED_MAX = 150;
  const DELETING_SPEED = 50;
  const PAUSE_BEFORE_DELETE = 2000;
  const PAUSE_BEFORE_TYPE = 500;

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      let nextSpeed = typingSpeed;

      if (isDeleting) {
        nextSpeed = DELETING_SPEED;
      } else {
        nextSpeed = Math.floor(Math.random() * (TYPING_SPEED_MAX - TYPING_SPEED_MIN + 1)) + TYPING_SPEED_MIN;
      }

      if (!isDeleting && text === fullText) {
        nextSpeed = PAUSE_BEFORE_DELETE;
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        nextSpeed = PAUSE_BEFORE_TYPE;
      }

      setTypingSpeed(nextSpeed);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, toRotate]);

  return (
    <section id="home" className="flex items-center justify-center relative overflow-hidden min-h-[calc(100vh-5rem)]">
      {/* Background Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-[95%] mx-auto px-4 flex flex-col items-center justify-center relative z-10 text-center">
        
        {/* Text Content - Centered */}
        <div className="w-full">
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-4 text-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Hello, I'm {PORTFOLIO_DATA.name}
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight min-h-[160px] md:min-h-[180px] flex flex-col items-center justify-center">
            <span>I am a</span>
            <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent inline-flex items-center justify-center pb-3">
              {text}
              <span className="ml-1 w-1 h-12 md:h-16 bg-blue-500 animate-[blink_1s_step-end_infinite]"></span>
            </span>
          </h1>
          
          <div className="mt-6 max-w-4xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <p>{PORTFOLIO_DATA.about}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;