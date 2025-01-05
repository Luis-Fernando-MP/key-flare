import { create } from 'zustand'

export enum EGameStatus {
  PLAYING = 'playing',
  FINISHED = 'finished',
  TIMEOUT = 'timeout',
  IDLE = 'idle'
}

type GameContextType = {
  gameStatus: EGameStatus
  totalLetters: number
  totalCorrect: number
  totalErrors: number
  setGameStatus: (gameStatus: EGameStatus) => void
  setTotalLetters: (letters: number) => void
  setTotalCorrect: (correct: number) => void
  setTotalErrors: (errors: number) => void
  resetGameStore: () => void
}

const useGameStore = create<GameContextType>(set => ({
  gameStatus: EGameStatus.IDLE,
  totalLetters: 0,
  totalCorrect: 0,
  totalErrors: 0,
  setGameStatus: gameStatus => set({ gameStatus }),
  setTotalLetters: totalLetters => set({ totalLetters }),
  setTotalCorrect: totalCorrect => set({ totalCorrect }),
  setTotalErrors: totalErrors => set({ totalErrors }),
  resetGameStore: () => {
    set({
      gameStatus: EGameStatus.IDLE,
      totalLetters: 0,
      totalCorrect: 0,
      totalErrors: 0
    })
  }
}))

export default useGameStore
