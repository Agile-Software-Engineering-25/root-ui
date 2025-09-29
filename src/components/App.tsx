import { Button, Typography, useColorScheme } from "@mui/joy";
import { useEffect, useRef } from "react";
import { useAuth, useAutoSignin } from "react-oidc-context";
import { setGlobalUser } from "../hooks/useUser";
import Skeleton from "./Skeleton";
import StatusView from "./StatusView";

const App = () => {
  const auth = useAuth();
  const { setMode } = useColorScheme();
  const { isLoading, isAuthenticated, error } = useAutoSignin({ signinMethod: "signinRedirect" });

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
    return <StatusView showSpinner message={<Typography>Signing you in/out...</Typography>} />;
  }

  if (error) {
    return (
      <StatusView title="An error occurred" message={<Typography>{error.message || "Unknown error"}</Typography>}>
        <Button onClick={() => void auth.signinRedirect()}>Sign in again</Button>
      </StatusView>
    );
  }

  if (!isAuthenticated) {
    return (
      <StatusView title="Not authenticated." message={<Typography>You need to log in to access this application.</Typography>}>
        <Button onClick={() => void auth.signinRedirect()}>Sign in</Button>
      </StatusView>
    );
  }

  const token = auth.user?.access_token;
  if (!token) {
    return (
      <StatusView title="Authenticated but access token not available" message={<Typography>You need to log in to access this application.</Typography>}>
        <Button onClick={() => void auth.signinRedirect()}>Sign in</Button>
      </StatusView>
    );
  }

  return <Skeleton />;
};

export default App;
