import { create } from 'zustand'

export enum EGameStatus {
  PLAYING = 'playing',
  FINISHED = 'finished',
  TIMEOUT = 'timeout',
  IDLE = 'idle'
}

type GameContextType = {
  phrase: string
  gameStatus: EGameStatus
  totalLetters: number
  totalCorrect: number
  totalErrors: number
  setPhrase: (phrase: string) => void
  setGameStatus: (gameStatus: EGameStatus) => void
  setTotalLetters: (letters: number) => void
  setTotalCorrect: (correct: number) => void
  setTotalErrors: (errors: number) => void
}

const useGameStore = create<GameContextType>(set => ({
  phrase:
    'La vida es aquello que te pasa mientras estás ocupado haciendo otros planes. - John Lennon',
  gameStatus: EGameStatus.FINISHED,
  totalLetters: 55,
  totalCorrect: 40,
  totalErrors: 10,

  setPhrase: phrase => set({ phrase }),
  setGameStatus: gameStatus => set({ gameStatus }),
  setTotalLetters: totalLetters => set({ totalLetters }),
  setTotalCorrect: totalCorrect => set({ totalCorrect }),
  setTotalErrors: totalErrors => set({ totalErrors })
}))

export default useGameStore
