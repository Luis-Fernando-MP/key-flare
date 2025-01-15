'use client'

import { acl } from '@/shared/acl'
import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/Header'
import { useRouter } from 'next/navigation'
import { type JSX, useEffect, useRef } from 'react'

import Configurations from './components/Configurations'
import TypingOptions from './components/TypingOptions'
import TypingTest from './components/TypingTest'
import useGameStore, { EGameStatus } from './store/useGameStore'
import './style.scss'
import './userMobile.scss'

const Page = (): JSX.Element => {
  const $appFlare = useRef<HTMLElement>(null)
  const { prefetch } = useRouter()
  const { gameStatus } = useGameStore()

  useEffect(() => {
    prefetch('/results')
  }, [prefetch])

  return (
    <section
      ref={$appFlare}
      className={`appFlare ${acl(gameStatus === EGameStatus.PLAYING, 'playing')} animate-blurred-fade-in animate-delay-250`}
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
