'use client'

import { acl } from '@/shared/acl'
import { useRouter } from 'next/navigation'
import { type JSX, useRef } from 'react'

import Configurations from './components/Configurations'
import Footer from './components/Footer'
import Header from './components/Header'
import TypingOptions from './components/TypingOptions'
import TypingTest from './components/TypingTest'
import useGameStore, { EGameStatus } from './store/useGameStore'
import './style.scss'

const Page = (): JSX.Element => {
  const $appFlare = useRef<HTMLElement>(null)
  const { push } = useRouter()
  const { gameStatus, setGameStatus } = useGameStore()

  if (gameStatus === EGameStatus.FINISHED) {
    push('/results')
    setGameStatus(EGameStatus.IDLE)
  }

  return (
    <section
      ref={$appFlare}
      className={`appFlare ${acl(gameStatus === EGameStatus.PLAYING, 'playing')}`}
    >
      <Header className='appFlare-logo' />
      <TypingOptions className='appFlare-typingOptions invisibleBlock' />
      <Configurations className='appFlare-configurations invisibleBlock' />
      <TypingTest />
      <Footer className='appFlare-footer invisibleBlock' />
    </section>
  )
}

export default Page
