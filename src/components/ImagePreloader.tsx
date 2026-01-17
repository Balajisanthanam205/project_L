
import { useEffect } from 'react';

const frames = import.meta.glob('/src/assets/frames3/*.webp', { eager: true, as: 'url' });
const frameUrls = Object.values(frames);

const ImagePreloader = () => {
    useEffect(() => {
        const preloadImage = (src: string) => {
            const img = new Image();
            img.src = src;
        };

        frameUrls.forEach((url) => {
            preloadImage(url);
        });

        console.log(`Started preloading ${frameUrls.length} frames.`);
    }, []);

    return null; // This component doesn't render anything
};

export default ImagePreloader;
