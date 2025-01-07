import { getPhrase, getRandomWords, getSeductionPhrase } from '@/shared/getWords'
import { useCallback } from 'react'

import { ETypePhrase } from '../store/usePhraseStore'

const usePhraseGenerator = () => {
  const changePhrase = useCallback((type: string) => {
    let newPhrase = getPhrase()
    if (type === ETypePhrase.SEDUCTION) newPhrase = getSeductionPhrase()
    if (type === ETypePhrase.RANDOM) newPhrase = getRandomWords()
    return newPhrase
  }, [])

  return {
    changePhrase
  }
}

export default usePhraseGenerator
