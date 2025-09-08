// pkg
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { start } from "single-spa";
import App from "./components/App";
import { AuthProvider, useAuth } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

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

// Component to handle application registration AFTER authentication
function AppRegistration() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      apps.forEach((app) => {
        registerApplication({
          name: app.name,
          activeWhen: app.basename,
          customProps: {
            basename: app.basename,
            user: auth.user, // User object passed as prop containing all auth information
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
    }
  }, [auth.isAuthenticated, auth.user]);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <AppRegistration />
    </AuthProvider>
  </StrictMode>
);
