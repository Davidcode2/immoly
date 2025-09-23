export type CompleteNebenkostenModel = {
  name: string;
  percentage: number;
  value: number;
  setPercentage: (value: string) => void;
  setAbsolute: (value: number) => void;
}

export type RelativeNebenkostenModel = {
  name: string;
  percentage: number;
}

export type AbsoluteNebenkostenModel = {
  name: string;
  value: number;
}
