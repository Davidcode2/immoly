export function calcWidth() {
  const mobileScreen = window.innerWidth < 400;
  if (mobileScreen) {
    return window.innerWidth - 40;
  }
  const tabletScreen = window.innerWidth < 765;
  if (tabletScreen) {
    return window.innerWidth - 100;
  }
  const regularScreen = window.innerWidth < 1280;
  if (regularScreen) {
    return window.innerWidth - 400;
  }
  const bigScreen = window.innerWidth > 1280 && window.innerWidth < 2000;
  if (bigScreen) {
    return 400;
  }
  const veryBigScreen = window.innerWidth > 2000 && window.innerWidth < 3500;
  if (veryBigScreen) {
    return window.innerWidth / 4;
  }
  const ultraWide = window.innerWidth > 3500;
  if (ultraWide) {
    return window.innerWidth / 8;
  }
  return 400;
}
