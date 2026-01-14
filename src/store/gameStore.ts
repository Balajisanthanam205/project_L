import { create } from 'zustand'

type Phase = 'orbit' | 'landing' | 'landed' | 'exploring'

interface GameState {
    phase: Phase
    setPhase: (phase: Phase) => void
    cameraPosition: [number, number, number]
    setCameraPosition: (pos: [number, number, number]) => void
    showIntro: boolean
    setShowIntro: (show: boolean) => void
}

export const useGameStore = create<GameState>((set) => ({
    phase: 'orbit',
    setPhase: (phase) => set({ phase }),
    cameraPosition: [0, 20, 50], // Initial orbit position
    setCameraPosition: (pos) => set({ cameraPosition: pos }),
    showIntro: true,
    setShowIntro: (show) => set({ showIntro: show }),
}))
