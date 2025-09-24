import { create } from 'zustand'
import { DEFAULT_BUNDESLAND } from './constants';

interface StringState {
  value: string
  updateValue: (newValue: string) => void;
}

export const useBundeslandStore = create<StringState>((set) => ({
  value: DEFAULT_BUNDESLAND,
  updateValue: (newValue: string) => set({ value: newValue }),
}))

export const useMaklergebuehrPercentageStore = create<StringState>((set) => ({
  value: "3.57",
  updateValue: (newValue: string) => set({ value: newValue }),
}))

export const useGrundbuchkostenPercentageStore = create<StringState>((set) => ({
  value: "1.5",
  updateValue: (newValue: string) => set({ value: newValue }),
}))

export const useNotarkostenPercentageStore = create<StringState>((set) => ({
  value: "2",
  updateValue: (newValue: string) => set({ value: newValue }),
}))
