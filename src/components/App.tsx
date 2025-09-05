import { useAuth } from "react-oidc-context";
import Skeleton from "./Skeleton";

/* dont come at me for this design - its 2 am and I just want to get this working */
const App = () => {
    const auth = useAuth();
    
  return (
    <Skeleton/>
  );
};

export default App;
