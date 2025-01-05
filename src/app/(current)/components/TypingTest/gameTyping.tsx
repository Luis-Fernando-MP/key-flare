'use client'

import type { JSX } from 'react'

import useTypingTest from '../../hooks/useTypingTest'
import Letter from './Letter'
import Word from './Word'

const GameTyping = (): JSX.Element => {
  const { $paragraphRef, $inputRef, words, handleInputUp } = useTypingTest()

  return (
    <>
      <p className='typingTest-phrase' ref={$paragraphRef}>
        {words.map((word, index) => {
          const key = `${index}-letter`
          const letters = word.split('')
          return (
            <Word key={key}>
              {letters.map((letter, index) => {
                const key = `${letter}-${index}`
                return <Letter key={key}>{letter}</Letter>
              })}
            </Word>
          )
        })}
      </p>

      <input
        type='text'
        className='typingTest-input'
        autoComplete='off'
        id='typingTestInput'
        autoFocus
        onKeyUp={handleInputUp}
        ref={$inputRef}
      />
    </>
  )
}

export default GameTyping
