import { create } from 'zustand'

type GameContextType = {
  renderKey: string
  setRenderKey: (renderKey: string) => void
}

const useRenderTypingStore = create<GameContextType>(set => ({
  renderKey: 'renderTypingStore',
  setRenderKey: renderKey => set({ renderKey })
}))

export default useRenderTypingStore
