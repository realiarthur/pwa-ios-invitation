export const isIos =
  (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;

export let iosDeviceFromUserAgent = /iPad|iPhone|iPod/.exec(
  window.navigator.userAgent
);
export const iosDevice = isIos
  ? iosDeviceFromUserAgent
    ? iosDeviceFromUserAgent[0]
    : navigator.platform === "MacIntel"
    ? "iPad"
    : null
  : null;

export const isPwa = !!(
  window.navigator.standalone ||
  (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)
);

// Detect if Safari
export const isSafari =
  /Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
