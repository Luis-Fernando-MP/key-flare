import dynamic from 'next/dynamic'
import type { JSX } from 'react'

import ConfigurationsList from './ConfigurationsList'
import './style.scss'

const NavConfigurations = dynamic(() => import('../NavConfigurations'), {
  ssr: false
})

interface IConfigurations {
  className: string
}
const Configurations = ({ className }: IConfigurations): JSX.Element => {
  return (
    <section className={`${className} appConf`}>
      <NavConfigurations />
      <ConfigurationsList />
    </section>
  )
}

export default Configurations
