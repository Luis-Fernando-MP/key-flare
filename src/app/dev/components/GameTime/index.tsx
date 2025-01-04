import React, { useEffect } from 'react'

import useGameStore, { EGameStatus } from '../../store/useGameStore'
import useGameTimeStore from '../../store/useGameTimeStore'

const GameTime = () => {
  const { gameStatus, setGameStatus } = useGameStore()
  const { gameTime, setGameTime } = useGameTimeStore()

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

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = Number(e.target.value)
    if (isNaN(selectedTime)) return
    setGameTime(selectedTime)
  }

  const minutes = Math.floor(gameTime / 60)
  const seconds = gameTime % 60

  return (
    <div className='flex items-center space-x-4'>
      <div className='font-mono text-2xl'>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <select onChange={handleDurationChange} defaultValue=''>
        <option value='' disabled>
          Select duration
        </option>
        <option value='60'>1 minuto</option>
        <option value='120'>2 minutos</option>
        <option value='300'>5 minutos</option>
      </select>
    </div>
  )
}

export default GameTime
