import { getRandomWords } from '@/shared/getRandomWords'
import { validateTimeFormat } from '@/shared/time'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

import useGameStore, { EGameStatus } from '../store/useGameStore'
import useGameTimeStore from '../store/useGameTimeStore'
import usePhraseStore from '../store/usePhraseStore'
import useRenderTypingStore from '../store/useRenderTypingStore'

const formatTime = (value: number) => value.toString().padStart(2, '0')

const useTimerTest = () => {
  const { gameStatus, setGameStatus, resetGameStore } = useGameStore()
  const { setPhrase } = usePhraseStore()
  const { gameTime, setGameTime } = useGameTimeStore()
  const { setRenderKey } = useRenderTypingStore()

  const $inputRef = useRef<HTMLInputElement>(null)

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

  const setValidationTime = useCallback(() => {
    if (!$inputRef.current) return

    const selectedTime = validateTimeFormat($inputRef.current.value)
    if (!selectedTime) return toast.error('Introduce un tiempo valido')
    if (gameTime === selectedTime) return
    setGameTime(selectedTime)
    handleResetGame(String(selectedTime))
  }, [gameTime, setGameTime])

  const handleResetGame = useCallback(
    (renderKey: string) => {
      const $fieldGame = $inputRef.current
      if (!$fieldGame) return

      $fieldGame.blur()
      $fieldGame.value = ''
      resetGameStore()
      setRenderKey(renderKey)
      setPhrase(getRandomWords())
    },
    [resetGameStore, setRenderKey, setPhrase]
  )

  const handleValidationTime = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = validateTimeFormat(e.target.value)
    e.target.classList.toggle('time-error', !selectedTime)
  }

  const handleChangeTime = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      setValidationTime()
    }
  }

  const hours = formatTime(Math.floor(gameTime / 3600))
  const minutes = formatTime(Math.floor((gameTime % 3600) / 60))
  const seconds = formatTime(gameTime % 60)

  const handleClickDefaultTime = (tm: number) => {
    if (gameTime === tm) return
    setGameTime(tm)
    handleResetGame(String(tm))
  }

  return {
    hours,
    minutes,
    seconds,
    gameTime,
    $inputRef,
    handleClickDefaultTime,
    handleValidationTime,
    handleChangeTime,
    setValidationTime
  }
}

export default useTimerTest
