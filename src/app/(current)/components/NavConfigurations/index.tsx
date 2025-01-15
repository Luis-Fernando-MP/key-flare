'use client'

import { acl } from '@/shared/acl'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { JSX } from 'react'

import useMenu from '../../hooks/useMenu'
import { routesNavConfigurations } from './routes'

const defaultHash = window?.location.hash.substring(1) || Object.keys(routesNavConfigurations)[0]

const NavConfigurations = (): JSX.Element => {
  const [activeHash, setActiveHash] = useState(defaultHash)
  const { closeMenu } = useMenu()

  return (
    <nav className='appConf-nav'>
      <button className='appConf-nav__close' onClick={closeMenu}>
        <XIcon />
      </button>
      {Object.entries(routesNavConfigurations).map(([path, value]) => (
        <Link
          key={path}
          href={`#${path}`}
          className={`appConf-nav__link ${acl(activeHash === path)}`}
          onClick={() => setActiveHash(path)}
        >
          {value}
        </Link>
      ))}
    </nav>
  )
}

export default NavConfigurations
