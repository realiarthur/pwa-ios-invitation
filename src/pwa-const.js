export const isIos = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

export const iosDevice = isIos
  ? /iPad|iPhone|iPod/.exec(window.navigator.userAgent)[0]
  : null;

export const isPwa = !!(
  window.navigator.standalone ||
  (window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches)
);

// Detect if Safari
export const isSafari =
  /Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
