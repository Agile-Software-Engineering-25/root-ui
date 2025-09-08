import EmbeddedApplication from "./EmbeddedApplication/EmbeddedApplication";
import {CssBaseline, Sheet, Stack} from "@mui/joy";
import {CssVarsProvider as JoyCssVarsProvider} from '@mui/joy';
import {
    createCustomJoyTheme,
} from '@agile-software/shared-components';
import provadisIcon from "@assets/provadis-icon.svg";
import NavBarElements from "./NavBar/NavBar.tsx";

const joyTheme = createCustomJoyTheme();

/* dont come at me for this design - its 2 am and I just want to get this working */
const App = () => {
    return (
        <JoyCssVarsProvider theme={joyTheme}>
            <CssBaseline/>
            <Sheet sx={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
                <Stack id={"navbar"} direction={"row"} alignItems={"center"} spacing={1} sx={{
                    height: "68px",
                    px: "25px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    boxSizing: "border-box",
                }}>
                    <Stack direction={"row"} component={"nav"} gap={"74px"} alignItems={"center"}>
                        <img src={provadisIcon} alt={"Provadis Logo"} style={{height: "36px"}}/>
                        <NavBarElements/>
                    </Stack>
                </Stack>
                <EmbeddedApplication
                    name="@agile-software-engineering/ase-12-lecturer-service"
                    sx={{flexGrow: 1}}
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
            </Sheet>
        </JoyCssVarsProvider>
    )
};

export default App;
