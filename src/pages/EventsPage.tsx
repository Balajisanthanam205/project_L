import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Stone Images
import spaceImg from '@/assets/stones/space.png';
import mindImg from '@/assets/stones/mind.png';
import realityImg from '@/assets/stones/reality.png';
import soulImg from '@/assets/stones/soul.png';
import timeImg from '@/assets/stones/time.png';
import powerImg from '@/assets/stones/power.png';

gsap.registerPlugin(ScrollTrigger);

// Import all frames eagerly so we have their URLs
const framesFiles = import.meta.glob('/src/assets/frames3/*.webp', { eager: true, as: 'url' });

// Sort frames by frame number to ensure correct order
const sortedFrameKeys = Object.keys(framesFiles).sort((a, b) => {
    // Extract numbers from filenames like "frame 0.webp"
    const numA = parseInt(a.match(/frame (\d+)/)?.[1] || "0");
    const numB = parseInt(b.match(/frame (\d+)/)?.[1] || "0");
    return numA - numB;
});

const frameUrls = sortedFrameKeys.map(key => framesFiles[key]);

// Stone Data
const stones = [
    { name: 'Space', color: 'rgba(0,0,255,0.8)', glow: '0 0 20px blue', pos: { top: '30%', left: '20%' }, img: spaceImg, link: '/events/paper-presentation' }, // Left
    { name: 'Mind', color: 'rgba(255,255,0,0.8)', glow: '0 0 20px yellow', pos: { top: '50%', left: '15%' }, img: mindImg, link: '/events/project-expo' },   // Left
    { name: 'Reality', color: 'rgba(255,0,0,0.8)', glow: '0 0 20px red', pos: { top: '70%', left: '20%' }, img: realityImg, link: '/events/treasure-hunt' },   // Left
    { name: 'Soul', color: 'rgba(255,165,0,0.8)', glow: '0 0 20px orange', pos: { top: '30%', right: '20%' }, img: soulImg, link: '/events/circuit-trade' },    // Right
    { name: 'Time', color: 'rgba(0,128,0,0.8)', glow: '0 0 20px green', pos: { top: '50%', right: '15%' }, img: timeImg, link: '/events/hardware-hack-arena' }, // Right
    { name: 'Power', color: 'rgba(128,0,128,0.8)', glow: '0 0 20px purple', pos: { top: '70%', right: '20%' }, img: powerImg, link: '/events/neural-nexus-quiz' }  // Right
];


const EventsPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stonesRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Initial load of images into HTMLImageElement objects for canvas drawing
    useEffect(() => {
        console.log("EventsPage: Component Mounted");
        console.log("EventsPage: Frame Keys", sortedFrameKeys);
        console.log("EventsPage: Frame URLs", frameUrls);

        let loadedCount = 0;
        const imgObjs: HTMLImageElement[] = [];

        frameUrls.forEach((url, i) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameUrls.length) {
                    console.log("EventsPage: All images loaded");
                    setImagesLoaded(true);
                }
            };
            img.onerror = (e) => {
                console.error("EventsPage: Error loading image", url, e);
            };
            imgObjs[i] = img; // Ensure order is preserved
        });
        setImages(imgObjs);
    }, []);


    useLayoutEffect(() => {
        if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set high resolution canvas
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(0); // Re-render current frame on resize (approximation)
        };

        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();


        const frameCount = frameUrls.length - 1;
        const frames = { current: 0 };

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img) return;

            // Draw image to cover canvas (object-fit: cover equivalent)
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        };

        // Initial render
        renderFrame(0);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // 4x viewport height scroll distance
                scrub: 1, // Smooth scrubbing
                pin: true,
                onUpdate: (self) => {
                    const frameIndex = Math.floor(self.progress * frameCount);
                    renderFrame(Math.min(frameIndex, frameCount));
                }
            }
        });

        // Hide "Scroll to enter" text
        tl.to(textRef.current, { opacity: 0, duration: 0.1 }, 0);

        // Reveal stones at the end
        if (stonesRef.current) {
            tl.to(stonesRef.current, {
                opacity: 1,
                duration: 0.2,
                pointerEvents: 'auto'
            }, 0.82); // Start showing around frame 65
        }

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [imagesLoaded, images]);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-black" />

            <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] animate-pulse">
                    SCROLL TO ENTER
                </h2>
                <div className="mt-4 animate-bounce text-white/50">
                    ↓
                </div>
            </div>

            <div
                ref={stonesRef}
                className="absolute inset-0 z-20 opacity-0 pointer-events-none transition-opacity duration-1000"
            >
                {stones.map((stone, index) => (
                    <Link
                        key={index}
                        to={stone.link}
                        className="absolute block group"
                        style={{ ...stone.pos }} // top/left/right positions
                    >
                        <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32">
                            {/* Glow Effect */}
                            <div
                                className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                                style={{ background: stone.color }}
                            ></div>

                            {/* Floating animation wrapper */}
                            <div className="animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                                <img
                                    src={stone.img}
                                    alt={stone.name}
                                    className="w-full h-full object-contain filter drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span
                                className="font-bold text-white text-lg tracking-wider"
                                style={{ textShadow: stone.glow }}
                            >
                                {stone.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default EventsPage;
