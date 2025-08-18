import { create } from 'zustand'

interface NumberState {
  value: number
  updateValue: (newValue: number) => void;
}

interface StringState {
  value: string
  updateValue: (newValue: string) => void;
}

export const useNebenkostenStore = create<NumberState>((set) => ({
  value: 0,
  updateValue: (newValue: number) => set({ value: newValue }),
}))

export const useBundeslandStore = create<StringState>((set) => ({
  value: "",
  updateValue: (newValue: string) => set({ value: newValue }),
}))

export const useMaklergebuehrStore = create<NumberState>((set) => ({
  value: 0,
  updateValue: (newValue: number) => set({ value: newValue }),
}))

