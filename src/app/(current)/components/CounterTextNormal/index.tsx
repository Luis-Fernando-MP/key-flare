import React from 'react'

import { TCounterTestComponent } from '../CounterTest'
import './style.scss'

const CounterTextNormal = ({ hours, minutes, seconds }: TCounterTestComponent) => {
  return (
    <h2 className='counterStyle-text'>
      {hours}:{minutes}:{seconds}
    </h2>
  )
}

export default CounterTextNormal
