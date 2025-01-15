import useAppTheme from '@/app/store/useAppTheme'
import { AUDIOS, playAudio } from '@/shared/audio'
import { useRouter } from 'next/navigation'

import { ECounterStyle, EGameDifficulty, EModeOption } from '../store/useGameRulesStore'
import useGameRulesStore from '../store/useGameRulesStore'
import useGameStore, { EGameStatus } from '../store/useGameStore'
import useGameTimeStore from '../store/useGameTimeStore'
import usePhraseStore from '../store/usePhraseStore'

const useConfigurations = () => {
  const {
    counterStyle,
    cursorStyle,
    fontSize,
    freedomMode,
    gameDifficulty,
    modeOption,
    restartKey,
    writingSound,
    writingVolume,
    writeValidation,

    setCounterStyle,
    setCursorStyle,
    setFontSize,
    setFreedomMode,
    setGameDifficulty,
    setModeOption,
    setRestartKey,
    setWritingSound,
    setWritingVolume,
    setWriteValidation
  } = useGameRulesStore()

  const { resetGameStore, setGameStatus } = useGameStore()
  const { setGameTime, setStaticTime, resetGameTime } = useGameTimeStore()
  const { setPhrase } = usePhraseStore()
  const { resetGameRules } = useGameRulesStore()
  const { resetTheme } = useAppTheme()
  const { replace } = useRouter()

  const handleGameDifficulty = (value: EGameDifficulty) => {
    playAudio(AUDIOS.TOUCH)
    setGameStatus(EGameStatus.IDLE)
    resetGameStore()
    setPhrase()
    if (value === EGameDifficulty.NORMAL) {
      setGameTime()
      setStaticTime()
    }
    if (value === EGameDifficulty.DIFFICULT) {
      setGameTime(20)
      setStaticTime(20)
    }
    if (value === EGameDifficulty.MASTER) {
      setGameTime(10)
      setStaticTime(10)
    }
    setGameDifficulty(value)
  }

  const handleRestartKey = (value: any) => {
    playAudio(AUDIOS.TOUCH)
    setRestartKey(value)
  }

  const handleModeOption = (value: EModeOption) => {
    playAudio(AUDIOS.TOUCH)
    setModeOption(value)
    if (value === EModeOption.BLIND) {
      setCounterStyle(ECounterStyle.TEXT)
    }

    if (value === EModeOption.FOCUSED) {
      setCounterStyle(ECounterStyle.MINIATURE)
    }
  }

  const handleFreedomMode = (value: any) => {
    playAudio(AUDIOS.TOUCH)
    setFreedomMode(value)
  }

  const handleWriteValidation = (value: boolean) => {
    playAudio(AUDIOS.TOUCH)
    setWriteValidation(value)
  }

  const handleWritingSound = (value: any) => {
    playAudio(AUDIOS.TOUCH)
    setWritingSound(value)
  }

  const handleWritingVolume = (value: any) => {
    setWritingVolume(value)
  }

  const handleCounterStyle = (value: any) => {
    playAudio(AUDIOS.TOUCH)
    setCounterStyle(value)
  }

  const handleFontSize = (value: any) => {
    playAudio(AUDIOS.TOUCH)
    setFontSize(value)
  }

  const handleCursorStyle = (value: any) => {
    playAudio(AUDIOS.TOUCH)
    setCursorStyle(value)
  }

  const handleGameReset = (): void => {
    playAudio(AUDIOS.RESET)
    resetGameStore()
    resetGameTime()
    resetGameRules()
    resetTheme()
    replace('/#behavior')
  }

  return {
    gameDifficulty,
    restartKey,
    modeOption,
    freedomMode,
    writingSound,
    writingVolume,
    counterStyle,
    fontSize,
    cursorStyle,
    writeValidation,

    handleGameDifficulty,
    handleRestartKey,
    handleModeOption,
    handleFreedomMode,
    handleWritingSound,
    handleWritingVolume,
    handleCounterStyle,
    handleFontSize,
    handleCursorStyle,
    handleWriteValidation,
    handleGameReset
  }
}

export default useConfigurations
