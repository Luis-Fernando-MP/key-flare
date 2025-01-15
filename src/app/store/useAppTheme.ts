import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppTheme = {
  selectedTheme: string
  setSelectedTheme: (theme: string) => void
  resetTheme: () => void
}

const DEFAULT_THEME = 'Aurora Day'

const useAppTheme = create(
  persist<AppTheme>(
    set => ({
      selectedTheme: DEFAULT_THEME,
      setSelectedTheme: theme => set({ selectedTheme: theme }),
      resetTheme: () => set({ selectedTheme: DEFAULT_THEME })
    }),
    { name: 'appTheme' }
  )
)

export default useAppTheme
