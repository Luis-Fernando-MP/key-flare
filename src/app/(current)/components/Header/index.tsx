import Logo from '@/shared/assets/Logo'
import Link from 'next/link'
import { type JSX, memo } from 'react'

import './style.scss'

interface IHeader {
  className: string
}

const Header = ({ className }: IHeader): JSX.Element => {
  return (
    <Link href='/' className={`${className}`}>
      <Logo />
      <h1>KeyFlare</h1>
    </Link>
  )
}

export default memo(Header)
