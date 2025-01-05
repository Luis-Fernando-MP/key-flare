'use client'

import { acl } from '@/shared/acl'
import Link from 'next/link'
import { useState } from 'react'
import type { JSX } from 'react'

import { routesNavConfigurations } from './routes'

const defaultHash = window?.location.hash.substring(1) || Object.keys(routesNavConfigurations)[0]

const NavConfigurations = (): JSX.Element => {
  const [activeHash, setActiveHash] = useState(defaultHash)

  return (
    <nav className='appConf-nav'>
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
