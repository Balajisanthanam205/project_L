import { useEffect, useRef, useState } from "react";

// ========== EASY ADJUSTMENTS ==========
export const CURSOR_RADIUS = 150; // Adjust cursor radius here (in pixels)
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
      className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background,box-shadow] duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        width: CURSOR_RADIUS * 2,
        height: CURSOR_RADIUS * 2,
        border: cursorColor === 'green' 
          ? "2px solid hsl(136 100% 50% / 0.6)"
          : "2px solid hsl(280 99% 54% / 0.6)",
        background: cursorColor === 'green' 
          ? "radial-gradient(circle, hsl(136 100% 50% / 0.15) 0%, transparent 70%)"
          : "radial-gradient(circle, hsl(280 99% 54% / 0.15) 0%, transparent 70%)",
        boxShadow: cursorColor === 'green'
          ? "0 0 40px hsl(136 100% 50% / 0.3), inset 0 0 30px hsl(136 100% 50% / 0.1)"
          : "0 0 40px hsl(280 99% 54% / 0.3), inset 0 0 30px hsl(280 99% 54% / 0.1)",
      }}
    />
  );
};

export default GlobalCursor;
