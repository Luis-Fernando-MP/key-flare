import type { JSX } from 'react'

import useGameStore from '../../store/useGameStore'

const Phrase = (): JSX.Element => {
  const { phrase, input, errorWords } = useGameStore()

  const words = phrase.split(' ')
  const inputWords = input.trim().split(' ')

  return (
    <div className='rounded-lg bg-gray-800 p-6 font-mono leading-relaxed shadow-xl'>
      {words.map((word, index) => {
        const isError = errorWords[index] || false
        const inputWord = inputWords[index] || ''
        const borderColor = isError ? 'border-b-2 border-red-500' : 'border-b-2 border-transparent'

        return (
          <word key={index} className={`mr-2 inline-block ${borderColor}`}>
            {word.split('').map((char, charIndex) => {
              const inputChar = inputWord[charIndex] || ''
              const color =
                inputChar === char ? 'text-white' : inputChar ? 'text-red-500' : 'text-gray-500'

              return (
                <letter key={`${index}-${charIndex}`} className={`${color}`}>
                  {char}
                </letter>
              )
            })}
          </word>
        )
      })}
    </div>
  )
}

export default Phrase
