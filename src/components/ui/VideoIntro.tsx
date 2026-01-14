"use client"

import { useGameStore } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'
import PixelButton from '../PixelButton'
import { useEffect, useRef, useState } from 'react'

export default function VideoIntro() {
    const setShowIntro = useGameStore((state) => state.setShowIntro)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    // Attempt to play video on mount
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                setIsPlaying(true)
            }).catch((err) => {
                console.log("Autoplay failed, waiting for user interaction:", err)
            })
        }
    }, [])

    const handleSkip = () => {
        setShowIntro(false)
    }

    const handleEnded = () => {
        setShowIntro(false)
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/intro-video.mp4"
                muted
                playsInline
                onEnded={handleEnded}
            />

            {/* Skip Button */}
            <div className="absolute bottom-8 right-8 z-20">
                <PixelButton onClick={handleSkip} variant="secondary">
                    SKIP INTRO
                </PixelButton>
            </div>

            {/* Unmute/Play hint if needed (optional, keeping clean for now) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 cursor-pointer" onClick={() => {
                    videoRef.current?.play()
                    setIsPlaying(true)
                }}>
                    <PixelButton variant="primary">
                        START MISSION
                    </PixelButton>
                </div>
            )}
        </motion.div>
    )
}
