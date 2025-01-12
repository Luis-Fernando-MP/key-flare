import React from 'react'
import { type JSX } from 'react'

import useCounterTest from '../../hooks/useCounterTest'
import { ECounterStyle } from '../../store/useGameRulesStore'
import CounterBar from '../CounterBar'
import CounterClock from '../CounterClock'
import CounterTextNormal from '../CounterTextNormal'
import CounterTextSmall from '../CounterTextSmall'
import './style.scss'

export interface TCounterTestComponent {
  hours: string
  minutes: string
  seconds: string
  staticTime: number
}

const counterComponents = {
  [ECounterStyle.TEXT]: CounterTextNormal,
  [ECounterStyle.MINIATURE]: CounterTextSmall,
  [ECounterStyle.BAR]: CounterBar,
  [ECounterStyle.CLOCK]: CounterClock
}

const CounterTest = (): JSX.Element | null => {
  const { hours, minutes, seconds, counterStyle, staticTime } = useCounterTest()

  const RenderCounter = counterComponents[counterStyle]

  return (
    <section className='counterTest'>
      <RenderCounter hours={hours} minutes={minutes} seconds={seconds} staticTime={staticTime} />
    </section>
  )
}

export default CounterTest
