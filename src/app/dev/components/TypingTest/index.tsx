import type { JSX } from 'react'

import useTypingTest from '../../hooks/useTypingTest'
import useGameStore, { EGameStatus } from '../../store/useGameStore'
import './App.css'

const Word = ({ children }: { children: React.ReactNode }) => (
  <span className='word'>{children}</span>
)
const Letter = ({ children }: { children: React.ReactNode }) => (
  <span className='letter'>{children}</span>
)

const TypingTestComponent = (): JSX.Element => {
  const { $paragraphRef, $inputRef, gameStatus, words, handleInputUp } = useTypingTest()
  return (
    <article>
      <h2>{gameStatus}</h2>
      <p className='game-phrase' ref={$paragraphRef}>
        {words.map((word, index) => {
          const key = `${index}-letter`
          const letters = word.split('')
          return (
            <Word key={key}>
              {letters.map((letter, index) => {
                const key = `${letter}-${index}`
                return <Letter key={key}>{letter}</Letter>
              })}
              &nbsp;
            </Word>
          )
        })}
      </p>

      <input type='text' autoComplete='off' autoFocus onKeyUp={handleInputUp} ref={$inputRef} />
    </article>
  )
}

const TypingTest = (): JSX.Element => {
  const { gameStatus } = useGameStore()

  return <>{gameStatus !== EGameStatus.FINISHED && <TypingTestComponent />}</>
}

export default TypingTest
