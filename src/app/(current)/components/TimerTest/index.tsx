'use client'

import { acl } from '@/shared/acl'
import { validateTimeFormat } from '@/shared/time'
import { TimerIcon } from 'lucide-react'
import { ChangeEvent, type JSX, KeyboardEvent, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

import useGameStore, { EGameStatus } from '../../store/useGameStore'
import useGameTimeStore, { DEFAULT_TIME_GAME } from '../../store/useGameTimeStore'
import './style.scss'

const defaultTimes = [15, DEFAULT_TIME_GAME, 60, 90, 120]
const formatTime = (value: number) => value.toString().padStart(2, '0')
const TimerTest = (): JSX.Element => {
  const { gameStatus, setGameStatus } = useGameStore()
  const { gameTime, setGameTime } = useGameTimeStore()
  const $inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (gameStatus !== EGameStatus.PLAYING) return
    const intervalId = setInterval(() => {
      const newTime = gameTime - 1
      if (newTime >= 0) return setGameTime(newTime)
      clearInterval(intervalId)
      setGameStatus(EGameStatus.TIMEOUT)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [gameStatus, gameTime])

  const setValidationTime = () => {
    if (!$inputRef.current) return
    const selectedTime = validateTimeFormat($inputRef.current.value)
    if (!selectedTime) return toast.error('Introduce un tiempo valido')
    if (gameTime === selectedTime) return
    setGameTime(selectedTime)
    $inputRef.current.blur()
  }

  const handleValidationTime = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = validateTimeFormat(e.target.value)
    e.target.classList.toggle('time-error', !selectedTime)
  }

  const handleChangeTime = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !(e.target instanceof HTMLInputElement)) return
    setValidationTime()
  }

  const hours = formatTime(Math.floor(gameTime / 3600))
  const minutes = formatTime(Math.floor((gameTime % 3600) / 60))
  const seconds = formatTime(gameTime % 60)

  const handleClickDefaultTime = (tm: number): void => {
    if (gameTime === tm) return
    setGameTime(tm)
  }

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

export default TimerTest
