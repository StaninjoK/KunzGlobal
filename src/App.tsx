import { useEffect } from "react";
import { createBrowserHistory, useHashRoute } from "./lib/router";
import { Landing } from "./pages/Landing";
import { Agrotech } from "./pages/Agrotech";
import { Fleisch } from "./pages/Fleisch";
import { Impressum } from "./pages/Impressum";
import { Datenschutz } from "./pages/Datenschutz";
import { AGB } from "./pages/AGB";

function App() {
  const route = useHashRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route]);

  if (route === "agrotech") return <Agrotech />;
  if (route === "fleisch") return <Fleisch />;
  if (route === "impressum") return <Impressum />;
  if (route === "datenschutz") return <Datenschutz />;
  if (route === "agb") return <AGB />;
  return <Landing />;
}

export { createBrowserHistory };
export default App;
