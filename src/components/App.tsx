import { useAuth } from "react-oidc-context";
import EmbeddedApplication from "./EmbeddedApplication/EmbeddedApplication";

/* dont come at me for this design - its 2 am and I just want to get this working */
const App = () => {
    const auth = useAuth();
    
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
      </nav>
      <EmbeddedApplication
        name="@agile-software-engineering/frontend-template"
        sx={{ flexGrow: 1 }}
        userData={auth.user}
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
