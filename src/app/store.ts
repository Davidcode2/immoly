import { create } from 'zustand'

export const useStore = create((set) => ({
  nebenkosten: 0,
  updateNebenkosten: (newNebenkosten: number) => set({ nebenkosten: newNebenkosten }),
}))

