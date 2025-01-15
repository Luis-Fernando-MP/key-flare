'use client'

import { AUDIOS, playAudio } from '@/shared/audio'
import { themes } from '@/shared/themes'
import { useEffect } from 'react'

import useAppTheme from '../store/useAppTheme'

const useHookAppTheme = () => {
  const { selectedTheme, setSelectedTheme } = useAppTheme()

  useEffect(() => {
    const root = document.documentElement
    Object.entries(themes[selectedTheme]).forEach(([key, color]) => {
      root.style.setProperty(`--${key}`, `${color}`)
    })
  }, [selectedTheme])

  const handleSetTheme = (theme: string): void => {
    if (theme === selectedTheme) {
      return playAudio(AUDIOS.ERROR)
    }
    playAudio(AUDIOS.CHANGE)
    setSelectedTheme(theme)
  }

  return { selectedTheme, handleSetTheme, themes, theme: themes[selectedTheme] }
}

export default useHookAppTheme
