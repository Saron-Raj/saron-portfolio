import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  width?: "full" | "100%";
}

export const SectionReveal: React.FC<Props> = ({ children, width = "full" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${width === "full" ? "w-full" : ""}`}
    >
      {children}
    </div>
  );
};
