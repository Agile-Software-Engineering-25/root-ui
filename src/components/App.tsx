import { useAuth, useAutoSignin } from "react-oidc-context";
import Skeleton from "./Skeleton";

const App = () => {
  const auth = useAuth();
  const { isLoading, isAuthenticated, error } = useAutoSignin({signinMethod: "signinRedirect"});

  if (isLoading) {
    return <div>Signing you in/out...</div>;
  }

  if(error) {
    return <div>An error occurred: {error.message}</div>
  }

  if (isAuthenticated) {
    const token = auth.user?.access_token;
    if (!token) {
      return <div>
        <p>Authentication successful but no access token available.</p>
        <button onClick={() => void auth.signinRedirect()}>Try again</button>
      </div>;
    }

    return <Skeleton />;
  }

  // Fallback
  return <div>
    <p>Not authenticated.</p>
    <button onClick={() => void auth.signinRedirect()}>Log in</button>
  </div>;
};

export default App;
