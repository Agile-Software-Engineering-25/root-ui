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

// Keep single-spa lifecycle side-effects idempotent across re-renders and HMR
// Store flags on window so they survive module reloads in dev
const rootSpaState =
  (window as any).__rootSpaState ??= {
    appsHaveBeenRegistered: false,
    singleSpaStarted: false,
  };

declare global {
  interface Window {
    __rootAuthUser?: any;
  }
}

// Component to handle application registration AFTER authentication
function AppRegistration() {
  const auth = useAuth();

  // Keep global auth reference up to date for microfrontends without re-registering
  useEffect(() => {
    window.__rootAuthUser = auth.user ?? undefined;
    try {
      window.dispatchEvent(new CustomEvent("auth:user-changed", { detail: auth.user }));
    } catch {
      // no-op if CustomEvent not supported in the environment
    }
  }, [auth.user]);

  // Register single-spa apps only once, after authentication
  useEffect(() => {
    if (auth.isAuthenticated && !rootSpaState.appsHaveBeenRegistered) {
      apps.forEach((app) => {
        registerApplication({
          name: app.name,
          activeWhen: app.basename,
          customProps: {
            basename: app.basename,
            // Backward-compatibility: provide a snapshot user for legacy MFEs
            user: (window as any).__rootAuthUser,
            // Accessors so children can always fetch the latest auth data without re-registering
            getUser: () => window.__rootAuthUser,
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

      if (!rootSpaState.singleSpaStarted) {
        start();
        rootSpaState.singleSpaStarted = true;
      }

      rootSpaState.appsHaveBeenRegistered = true;
    }
  }, [auth.isAuthenticated]);

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
