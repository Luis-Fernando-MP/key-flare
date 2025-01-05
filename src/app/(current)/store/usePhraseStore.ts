import { create } from 'zustand'

type TPhraseStore = {
  phrase: string
  setPhrase: (phrase: string) => void
}

const usePhraseStore = create<TPhraseStore>(set => ({
  phrase:
    'La vida es aquello que te pasa mientras estás ocupado haciendo otros planes. - John Lennon',
  setPhrase: phrase => set({ phrase })
}))

export default usePhraseStore
