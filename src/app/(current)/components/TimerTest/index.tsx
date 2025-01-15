'use client'

import { acl } from '@/shared/acl'
import { TimerIcon } from 'lucide-react'
import { type JSX } from 'react'

import useTimerTest from '../../hooks/useTimerTest'
import useGameStore, { EGameStatus } from '../../store/useGameStore'
import { DEFAULT_TIME_GAME } from '../../store/useGameTimeStore'
import CounterTest from '../CounterTest'
import './style.scss'
import './userMobile.scss'

const defaultTimes = [10, 20, DEFAULT_TIME_GAME, 60, 90, 120]

const TimerTestComponent = (): JSX.Element | null => {
  const {
    hours,
    minutes,
    seconds,
    gameTime,
    $inputRef,
    handleClickDefaultTime,
    handleValidationTime,
    handleChangeTime,
    setValidationTime
  } = useTimerTest()

  return (
    <article className='timerApp'>
      <div className='timerApp-wrapper'>
        <section className='timerApp-configuration'>
          <TimerIcon />
          <p>Tiempo:</p>
          <h5>
            {hours}:{minutes}:{seconds}
          </h5>
        </section>

        <section className='timerApp-defaultTimes'>
          {defaultTimes.map(tm => (
            <button
              key={tm}
              className={acl(gameTime === tm)}
              onClick={() => handleClickDefaultTime(tm)}
            >
              {tm}s
            </button>
          ))}
        </section>
        <div className='timerApp-setTime'>
          <input
            ref={$inputRef}
            type='text'
            placeholder={`${DEFAULT_TIME_GAME}s`}
            onChange={handleValidationTime}
            onKeyDown={handleChangeTime}
          />
          <button className='timerApp-setTime__action' onClick={setValidationTime}>
            <span>Enter</span>
          </button>
        </div>
      </div>
      <p>
        Puedes establecer tu tiempo utilizando este formato <span>1h:5m:30s</span>
      </p>
    </article>
  )
}

const TimerTest = (): JSX.Element => {
  const gameStatus = useGameStore(s => s.gameStatus)
  if (gameStatus === EGameStatus.PLAYING) return <CounterTest />
  return <TimerTestComponent />
}

export default TimerTest
