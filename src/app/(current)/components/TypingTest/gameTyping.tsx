'use client'

import { type JSX } from 'react'

import useTypingTest from '../../hooks/useTypingTest'
import useRenderTypingStore from '../../store/useRenderTypingStore'
import Letter from './Letter'
import Word from './Word'

const GameTypingComponent = (): JSX.Element => {
  const { $paragraphRef, $inputRef, words, handleInputUp } = useTypingTest()

  return (
    <>
      <p className='typingTest-phrase' ref={$paragraphRef}>
        {words.map((word, index) => {
          const key = `${index}-${word}`
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

const GameTyping = (): JSX.Element => {
  const renderKey = useRenderTypingStore(s => s.renderKey)
  return <GameTypingComponent key={renderKey} />
}

export default GameTyping
