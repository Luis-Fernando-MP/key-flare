import { create } from 'zustand'

export enum ETypePhrase {
  IDLE = 'idle',
  PHRASE = 'phrase',
  RANDOM = 'random',
  SEDUCTION = 'seduction'
}
type TPhraseStore = {
  phrase: string
  type: ETypePhrase
  setPhrase: (phrase: string) => void
  setTypePhrase: (type: ETypePhrase) => void
}

const usePhraseStore = create<TPhraseStore>(set => ({
  phrase:
    'La vida es aquello que te pasa mientras estás ocupado haciendo otros planes. - John Lennon',
  type: ETypePhrase.PHRASE,
  setPhrase: phrase => set({ phrase }),
  setTypePhrase: type => set({ type })
}))

export default usePhraseStore
