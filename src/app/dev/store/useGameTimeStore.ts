import { create } from 'zustand'

type GameContextType = {
  gameTime: number
  setGameTime: (gameTime: number) => void
}

const useGameTimeStore = create<GameContextType>(set => ({
  gameTime: 30,
  setGameTime: gameTime => set({ gameTime })
}))

export default useGameTimeStore
