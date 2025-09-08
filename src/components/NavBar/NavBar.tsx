import {Typography} from "@mui/joy";

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
    const redirect = (path: string) => {
        window.location.href = path;
    }

    return <>
        {navBarElements.map((element) => (
            <Typography
                color={element.disabled ? "neutral" : undefined} level="body-md" sx={{
                fontSize: "16px", userSelect: "none", ":hover": (!element.disabled ? {
                    color: "primary.500",
                    cursor: "pointer"
                } : undefined)
            }}
                onClick={() => (!element.disabled ? redirect(element.path) : null)}
            >
                {element.name}
            </Typography>
        ))}
    </>
}

export default NavBar;