'use client'

import dynamic from 'next/dynamic'
import { type JSX, memo } from 'react'

import ConfigurationsList from './ConfigurationsList'
import './style.scss'
import './userMobile.scss'

const NavConfigurations = dynamic(() => import('../NavConfigurations'), {
  ssr: false
})

interface IConfigurations {
  className: string
}

const Configurations = ({ className }: IConfigurations): JSX.Element => {
  return (
    <section className={`${className} appConf active`} id='menu'>
      <NavConfigurations />
      <ConfigurationsList />
    </section>
  )
}

export default memo(Configurations)
