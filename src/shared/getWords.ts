import { phrases, randomWords, seductionPhrases } from './randomWords'

export function getRandomWords(): string {
  const shuffledWords = [...randomWords]
  const words: string[] = []
  for (let i = 1; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledWords.length)
    words.push(shuffledWords[randomIndex])
    shuffledWords.splice(randomIndex, 1)
  }
  const newPhrase = words.join(' ')
  const firstLetter = newPhrase.slice(0, 1).toUpperCase()
  return firstLetter + newPhrase.slice(1, newPhrase.length)
}

export function getPhrase(): string {
  const index = Math.floor(Math.random() * phrases.length)
  return phrases[index]
}

export function getSeductionPhrase(): string {
  const index = Math.floor(Math.random() * seductionPhrases.length)
  return seductionPhrases[index]
}
