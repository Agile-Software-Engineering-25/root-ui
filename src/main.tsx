// pkg
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { start } from "single-spa";
import App from "./components/App";

import { WebStorageStateStore } from "oidc-client-ts";
import { AuthProvider } from "react-oidc-context";

// auth config
// using this lib: https://github.com/authts/react-oidc-context#documentation
// https://keycloak.sau-portal.de, cors does not work yet
const oidcAuthority = "http://localhost:8080"

// you can use this for scope config: https://authts.github.io/oidc-client-ts/interfaces/UserManagerSettings.html#scope
// other config params go here aswell
const oidcConfig = {
  authority: `${oidcAuthority}/realms/sau`,
  client_id: "default",
  redirect_uri: window.location.origin + '/',
  response_type: 'code',
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  stateStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  // openid is always required (?)
  scope: "openid profile email demo"
};


if (process.env.NODE_ENV === "development") {
  // enable the single spa import map override panel in dev mode
  localStorage.setItem("imo-ui", "true");
} else {
  // disable the single spa import map override panel for built environments (can still be accessed using the browser extension)
  localStorage.setItem("imo-ui", "false");
}
start();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);
