import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/Header'
import type { JSX } from 'react'

import Chart from './components/Chart'
import './style.scss'
import './userMobile.scss'

const Results = (): JSX.Element => {
  return (
    <main className='results animate-blurred-fade-in animate-delay-250'>
      <Header className='results-header' />
      <Chart className='results-chart' />
      <Footer className='results-footer' />
    </main>
  )
}

export default Results
