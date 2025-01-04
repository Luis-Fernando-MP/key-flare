import { BeerIcon, EarthIcon, HashIcon, KeyboardIcon, QuoteIcon } from 'lucide-react'
import type { JSX } from 'react'

import './style.scss'

interface ITypingOptions {
  className: string
}

const TypingOptions = ({ className }: ITypingOptions): JSX.Element => {
  return (
    <section className={`${className}`}>
      <div className='typingOptions'>
        <button className='typingOptions-action'>
          <QuoteIcon />
          Frases
        </button>
        <button className='typingOptions-action'>
          <BeerIcon />
          Abridores
        </button>
        <button className='typingOptions-action'>
          <EarthIcon />
          Español
        </button>
        <button className='typingOptions-action'>
          <KeyboardIcon />
          Palabras
        </button>
        <button className='typingOptions-action'>
          <HashIcon />
          Con Números
        </button>
      </div>
    </section>
  )
}

export default TypingOptions
