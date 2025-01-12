import React from 'react'

import { TCounterTestComponent } from '../CounterTest'
import './style.scss'

const CounterTextSmall = ({ hours, minutes, seconds }: TCounterTestComponent) => {
  return (
    <h2 className='counterStyle-small'>
      {hours}:{minutes}:{seconds}
    </h2>
  )
}

export default CounterTextSmall
