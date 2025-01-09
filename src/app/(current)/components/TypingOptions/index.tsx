'use client'

import { acl } from '@/shared/acl'
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
                setPhrase({ phraseTYpe: value.name })
                // value.name
                setTypePhrase(value.name)
              }}
            >
              <value.Icon />
              {key}
            </button>
          )
        })}

        <button className={`typingOptions-action`}>
          <EarthIcon />
          Español
        </button>
        <button className={`typingOptions-action`}>
          <KeyboardIcon />
          Palabras
        </button>
        <button className={`typingOptions-action`}>
          <HashIcon />
          Con Números
        </button>
        <div className='typingOptions-modal'>modal</div>
      </div>
    </section>
  )
}

export default memo(TypingOptions)
