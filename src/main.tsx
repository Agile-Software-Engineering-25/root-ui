// pkg
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {registerApplication, start, getAppNames} from "single-spa";
import apps from "./apps";
import App from "./components/App";
import {CssBaseline, StyledEngineProvider} from "@mui/joy";
import {BrowserRouter} from "react-router";
import {createCustomJoyTheme} from "@agile-software/shared-components";
import {CssVarsProvider as JoyCssVarsProvider} from '@mui/joy';

const joyTheme = createCustomJoyTheme();

apps.forEach((app) => {
    registerApplication({
        name: app.name,
        activeWhen: app.basename,
        customProps: {
            basename: app.basename,
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
start();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <StyledEngineProvider>
            <BrowserRouter>
                <JoyCssVarsProvider theme={joyTheme}>
                    <CssBaseline/>
                    <App/>
                </JoyCssVarsProvider>
            </BrowserRouter>
        </StyledEngineProvider>
    </StrictMode>
);
