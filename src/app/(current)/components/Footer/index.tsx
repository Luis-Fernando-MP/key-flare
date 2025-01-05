import Jules from '@/shared/assets/Jules'
import Logo from '@/shared/assets/Logo'
import Midudev from '@/shared/assets/Midudev'
import MonkeyType from '@/shared/assets/MonkeyType'
import { FigmaIcon, GithubIcon, MailIcon, MessageCircleCodeIcon } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

import './style.scss'

interface IFooter {
  className: string
}

const Footer = ({ className }: IFooter): JSX.Element => {
  return (
    <section className={`${className} appFoo`}>
      <div className='appFoo-wrapper'>
        <div className='appFoo-info'>
          <h5>Key Flare</h5>
          <div className='appFoo-info__paragraph'>
            <p>
              Pare del repertorio de apps de <Link href=''>JULES,</Link>
            </p>
            <p>
              desarrollado por <Link href=''>Luis MP.</Link> como proyecto de práctica.
            </p>
            <p>
              Referencia e inspiración tomada de <Link href=''>MonkeyType,</Link>
            </p>
            <p>
              desarrollado por <span>Mitch Paone</span> y <span>Meg Donohoe</span>.
            </p>
            <p>
              Gracias adicionales a <Link href=''>Midudev</Link>
            </p>
          </div>
          <p>© JULES. Con mucho cariño para la comunidad dev.</p>
        </div>
        <aside className='appFoo-social'>
          <Link href=''>
            <MailIcon />
            Contactare
          </Link>
          <Link href=''>
            <GithubIcon />
            Github
          </Link>
          <Link href=''>
            <FigmaIcon />
            Figma
          </Link>
          <Link href=''>
            <MessageCircleCodeIcon />
            WhatsApp
          </Link>
        </aside>
        <div className='appFoo-buyMe'>
          <div className='appFoo-buyMe__social'>
            <Link href=''>
              <Jules />
            </Link>
            <Link href=''>
              <Logo />
            </Link>
            <Link href=''>
              <Midudev />
            </Link>
            <Link href=''>
              <MonkeyType />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
