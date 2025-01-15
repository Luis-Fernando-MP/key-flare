import { DEFAULT_TOTAL_LETTERS } from '@/app/(current)/store/usePhraseStore'

import { phrases, randomWords, seductionPhrases } from './randomWords'

export function getRandomWords(length: number = DEFAULT_TOTAL_LETTERS): string {
  const shuffledWords = [...randomWords]
  const words: string[] = []
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledWords.length)
    words.push(shuffledWords[randomIndex])
    shuffledWords.splice(randomIndex, 1)
  }
  const newPhrase = words.join(' ')
  const firstLetter = newPhrase.slice(0, 1).toUpperCase()
  return firstLetter + newPhrase.slice(1, newPhrase.length)
}

export function getPhrase(length: number = DEFAULT_TOTAL_LETTERS): string {
  return generateWords(phrases, length)
}

export function getSeductionPhrase(length: number = DEFAULT_TOTAL_LETTERS): string {
  return generateWords(seductionPhrases, length)
}

function generateWords(phrases: string[], length: number) {
  const index = Math.floor(Math.random() * phrases.length)
  const phrase = phrases[index]
  const words = phrase.split(' ')
  if (words.length < length) words.push('...')
  let i = 0
  while (words.length < length - 1) {
    words.push(words[i])
    i++
  }
  if (words.length < length) words.push('...')
  const selectedWords = words.slice(0, length)
  return selectedWords.join(' ')
}
