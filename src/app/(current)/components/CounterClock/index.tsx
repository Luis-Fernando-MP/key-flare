import React from 'react'

import { TCounterTestComponent } from '../CounterTest'
import './style.scss'

const CounterClock = ({ hours, minutes, seconds, staticTime }: TCounterTestComponent) => {
  const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
  const timeElapsed = staticTime - totalSeconds
  const secondsRotation = (timeElapsed / staticTime) * 360

  return (
    <section className='counterStyle-clock'>
      <div className='counterStyle-clock__face'>
        <div
          className='counterStyle-clock__second'
          style={{ transform: `rotate(${secondsRotation}deg) translate(-50%, -50%)` }}
        ></div>

        <div className='counterStyle-clock__circle'></div>

        <div className='counterStyle-clock__numbers'>
          {[0, 3, 2, 1].map(i => {
            const num = Math.ceil((staticTime / 4) * i)
            return (
              <span key={`${i}-clock-number`} className='counterStyle-clock__segment'>
                {num}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CounterClock
