'use client'

import { acl } from '@/shared/acl'
import { AUDIOS, playAudio } from '@/shared/audio'
import { BeerIcon, EarthIcon, HashIcon, KeyboardIcon, QuoteIcon, RegexIcon } from 'lucide-react'
import { type JSX, memo } from 'react'

import usePhraseStore, { ETypePhrase } from '../../store/usePhraseStore'
import './style.scss'

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
              {key}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default memo(TypingOptions)
