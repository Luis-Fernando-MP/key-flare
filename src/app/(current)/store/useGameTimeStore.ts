import { create } from 'zustand'

type GameContextType = {
  gameTime: number
  setGameTime: (gameTime?: number) => void
}

export const DEFAULT_TIME_GAME = 30

const useGameTimeStore = create<GameContextType>((set, get) => ({
  gameTime: DEFAULT_TIME_GAME,
  setGameTime: (gameTime = DEFAULT_TIME_GAME) => set({ gameTime })
}))

export default useGameTimeStore
