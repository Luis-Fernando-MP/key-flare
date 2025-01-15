import { create } from 'zustand'

type GameContextType = {
  gameTime: number
  staticTime: number
  setGameTime: (gameTime?: number) => void
  setStaticTime: (staticTime?: number) => void
  resetGameTime: () => void
}

export const DEFAULT_TIME_GAME = 30

const useGameTimeStore = create<GameContextType>(set => ({
  gameTime: DEFAULT_TIME_GAME,
  staticTime: DEFAULT_TIME_GAME,
  setGameTime: (gameTime = DEFAULT_TIME_GAME) => set({ gameTime }),
  setStaticTime: (staticTime = DEFAULT_TIME_GAME) => set({ staticTime }),
  resetGameTime: () => {
    set({
      gameTime: DEFAULT_TIME_GAME,
      staticTime: DEFAULT_TIME_GAME
    })
  }
}))

export default useGameTimeStore
