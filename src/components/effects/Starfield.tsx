import { useEffect, useRef } from "react";

const Starfield = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create subtle stars
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "absolute rounded-full";
      const size = Math.random() * 1.5 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.background = `hsl(120 100% 44% / ${Math.random() * 0.3 + 0.1})`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.animation = `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`;
      container.appendChild(star);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-background" />

      {/* Very subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, hsl(280 96% 38% / 0.05) 0%, transparent 50%)",
        }}
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 70% 80%, hsl(120 100% 44% / 0.03) 0%, transparent 40%)",
        }}
      />

      {/* Stars container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* CSS for twinkle animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Starfield;
