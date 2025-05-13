import { create } from 'zustand'

interface SettingsState {
  textScale: number
  isLightMode: boolean
  setTextScale: (scale: number) => void
  toggleLightMode: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  textScale: 1,
  isLightMode: true,
  setTextScale: (scale) => set({ textScale: scale }),
  toggleLightMode: () =>
    set((state) => ({ isLightMode: !state.isLightMode })),
}))
