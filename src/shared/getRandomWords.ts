import { words } from './words'

export function getRandomWords(): string {
  const shuffledWords = [...words]
  const randomWords: string[] = []
  for (let i = 1; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledWords.length)
    randomWords.push(shuffledWords[randomIndex])
    shuffledWords.splice(randomIndex, 1)
  }
  const newPhrase = randomWords.join(' ')
  const firstLetter = newPhrase.slice(0, 1).toUpperCase()
  return firstLetter + newPhrase.slice(1, newPhrase.length)
}
