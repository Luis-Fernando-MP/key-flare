import { FigmaIcon, GithubIcon, MailIcon, MessageCircleCodeIcon } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

interface IFooter {
  className: string
}
const Footer = ({ className }: IFooter): JSX.Element => {
  return (
    <section className={`${className} appFoo`}>
      <div className='appFoo-info'>
        <h2>Key Flare</h2>
        <div className='appFoo-info__paragraph'>
          <p>
            Pare del repertorio de apps de <Link href=''>JULES</Link>,
          </p>
          <p>
            desarrollado por <Link href=''>Luis MP.</Link> como proyecto de práctica.
          </p>
          <p>
            Referencia e inspiración tomada de <Link href=''>MonkeyType</Link>,
          </p>
          <p>
            desarrollado por <i>Mitch Paone</i> y <i>Meg Donohoe</i>.
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
      <div className='appFoo-buyMe'></div>
    </section>
  )
}

export default Footer
