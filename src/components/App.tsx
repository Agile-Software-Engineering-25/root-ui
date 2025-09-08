import Skeleton from "./Skeleton";

import { useAuth, useAutoSignin } from "react-oidc-context";
import { useEffect, useRef } from "react";
import apps from "../apps";
import { registerApplication, getAppNames } from "single-spa";
import { useAuthCommunication } from "../hooks/useAuthCommunication";

const App = () => {
  // const auth = useAuth();
  // useAuthCommunication(auth)


  const { isLoading, isAuthenticated, error } = useAutoSignin({signinMethod: "signinRedirect"});

      if (isLoading) {
          return <div>Signing you in/out...</div>;
      }

      if (!isAuthenticated) {
          return <div>Unable to log in</div>;
      }

      if(error) {
          return <div>An error occured</div>
      }

      return <div>Signed in successfully</div>;

};

export default App;
