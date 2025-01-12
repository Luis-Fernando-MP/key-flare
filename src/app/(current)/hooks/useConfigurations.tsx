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
    counterStyle,
    cursorStyle,
    endOnError,
    fontSize,
    freedomMode,
    gameDifficulty,
    modeOption,
    restartKey,
    webFont,
    writingSound,
    writingVolume,
    writeValidation,

    setCounterStyle,
    setCursorStyle,
    setEndOnError,
    setFontSize,
    setFreedomMode,
    setGameDifficulty,
    setModeOption,
    setRestartKey,
    setWebFont,
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

  const handleWebFont = (value: EFont) => {
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
    writeValidation,

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
    handleCursorStyle,
    handleWriteValidation
  }
}

export default useConfigurations
