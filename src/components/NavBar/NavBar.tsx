import {Stack, Typography} from "@mui/joy";
import provadisIcon from "@assets/provadis-icon.svg";
import {useNavigate} from "react-router";

const navBarElements = [
    {
        name: "Home",
        path: "/",
        disabled: true
    },
    {
        name: "About",
        path: "/about",
        disabled: true
    },
    {
        name: "Prüfungen",
        path: "/exams",
        disabled: false
    }
]


const NavBar = () => {
    const navigate = useNavigate();

    return <Stack direction={"row"} component={"nav"} gap={"74px"} alignItems={"center"}>
        <img src={provadisIcon} alt={"Provadis Logo"} style={{height: "36px", cursor: "pointer"}}
             onClick={() => navigate("/")}/>
        {navBarElements.map((element) => (
            <Typography
                color={element.disabled ? "neutral" : undefined} level="body-md" sx={{
                fontSize: "16px", userSelect: "none", ":hover": (!element.disabled ? {
                    color: "primary.500",
                    cursor: "pointer"
                } : undefined)
            }}
                onClick={() => (!element.disabled ? navigate(element.path) : null)}
                key={element.path}
            >
                {element.name}
            </Typography>
        ))}
    </Stack>
}

export default NavBar;