import { formatTimeFromSeconds } from '@/shared/time'
import { type JSX, useEffect } from 'react'

import useGameStore, { EGameStatus } from '../../store/useGameStore'
import useGameTimeStore from '../../store/useGameTimeStore'
import './style.scss'

const CounterTest = (): JSX.Element => {
  const { gameTime, setGameTime } = useGameTimeStore()
  const { gameStatus, setGameStatus } = useGameStore()

  const { hours, minutes, seconds } = formatTimeFromSeconds(gameTime)

  useEffect(() => {
    if (gameStatus !== EGameStatus.PLAYING) return
    const intervalId = setInterval(() => {
      if (gameTime === 0) {
        clearInterval(intervalId)
        setGameStatus(EGameStatus.TIMEOUT)
        return
      }
      const newTime = gameTime - 1
      if (newTime >= 0) return setGameTime(newTime)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [gameStatus, gameTime, setGameTime, setGameStatus])

  return (
    <section className='counterTest'>
      <h2 className='counterTest-time'>
        {hours}:{minutes}:{seconds}
      </h2>
    </section>
  )
}

export default CounterTest
