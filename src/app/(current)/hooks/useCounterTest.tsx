import { formatTimeFromSeconds } from '@/shared/time'
import { useEffect } from 'react'

import useGameRulesStore from '../store/useGameRulesStore'
import useGameStore, { EGameStatus } from '../store/useGameStore'
import useGameTimeStore from '../store/useGameTimeStore'

const useCounterTest = () => {
  const { gameTime, setGameTime, staticTime } = useGameTimeStore()
  const { gameStatus, setGameStatus } = useGameStore()

  const { counterStyle } = useGameRulesStore()

  const time = formatTimeFromSeconds(gameTime)

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

  return { ...time, counterStyle, staticTime }
}

export default useCounterTest
