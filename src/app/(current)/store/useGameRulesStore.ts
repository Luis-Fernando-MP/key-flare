import { create } from 'zustand'

export enum EGameDifficulty {
  NORMAL = 'Normal',
  DIFFICULT = 'Experto',
  MASTER = 'Maestro'
}

export enum ERestartKey {
  ESC = 'Escape',
  ENTER = 'Enter',
  SHIFT = 'Shift'
}

export enum EModeOption {
  AGILE = 'Modo ágil',
  BLIND = 'Modo ciego',
  FOCUSED = 'Modo enfocado'
}

export enum EFreedomMode {
  ENABLED = 'Activado',
  DISABLED = 'Desactivado'
}

export enum EEndOnError {
  DISABLED = 'Desactivado',
  LETTER = 'Letra',
  WORD = 'Palabra'
}

export enum EWritingSound {
  BEEP = 'beep',
  PENTATONIC = 'pentatonic',
  POP = 'pop',
  SINE = 'sine',
  OSH = 'osh',
  SQUARE = 'square',
  NK_CREAMS = 'nk creams',
  CLICK = 'click',
  SAWTOOTH = 'sawtooth'
}

export enum ECounterStyle {
  TEXT = 'Texto',
  BAR = 'Barra',
  CLOCK = 'Reloj',
  MINIATURE = 'Miniatura'
}

export enum EFont {
  ROBOTO_MONO = 'Roboto Mono',
  ATKINSON = 'Atkinson',
  HYPERLEGIBLE = 'Hyperlegible',
  FIRA_CODE = 'Fira Code'
}

export enum ECursorStyle {
  LINE = '|',
  DOT = '•',
  DASH = '-'
}

type TGameRules = {
  gameDifficulty: EGameDifficulty
  restartKey: ERestartKey
  modeOption: EModeOption
  freedomMode: EFreedomMode
  endOnError: EEndOnError
  writingSound: EWritingSound
  writingVolume: number
  counterStyle: ECounterStyle
  fontSize: number
  webFont: EFont
  cursorStyle: ECursorStyle
  writeValidation: boolean

  setGameDifficulty: (gameDifficulty: EGameDifficulty) => void
  setRestartKey: (restartKey: ERestartKey) => void
  setModeOption: (modeOption: EModeOption) => void
  setFreedomMode: (freedomMode: EFreedomMode) => void
  setEndOnError: (endOnError: EEndOnError) => void
  setWritingSound: (writingSound: EWritingSound) => void
  setWritingVolume: (writingVolume: number) => void
  setCounterStyle: (counterStyle: ECounterStyle) => void
  setFontSize: (fontSize: number) => void
  setWebFont: (webFont: EFont) => void
  setCursorStyle: (cursorStyle: ECursorStyle) => void
  setWriteValidation: (writeValidation: boolean) => void
}

const useGameRulesStore = create<TGameRules>(set => ({
  gameDifficulty: EGameDifficulty.NORMAL,
  restartKey: ERestartKey.ESC,
  modeOption: EModeOption.AGILE,
  freedomMode: EFreedomMode.DISABLED,
  endOnError: EEndOnError.DISABLED,
  writingSound: EWritingSound.BEEP,
  writingVolume: 50,
  counterStyle: ECounterStyle.TEXT,
  fontSize: 20,
  cursorStyle: ECursorStyle.LINE,
  writeValidation: false,

  webFont: EFont.ROBOTO_MONO,
  setGameDifficulty: gameDifficulty => set({ gameDifficulty }),
  setRestartKey: restartKey => set({ restartKey }),
  setModeOption: modeOption => set({ modeOption }),
  setFreedomMode: freedomMode => set({ freedomMode }),
  setEndOnError: endOnError => set({ endOnError }),
  setWritingSound: writingSound => set({ writingSound }),
  setWritingVolume: writingVolume => set({ writingVolume }),
  setCounterStyle: counterStyle => set({ counterStyle }),
  setFontSize: fontSize => set({ fontSize }),
  setWebFont: webFont => set({ webFont }),
  setCursorStyle: cursorStyle => set({ cursorStyle }),
  setWriteValidation: writeValidation => set({ writeValidation })
}))

export default useGameRulesStore
