import { useEffect, useState } from "react";

export function createBrowserHistory() {
  return window.history;
}

export function useHashRoute(): string {
  const getRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    return hash || "home";
  };
  const [route, setRoute] = useState<string>(getRoute());

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.location.hash = path;
}
