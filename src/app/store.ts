import { create } from 'zustand'
import { DEFAULT_BUNDESLAND } from './constants';

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
  value: DEFAULT_BUNDESLAND,
  updateValue: (newValue: string) => set({ value: newValue }),
}))

export const useMaklergebuehrStore = create<NumberState>((set) => ({
  value: 0,
  updateValue: (newValue: number) => set({ value: newValue }),
}))

