import { useEffect } from "react";

export const useBeforeInstallPrompt = (callback, dependencies = []) => {
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", callback);
    return () => {
      window.removeEventListener("beforeinstallprompt", callback);
    };
  }, dependencies);
};

export const useWindowResize = (callback, dependencies = []) => {
  useEffect(() => {
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, dependencies);
};
