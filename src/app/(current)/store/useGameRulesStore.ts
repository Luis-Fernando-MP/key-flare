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

export enum EWritingSound {
  CLICK = 'click',
  OSH = 'osh',
  PENTATONIC = 'pentatonic',
  POP = 'pop',
  SAWTOOTH = 'sawtooth',
  SINE = 'sine',
  SQUARE = 'square'
}

export enum ECounterStyle {
  TEXT = 'Texto',
  BAR = 'Barra',
  CLOCK = 'Reloj',
  MINIATURE = 'Miniatura'
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
  writingSound: string
  writingVolume: number
  counterStyle: ECounterStyle
  fontSize: number
  cursorStyle: string
  writeValidation: boolean

  setGameDifficulty: (gameDifficulty: EGameDifficulty) => void
  setRestartKey: (restartKey: ERestartKey) => void
  setModeOption: (modeOption: EModeOption) => void
  setFreedomMode: (freedomMode: EFreedomMode) => void
  setWritingSound: (writingSound: string) => void
  setWritingVolume: (writingVolume: number) => void
  setCounterStyle: (counterStyle: ECounterStyle) => void
  setFontSize: (fontSize: number) => void
  setCursorStyle: (cursorStyle: string) => void
  setWriteValidation: (writeValidation: boolean) => void
  resetGameRules: () => void
}

const useGameRulesStore = create<TGameRules>(set => ({
  gameDifficulty: EGameDifficulty.NORMAL,
  restartKey: ERestartKey.ESC,
  modeOption: EModeOption.AGILE,
  freedomMode: EFreedomMode.DISABLED,
  writingSound: 'CLICK',
  writingVolume: 0,
  counterStyle: ECounterStyle.TEXT,
  fontSize: 20,
  cursorStyle: 'LINE',
  writeValidation: false,

  setGameDifficulty: gameDifficulty => set({ gameDifficulty }),
  setRestartKey: restartKey => set({ restartKey }),
  setModeOption: modeOption => set({ modeOption }),
  setFreedomMode: freedomMode => set({ freedomMode }),
  setWritingSound: writingSound => set({ writingSound }),
  setWritingVolume: writingVolume => set({ writingVolume }),
  setCounterStyle: counterStyle => set({ counterStyle }),
  setFontSize: fontSize => set({ fontSize }),
  setCursorStyle: cursorStyle => set({ cursorStyle }),
  setWriteValidation: writeValidation => set({ writeValidation }),
  resetGameRules: () => {
    set({
      gameDifficulty: EGameDifficulty.NORMAL,
      restartKey: ERestartKey.ESC,
      modeOption: EModeOption.AGILE,
      freedomMode: EFreedomMode.DISABLED,
      writingSound: 'CLICK',
      writingVolume: 0,
      counterStyle: ECounterStyle.TEXT,
      fontSize: 20,
      cursorStyle: 'LINE',
      writeValidation: false
    })
  }
}))

export default useGameRulesStore
