'use client'

import type { JSX } from 'react'

import TimerTest from '../TimerTest'
import VirtualKeyboard from '../VirtualKeyboard'
import GameTyping from './gameTyping'
import './style.scss'

const TypingTest = (): JSX.Element => {
  return (
    <main className='appFlare-typing typingTest'>
      <TimerTest />
      <GameTyping />
      <VirtualKeyboard />
    </main>
  )
}

export default TypingTest
