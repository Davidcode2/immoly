import calcTilgung from "app/lib/calculateArmotizaztionTable";

self.onmessage = (e) => {
  const { input, nebenkosten } = e.data;
  const result = calcTilgung(input, nebenkosten);
  postMessage(result);
};

