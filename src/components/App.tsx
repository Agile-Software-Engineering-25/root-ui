import EmbeddedApplication from "./EmbeddedApplication/EmbeddedApplication";

import { useAuth, useAutoSignin } from "react-oidc-context";
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
              userData: auth.user
            },
            app: () => import(/* @vite-ignore */ app.name),
          });
        }
      });
      appsRegistered.current = true;
    }
  }, []);

  useAuthCommunication(auth);
  
    const { isLoading, isAuthenticated, error } = useAutoSignin();

    if (isLoading) {
        return <div>Signing you in/out...</div>;
    }

    if (!isAuthenticated) {
        return <div>Unable to log in</div>;
    }

    if(error) {
        return <div>An error occured</div>
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
        <div style={{float: "left"}}>
          Welcome to SAU, { auth.user?.profile.given_name }
        </div>
        <div style={{float: "right"}}>
          {
            auth.isAuthenticated ?
              <button onClick={async () => { await auth.signoutRedirect() }}>sign out</button> 
              :
              null
          }
        </div>
      </nav>
      <EmbeddedApplication
        name="@agile-software-engineering/frontend-template"
        sx={{ flexGrow: 1 }}
        userProfile={ auth.user }
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
