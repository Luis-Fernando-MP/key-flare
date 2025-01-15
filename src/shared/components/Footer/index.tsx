import Jules from '@/shared/assets/Jules'
import Logo from '@/shared/assets/Logo'
import Midudev from '@/shared/assets/Midudev'
import MonkeyType from '@/shared/assets/MonkeyType'
import { FigmaIcon, GithubIcon, MailIcon, MessageCircleCodeIcon } from 'lucide-react'
import Link from 'next/link'
import { type JSX, memo } from 'react'

import { LINKS } from './links'
import './style.scss'

interface IFooter {
  className: string
}

const Footer = ({ className }: IFooter): JSX.Element => {
  return (
    <section className={`${className} appFoo`} lang='es'>
      <div className='appFoo-wrapper'>
        <div className='appFoo-info'>
          <h5>Key Flare</h5>
          <div className='appFoo-info__paragraph'>
            <p>
              Parte del repertorio de aplicaciones de <Link href={LINKS.JUL_APPS}>JUL_DEV</Link>.
            </p>
            <p>
              Este proyecto fue desarrollado por <Link href={LINKS.JUL_DEV}>Luis MP</Link> como
            </p>
            <p>parte de aprendizaje y práctica profesional.</p>
            <p>
              Inspirado en la aplicación de{' '}
              <Link href={LINKS.MONKEY} target='_blank' rel='noopener noreferrer'>
                MonkeyType,
              </Link>
            </p>
            <p>
              herramienta creada por <span>Mitch Paone</span> y <span>Meg Donohoe</span>.
            </p>
            <p>
              Agradecimientos especiales a{' '}
              <Link href={LINKS.MIDUDEV} target='_blank' rel='noopener noreferrer'>
                Midudev
              </Link>{' '}
              por su
            </p>
            <p>contenido educativo que sirvió de guía e inspiración.</p>
          </div>
          <footer itemScope itemType='http://schema.org/WPFooter'>
            <p itemProp='copyrightHolder'>
              © {new Date().getFullYear()} JUL. Con cariño para la comunidad dev
            </p>
          </footer>
        </div>
        <aside className='appFoo-social'>
          <ul className='appFoo-social__list'>
            <li>
              <Link href={LINKS.JUL_MAIL} aria-label='Enviar correo'>
                <MailIcon /> Contacto
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.APP_GITHUB}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visita nuestro GitHub'
              >
                <GithubIcon /> GitHub
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.APP_FIGMA}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Explora Figma'
              >
                <FigmaIcon /> Figma
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.JUL_WHATS_APP}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Hablemos por WhatsApp'
              >
                <MessageCircleCodeIcon /> WhatsApp
              </Link>
            </li>
          </ul>
        </aside>
        <div className='appFoo-buyMe'>
          <ul className='appFoo-buyMe__links'>
            <li>
              <Link
                className='appFoo-buyMe__link'
                href={LINKS.JUL_DEV}
                aria-label='Ver más sobre JUL_dev'
              >
                <Jules />
              </Link>
            </li>
            <li>
              <Link className='appFoo-buyMe__link' href='/' aria-label='Regresar al inicio'>
                <Logo />
              </Link>
            </li>
            <li>
              <Link
                className='appFoo-buyMe__link'
                href={LINKS.MIDUDEV}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visitar Midudev'
              >
                <Midudev />
              </Link>
            </li>
            <li>
              <Link
                className='appFoo-buyMe__link'
                href={LINKS.MONKEY}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Explorar MonkeyType'
              >
                <MonkeyType />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default memo(Footer)
