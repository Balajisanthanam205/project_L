import React from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
}

const PixelButton: React.FC<PixelButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-pixel text-sm uppercase transition-transform active:scale-95 focus:outline-none";

    const variants = {
        primary: "bg-retro-green text-black border-r-4 border-b-4 border-retro-dark hover:brightness-110",
        secondary: "bg-transparent text-retro-green border-2 border-retro-green hover:bg-retro-green/10",
        danger: "bg-retro-red text-white border-r-4 border-b-4 border-retro-dark hover:brightness-110",
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {/* Corner decorations for extra pixel feel */}
            <span className="absolute top-0 left-0 w-1 h-1 bg-current -translate-x-full -translate-y-full" />
            <span className="absolute bottom-0 right-0 w-1 h-1 bg-current translate-x-full translate-y-full" />
            {children}
        </button>
    );
};

export default PixelButton;
