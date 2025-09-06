import { useAuth } from "react-oidc-context";
import Skeleton from "./Skeleton";

const App = () => {
  const auth = useAuth();

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
      return <div>Oops... an error occurred: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    const token = auth.user?.access_token;
    if (!token) return <div>No access token</div>;

    return <Skeleton />;
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
};

export default App;
