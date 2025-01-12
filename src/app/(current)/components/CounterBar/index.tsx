import React from 'react'

import { TCounterTestComponent } from '../CounterTest'
import './style.scss'

const CounterBar = ({ hours, minutes, seconds, staticTime }: TCounterTestComponent) => {
  const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
  const progress = (totalSeconds * 100) / staticTime

  return (
    <div className='counterStyle-bar'>
      <div className='counterStyle-bar__progress' style={{ width: `${progress}%` }}></div>
      <span className='counterBar-label'>
        {hours}:{minutes}:{seconds}
      </span>
    </div>
  )
}

export default CounterBar
