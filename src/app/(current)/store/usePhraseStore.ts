import { getPhrase, getRandomWords, getSeductionPhrase } from '@/shared/getWords'
import { create } from 'zustand'

export const DEFAULT_TOTAL_LETTERS = 29

export enum ETypePhrase {
  PHRASE = 'phrase',
  RANDOM = 'random',
  SEDUCTION = 'seduction'
}
type TPhraseStore = {
  phrase: string
  totalLetters: number
  type: ETypePhrase
  setPhrase: (vl?: {
    phrase?: string | null
    phraseTYpe?: ETypePhrase
    totalLetters?: number
  }) => void
  setTypePhrase: (type: ETypePhrase) => void
  setTotalLetters: (totalLetters?: number) => void
}

const usePhraseStore = create<TPhraseStore>((set, get) => ({
  phrase:
    'El amor no busca poseer, sino liberar. En tu abrazo, encuentro la paradoja de ser completamente mío y, al mismo tiempo, completamente tuyo. ... El amor no busca ...',
  type: ETypePhrase.PHRASE,
  totalLetters: DEFAULT_TOTAL_LETTERS,
  setPhrase: props => {
    if (props?.phrase) set({ phrase: props.phrase })
    const { type, totalLetters } = get()
    const evaluateType = props?.phraseTYpe ?? type
    const evaluateTotalLetters = props?.totalLetters ?? totalLetters
    let newPhrase = ''
    if (evaluateType === ETypePhrase.PHRASE) newPhrase = getPhrase(evaluateTotalLetters)
    if (evaluateType === ETypePhrase.SEDUCTION) newPhrase = getSeductionPhrase(evaluateTotalLetters)
    if (evaluateType === ETypePhrase.RANDOM) newPhrase = getRandomWords(evaluateTotalLetters)
    set({ phrase: newPhrase })
  },
  setTypePhrase: type => set({ type }),
  setTotalLetters: (totalLetters = DEFAULT_TOTAL_LETTERS) => set({ totalLetters })
}))

export default usePhraseStore
