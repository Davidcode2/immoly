import { create } from 'zustand'

interface NebenkostenState {
  nebenkosten: number
  updateNebenkosten: (newValue: number) => void;
}

export const useStore = create<NebenkostenState>((set) => ({
  nebenkosten: 0,
  updateNebenkosten: (newNebenkosten: number) => set({ nebenkosten: newNebenkosten }),
}))

