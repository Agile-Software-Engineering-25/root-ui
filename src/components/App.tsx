import {Sheet, Stack, useColorScheme} from "@mui/joy";
import { useAuth, useAutoSignin } from "react-oidc-context";
import NavBar from "./NavBar/NavBar.tsx";
import { useEffect, useRef } from "react";
import Skeleton from "./Skeleton";
import RoutingComponent from "./RoutingComponent/RoutingComponent.tsx";
import { setGlobalUser } from "../hooks/useUser";

const App = () => {
  const auth = useAuth();
  const {setMode} = useColorScheme();
  const { isLoading, isAuthenticated, error } = useAutoSignin({signinMethod: "signinRedirect"});

  // Keep a stable reference of last token to avoid redundant global updates
  const lastTokenRef = useRef<string | undefined>(undefined);

  // Sync global user only when authentication state truly changes or a new token appears
  useEffect(() => {
    if (!isAuthenticated) {
      if (lastTokenRef.current !== undefined) {
        setGlobalUser(null);
        lastTokenRef.current = undefined;
      }
      return;
    }

    const token = auth.user?.access_token;

    // Only update global state when we have a token and it changed
    if (token && token !== lastTokenRef.current) {
      setGlobalUser(auth.user ?? null);
      lastTokenRef.current = token;
    }
  }, [isAuthenticated, auth.user?.access_token]);
   
  useEffect(() => {
      setMode("light");
  }, [setMode]);


  if (isLoading) {
    return <div>Signing you in/out...</div>;
  }

  if(error) {
    return <div>An error occurred: {error.message}</div>
  }

  if (!isAuthenticated) {
    return (
      <div>
        <p>Not authenticated.</p>
        <button onClick={() => void auth.signinRedirect()}>Log in</button>
      </div>
    );
  }

  const token = auth.user?.access_token;
  if (!token) {
    return (
      <div>
        <p>Authenticated but access token not yet available.</p>
        <button onClick={() => void auth.signinRedirect()}>Retry</button>
      </div>
    );
  }

  return <Skeleton />;
};
    /*  <Sheet sx={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
            <Stack id={"navbar"} direction={"row"} alignItems={"center"} spacing={1} sx={{
                height: "68px",
                px: "25px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                boxSizing: "border-box",
            }}>
                <NavBar/>
            </Stack>
            <RoutingComponent/>
            <footer
                style={{
                    backgroundColor: "lightgray",
                    padding: "1rem",
                    width: "calc(100% - 2rem)",
                }}
            >
                Footer
            </footer>
        </Sheet>
*/

export default App;
