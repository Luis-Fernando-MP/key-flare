import { AUDIOS, playAudio } from '@/shared/audio'
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
  const { setPhrase } = usePhraseStore()

  const $inputRef = useRef<HTMLInputElement>(null)

  const handleResetGame = useCallback(
    (renderKey: string) => {
      const $fieldGame = $inputRef.current
      if (!$fieldGame) return

      $fieldGame.blur()
      $fieldGame.value = ''
      resetGameStore()
      setRenderKey(renderKey)

      setPhrase()
      playAudio(AUDIOS.TOUCH)
    },
    [resetGameStore, setRenderKey, setPhrase]
  )

  const setValidationTime = useCallback(() => {
    if (!$inputRef.current) return

    const selectedTime = validateTimeFormat($inputRef.current.value)
    if (!selectedTime) {
      playAudio(AUDIOS.ERROR)
      return toast.error('Tiempo invalido. máximo 2h:59m:59s')
    }
    if (gameTime === selectedTime) return
    setGameTime(selectedTime)
    setStaticTime(selectedTime)
    handleResetGame(String(selectedTime))
  }, [gameTime, setGameTime, setStaticTime, handleResetGame])

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
