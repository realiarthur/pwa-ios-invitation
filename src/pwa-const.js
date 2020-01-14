export const isIos =
  (/iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  !window.MSStream;

export let iosDevice = isIos
  ? /iPad|iPhone|iPod/.exec(window.navigator.userAgent)
  : null;
if (iosDevice) iosDevice = iosDevice[0];
else if (isIos && navigator.platform === "MacIntel") iosDevice = "iPad";

export const isPwa = !!(
  window.navigator.standalone ||
  (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)
);

// Detect if Safari
export const isSafari =
  /Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
