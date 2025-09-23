import {
  createCustomJoyTheme,
} from '@agile-software/shared-components';
import { CssBaseline, CssVarsProvider, StyledEngineProvider } from "@mui/joy";
import { SnackbarProvider } from 'notistack';
import { WebStorageStateStore } from "oidc-client-ts";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, useAuth } from "react-oidc-context";
import { BrowserRouter } from "react-router";
import { getAppNames, registerApplication, start } from "single-spa";
import apps from "./apps";
import App from "./components/App";

const oidcAuthority = "https://keycloak.sau-portal.de";

const joyTheme = createCustomJoyTheme()

// you can use this for scope config: https://authts.github.io/oidc-client-ts/interfaces/UserManagerSettings.html#scope
// other config params go here aswell
const oidcConfig = {
  authority: `${oidcAuthority}/realms/sau`,
  client_id: "root-ui",
  redirect_uri: window.location.origin + '/',
  response_type: 'code',
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  stateStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
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
    <StyledEngineProvider>
      <BrowserRouter>
        <CssVarsProvider theme={joyTheme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <AuthProvider {...oidcConfig}>
              <AppRegistration />
            </AuthProvider>
          </SnackbarProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </StrictMode>
);
