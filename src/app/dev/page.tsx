'use client'

import type { JSX } from 'react'

import GameTime from './components/GameTime'
import ResultsGame from './components/ResultsGame'
import TypingTest from './components/TypingTest'
import VirtualKeyboard from './components/VirtualKeyboard'
import './style.scss'

const Page = (): JSX.Element => {
  return (
    <section className='game'>
      <GameTime />
      <TypingTest />
      <ResultsGame />
      <VirtualKeyboard />
    </section>
  )
}

export default Page
