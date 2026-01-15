import { useEffect, useRef, useState } from "react";

// ========== EASY ADJUSTMENTS ==========
export const CURSOR_RADIUS = 8; // Small dot radius (in pixels)
// ======================================

const GlobalCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorColor, setCursorColor] = useState<'green' | 'purple'>('green');
  const [isVisible, setIsVisible] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Interactive element detection for cursor color change
  useEffect(() => {
    if (isMobile) return;

    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive');
      
      setCursorColor(isInteractive ? 'purple' : 'green');
    };

    document.addEventListener('mouseover', checkInteractive);
    return () => document.removeEventListener('mouseover', checkInteractive);
  }, [isMobile]);

  // Global mouse tracking
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        width: CURSOR_RADIUS * 2,
        height: CURSOR_RADIUS * 2,
        background: cursorColor === 'green' 
          ? "hsl(136 100% 50%)"
          : "hsl(280 99% 54%)",
        boxShadow: cursorColor === 'green'
          ? "0 0 10px hsl(136 100% 50% / 0.8), 0 0 20px hsl(136 100% 50% / 0.4)"
          : "0 0 10px hsl(280 99% 54% / 0.8), 0 0 20px hsl(280 99% 54% / 0.4)",
      }}
    />
  );
};

export default GlobalCursor;
