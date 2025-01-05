'use client'

import type { JSX } from 'react'

import TimerTest from '../TimerTest'
import GameTyping from './gameTyping'
import './style.scss'

const TypingTest = (): JSX.Element => {
  return (
    <main className='appFlare-typing typingTest'>
      <TimerTest />
      <GameTyping />
    </main>
  )
}

export default TypingTest
