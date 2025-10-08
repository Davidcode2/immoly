export function calcWidth() {
  const mobileScreen = window.innerWidth < 400;
  if (mobileScreen) {
    return window.innerWidth - 40;
  }
  const tabletScreen = window.innerWidth < 765;
  if (tabletScreen) {
    return window.innerWidth - 150;
  }
  const laptopScreen = window.innerWidth < 1024;
  if (laptopScreen) {
    return window.innerWidth - 400;
  }
  const regularScreen = window.innerWidth >= 1024 && window.innerWidth < 1535;
  if (regularScreen) {
    return window.innerWidth - 600;
  }
  const bigScreen = window.innerWidth >= 1535 && window.innerWidth < 2000;
  if (bigScreen) {
    return 400;
  }
  const veryBigScreen = window.innerWidth >= 2000 && window.innerWidth < 3500;
  if (veryBigScreen) {
    return window.innerWidth / 4;
  }
  const ultraWide = window.innerWidth >= 3500;
  if (ultraWide) {
    return window.innerWidth / 8;
  }
  return 400;
}

export const screenWidthMobile = () => {
  return window.innerWidth < 640;
};
