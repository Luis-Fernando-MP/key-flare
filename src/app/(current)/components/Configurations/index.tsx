import type { JSX } from 'react'

import NavConfigurations from '../NavConfigurations'
import ConfigurationsList from './ConfigurationsList'
import './style.scss'

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
