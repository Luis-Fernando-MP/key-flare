import { formatTimeFromSeconds, validateTimeFormat } from '@/shared/time'
import { ChangeEvent, KeyboardEvent, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'

import useGameStore from '../store/useGameStore'
import useGameTimeStore from '../store/useGameTimeStore'
import usePhraseStore from '../store/usePhraseStore'
import useRenderTypingStore from '../store/useRenderTypingStore'

const useTimerTest = () => {
  const { resetGameStore } = useGameStore()
  const { gameTime, setGameTime, setStaticTime } = useGameTimeStore()
  const { setRenderKey } = useRenderTypingStore()
  const { type, setPhrase } = usePhraseStore()

  const $inputRef = useRef<HTMLInputElement>(null)

  const setValidationTime = useCallback(() => {
    if (!$inputRef.current) return

    const selectedTime = validateTimeFormat($inputRef.current.value)
    if (!selectedTime) return toast.error('Introduce un tiempo valido')
    if (gameTime === selectedTime) return
    setGameTime(selectedTime)
    setStaticTime(selectedTime)
    handleResetGame(String(selectedTime))
  }, [gameTime, setGameTime, setStaticTime])

  const handleResetGame = useCallback(
    (renderKey: string) => {
      const $fieldGame = $inputRef.current
      if (!$fieldGame) return

      $fieldGame.blur()
      $fieldGame.value = ''
      resetGameStore()
      setRenderKey(renderKey)

      setPhrase()
      // type en
    },
    [resetGameStore, setRenderKey, type]
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

  const handleClickDefaultTime = (tm: number) => {
    if (gameTime === tm) return
    setGameTime(tm)
    setStaticTime(tm)
    handleResetGame(String(tm))
  }

  return {
    ...formatTimeFromSeconds(gameTime),
    gameTime,
    $inputRef,
    handleClickDefaultTime,
    handleValidationTime,
    handleChangeTime,
    setValidationTime
  }
}

export default useTimerTest
