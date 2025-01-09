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
  DASH = '-',
  TILDE = '~'
}

type TGameRules = {
  gameDifficulty: EGameDifficulty
  setGameDifficulty: (gameDifficulty: EGameDifficulty) => void

  restartKey: ERestartKey
  setRestartKey: (restartKey: ERestartKey) => void

  modeOption: EModeOption
  setModeOption: (modeOption: EModeOption) => void

  freedomMode: EFreedomMode
  setFreedomMode: (freedomMode: EFreedomMode) => void

  endOnError: EEndOnError
  setEndOnError: (endOnError: EEndOnError) => void

  writingSound: EWritingSound
  setWritingSound: (writingSound: EWritingSound) => void

  writingVolume: number
  setWritingVolume: (writingVolume: number) => void

  counterStyle: ECounterStyle
  setCounterStyle: (counterStyle: ECounterStyle) => void

  fontSize: number
  setFontSize: (fontSize: number) => void

  webFont: EFont
  setWebFont: (webFont: EFont) => void

  cursorStyle: ECursorStyle
  setCursorStyle: (cursorStyle: ECursorStyle) => void
}

const useGameRulesStore = create<TGameRules>(set => ({
  gameDifficulty: EGameDifficulty.NORMAL,
  setGameDifficulty: gameDifficulty => set({ gameDifficulty }),

  restartKey: ERestartKey.ESC,
  setRestartKey: restartKey => set({ restartKey }),

  modeOption: EModeOption.AGILE,
  setModeOption: modeOption => set({ modeOption }),

  freedomMode: EFreedomMode.DISABLED,
  setFreedomMode: freedomMode => set({ freedomMode }),

  endOnError: EEndOnError.DISABLED,
  setEndOnError: endOnError => set({ endOnError }),

  writingSound: EWritingSound.BEEP,
  setWritingSound: writingSound => set({ writingSound }),

  writingVolume: 50,
  setWritingVolume: writingVolume => set({ writingVolume }),

  counterStyle: ECounterStyle.TEXT,
  setCounterStyle: counterStyle => set({ counterStyle }),

  fontSize: 50,
  setFontSize: fontSize => set({ fontSize }),

  webFont: EFont.ROBOTO_MONO,
  setWebFont: webFont => set({ webFont }),

  cursorStyle: ECursorStyle.LINE,
  setCursorStyle: cursorStyle => set({ cursorStyle })
}))

export default useGameRulesStore
