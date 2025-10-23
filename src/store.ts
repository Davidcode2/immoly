import { create } from "zustand";
import { DEFAULT_BUNDESLAND } from "./constants";

interface StringState {
  value: string;
  updateValue: (newValue: string) => void;
}

interface BooleanState {
  value: boolean;
  updateValue: (newValue: boolean) => void;
}

export const useBundeslandStore = create<StringState>((set) => ({
  value: DEFAULT_BUNDESLAND,
  updateValue: (newValue: string) => set({ value: newValue }),
}));

export const useMaklergebuehrPercentageStore = create<StringState>((set) => ({
  value: "3.57",
  updateValue: (newValue: string) => set({ value: newValue }),
}));

export const useGrundbuchkostenPercentageStore = create<StringState>((set) => ({
  value: "1.5",
  updateValue: (newValue: string) => set({ value: newValue }),
}));

export const useNotarkostenPercentageStore = create<StringState>((set) => ({
  value: "2",
  updateValue: (newValue: string) => set({ value: newValue }),
}));

export const useMobileFormOpenStore = create<BooleanState>((set) => ({
  value: false,
  updateValue: (newValue: boolean) => set({ value: newValue }),
}));

export const useNebenkostenActiveStore = create<BooleanState>((set) => ({
  value: true,
  updateValue: (newValue: boolean) => set({ value: newValue }),
}));

export const useParentViewportHeightStore = create<StringState>((set) => ({
  value: "0",
  updateValue: (newValue: string) => set({ value: newValue }),
}));

export const useParentScrollYStore = create<StringState>((set) => ({
  value: "0",
  updateValue: (newValue: string) => set({ value: newValue }),
}));

export const useParentScrollHeight = create<StringState>((set) => ({
  value: "0",
  updateValue: (newValue: string) => set({ value: newValue }),
}));

export const useIsEmbedRoute = create<BooleanState>((set) => ({
  value: false,
  updateValue: (newValue: boolean) => set({ value: newValue }),
}));
