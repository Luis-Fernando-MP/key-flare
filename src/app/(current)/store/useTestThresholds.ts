import toast from 'react-hot-toast'
import { create } from 'zustand'

type GameContextType = {
  minSpeed: number
  minPrecision: number
  setMinSpeed: (minSpeed?: number) => void
  setMinPrecision: (minPrecision?: number) => void
}

const useTestThresholds = create<GameContextType>((set, get) => ({
  minSpeed: 100,
  minPrecision: 100,
  setMinSpeed: (minSpeed = 100) => {
    if (minSpeed < 80) return toast.error('La velocidad minima es de 80')
    set({ minSpeed })
  },
  setMinPrecision: (minPrecision = 100) => {
    if (minPrecision < 80) return toast.error('La precisión minima es de 80')
    set({ minPrecision })
  }
}))

export default useTestThresholds
