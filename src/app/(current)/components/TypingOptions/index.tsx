'use client'

import { acl } from '@/shared/acl'
import { AUDIOS, playAudio } from '@/shared/audio'
import { BeerIcon, MenuIcon, QuoteIcon, RegexIcon } from 'lucide-react'
import { type JSX, memo } from 'react'

import useMenu from '../../hooks/useMenu'
import usePhraseStore, { ETypePhrase } from '../../store/usePhraseStore'
import './style.scss'
import './userMobile.scss'

interface ITypingOptions {
  className: string
}

const typePhrases = {
  Frases: {
    name: ETypePhrase.PHRASE,
    Icon: QuoteIcon
  },
  Random: {
    name: ETypePhrase.RANDOM,
    Icon: RegexIcon
  },
  Abridores: {
    name: ETypePhrase.SEDUCTION,
    Icon: BeerIcon
  }
}

const TypingOptions = ({ className }: ITypingOptions): JSX.Element => {
  const { type, setTypePhrase, setPhrase } = usePhraseStore()
  const { toggleMenu } = useMenu()

  return (
    <section className={`${className}`}>
      <div className={`typingOptions`}>
        {Object.entries(typePhrases).map(entry => {
          const [key, value] = entry
          return (
            <button
              key={value.name}
              className={`typingOptions-action ${acl(type === value.name)}`}
              onClick={() => {
                playAudio(AUDIOS.TOUCH)
                setPhrase({ phraseTYpe: value.name })
                setTypePhrase(value.name)
              }}
            >
              <value.Icon />
              <span>{key}</span>
            </button>
          )
        })}
        <button className='typingOptions-menu' onClick={toggleMenu}>
          <MenuIcon />
        </button>
      </div>
    </section>
  )
}

export default memo(TypingOptions)
