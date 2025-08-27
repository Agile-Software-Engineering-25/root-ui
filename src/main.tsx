// pkg
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerApplication, start, getAppNames } from "single-spa";
import apps from "./apps";
import App from "./components/App";

apps.forEach((app) => {
  registerApplication({
    name: app.name,
    activeWhen: app.basename,
    customProps: {
      basename: app.basename,
    },
    app: () => import(/* @vite-ignore */ app.name),
  });
});

if (process.env.NODE_ENV === "development") {
  console.log("APPLICATIONS", getAppNames());
  // enable the single spa import map override panel in dev mode
  localStorage.setItem("imo-ui", "true");
} else {
  // disable the single spa import map override panel for built environments (can still be accessed using the browser extension)
  localStorage.setItem("imo-ui", "false");
}
start();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
