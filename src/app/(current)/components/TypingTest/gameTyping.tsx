'use client'

import { acl } from '@/shared/acl'
import { type JSX } from 'react'

import useTypingTest from '../../hooks/useTypingTest'
import useGameRulesStore, { EModeOption } from '../../store/useGameRulesStore'
import useRenderTypingStore from '../../store/useRenderTypingStore'
import Letter from './Letter'
import Word from './Word'

const GameTypingComponent = (): JSX.Element => {
  const { $paragraphRef, $inputRef, words, handleInputUp } = useTypingTest()
  const { modeOption, fontSize, cursorStyle } = useGameRulesStore()

  return (
    <>
      <p
        className={`typingTest-phrase ${cursorStyle} ${acl(modeOption === EModeOption.BLIND, 'blind')} ${acl(modeOption === EModeOption.FOCUSED, 'focus')}`}
        style={{ fontSize: `${fontSize / 10}rem` }}
        ref={$paragraphRef}
      >
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
