import EmbeddedApplication from "./EmbeddedApplication/EmbeddedApplication";

import { useAuth } from "react-oidc-context";
import { useEffect, useRef } from "react";
import apps from "../apps";
import { registerApplication, getAppNames } from "single-spa";
import { useAuthCommunication } from "../hooks/useAuthCommunication";

const App = () => {
  const auth = useAuth();
  const appsRegistered = useRef(false);

  useEffect(() => {
    if (!appsRegistered.current) {
      apps.forEach((app) => {
        if (!getAppNames().includes(app.name)) {
          registerApplication({
            name: app.name,
            activeWhen: app.activeWhen,
            customProps: {
              domElement: document.querySelector(app.mountWhere),
            },
            app: () => import(/* @vite-ignore */ app.name),
          });
        }
      });
      appsRegistered.current = true;
    }
  }, []);

  useAuthCommunication(auth);

  // display info of current login status
  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Auth error: {auth.error.message}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "100%",
      }}
    >
      <nav
        style={{
          backgroundColor: "lightblue",
          padding: "1rem",
          width: "calc(100% - 2rem)",
        }}
      >
        Navigations Bar

        {auth.isAuthenticated ?
          <button onClick={async () => { await auth.signoutRedirect() }}>sign out</button> :
          <button onClick={async () => { await auth.signinRedirect() }}>sign in</button>
        }

      </nav>
      <EmbeddedApplication
        name="@agile-software-engineering/frontend-template"
        sx={{ flexGrow: 1 }}
      />
      <footer
        style={{
          backgroundColor: "lightgray",
          padding: "1rem",
          width: "calc(100% - 2rem)",
        }}
      >
        Footer
      </footer>
    </div>
  );
};

export default App;
