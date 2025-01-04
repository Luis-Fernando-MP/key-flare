'use client'

import { acl } from '@/shared/acl'
import { type JSX, useRef, useState } from 'react'

import Configurations from './components/Configurations'
import Footer from './components/Footer'
import Header from './components/Header'
import TypingOptions from './components/TypingOptions'
import './style.scss'

const Page = (): JSX.Element => {
  const $appFlare = useRef<HTMLElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleClick = (): void => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section ref={$appFlare} className={`appFlare ${acl(isPlaying, 'playing')}`}>
      <Header className='appFlare-logo' />
      <TypingOptions className='appFlare-typingOptions invisibleBlock' />
      <Configurations className='appFlare-configurations invisibleBlock' />

      <main className='appFlare-typing'>
        <button onClick={handleClick}>{isPlaying ? 'show' : 'hide'}</button>
      </main>
      <Footer className='appFlare-footer invisibleBlock' />
    </section>
  )
}

export default Page
