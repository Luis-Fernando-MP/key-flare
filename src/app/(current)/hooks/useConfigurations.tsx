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
  const { setGameTime, setStaticTime } = useGameTimeStore()
  const { type, setPhrase, setTotalLetters } = usePhraseStore()

  const handleGameDifficulty = (value: EGameDifficulty) => {
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
    setRestartKey(value)
  }

  const handleModeOption = (value: EModeOption) => {
    setModeOption(value)
    if (value === EModeOption.BLIND) {
      setCounterStyle(ECounterStyle.TEXT)
    }

    if (value === EModeOption.FOCUSED) {
      setCounterStyle(ECounterStyle.MINIATURE)
    }
  }

  const handleFreedomMode = (value: any) => {
    setFreedomMode(value)
  }

  const handleWriteValidation = (value: boolean) => {
    setWriteValidation(value)
  }

  const handleWritingSound = (value: any) => {
    setWritingSound(value)
  }

  const handleWritingVolume = (value: any) => {
    setWritingVolume(value)
  }

  const handleCounterStyle = (value: any) => {
    setCounterStyle(value)
  }

  const handleFontSize = (value: any) => {
    setFontSize(value)
  }

  const handleCursorStyle = (value: any) => {
    setCursorStyle(value)
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
    handleWriteValidation
  }
}

export default useConfigurations
