import {
  ECounterStyle,
  ECursorStyle,
  EEndOnError,
  EFont,
  EFreedomMode,
  EGameDifficulty,
  EModeOption,
  ERestartKey,
  EWritingSound
} from '../store/useGameRulesStore'
import useGameRulesStore from '../store/useGameRulesStore'
import useGameStore, { EGameStatus } from '../store/useGameStore'
import useGameTimeStore from '../store/useGameTimeStore'
import usePhraseStore, { ETypePhrase } from '../store/usePhraseStore'

const useConfigurations = () => {
  const {
    gameDifficulty,
    setGameDifficulty,
    restartKey,
    setRestartKey,
    modeOption,
    setModeOption,
    freedomMode,
    setFreedomMode,
    endOnError,
    setEndOnError,
    writingSound,
    setWritingSound,
    writingVolume,
    setWritingVolume,
    counterStyle,
    setCounterStyle,
    fontSize,
    setFontSize,
    webFont,
    setWebFont,
    cursorStyle,
    setCursorStyle
  } = useGameRulesStore()

  const { resetGameStore, setGameStatus } = useGameStore()
  const { setGameTime } = useGameTimeStore()
  const { type, setPhrase, setTotalLetters } = usePhraseStore()

  const handleGameDifficulty = (value: EGameDifficulty) => {
    setGameStatus(EGameStatus.IDLE)
    resetGameStore()
    setPhrase()

    // random
    if (value === EGameDifficulty.NORMAL) {
      setGameTime()
    }
    if (value === EGameDifficulty.DIFFICULT) {
      setGameTime(20)
    }
    if (value === EGameDifficulty.MASTER) {
      setGameTime(10)
    }
    setGameDifficulty(value)
  }

  const handleRestartKey = (value: any) => {
    setRestartKey(value)
  }

  const handleModeOption = (value: any) => {
    setModeOption(value)
  }

  const handleFreedomMode = (value: any) => {
    setFreedomMode(value)
  }

  const handleEndOnError = (value: any) => {
    setEndOnError(value)
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

  const handleWebFont = (value: any) => {
    setWebFont(value)
  }

  const handleCursorStyle = (value: any) => {
    setCursorStyle(value)
  }

  return {
    gameDifficulty,
    restartKey,
    modeOption,
    freedomMode,
    endOnError,
    writingSound,
    writingVolume,
    counterStyle,
    fontSize,
    webFont,
    cursorStyle,
    handleGameDifficulty,
    handleRestartKey,
    handleModeOption,
    handleFreedomMode,
    handleEndOnError,
    handleWritingSound,
    handleWritingVolume,
    handleCounterStyle,
    handleFontSize,
    handleWebFont,
    handleCursorStyle
  }
}

export default useConfigurations
