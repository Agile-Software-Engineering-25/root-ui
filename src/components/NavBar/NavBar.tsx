import { Link as JoyLink, Stack } from "@mui/joy";
import provadisIcon from "@assets/provadis-icon.svg";
import { Link as ReactRouterLink, useNavigate } from "react-router";

const navBarElements = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Prüfungen",
    path: "/exams",
  },
  {
    name: "Raum Buchung",
    path: "/room-booking/rooms",
  },
  {
    name: "Document Management",
    path: "/document-management/document-management",
  },
];

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={"row"}
      component={"nav"}
      gap={"74px"}
      alignItems={"center"}
    >
      <img
        src={provadisIcon}
        alt={"Provadis Logo"}
        style={{ height: "36px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      {navBarElements.map((element) => (
        <JoyLink
          component={ReactRouterLink}
          level="body-md"
          sx={{
            fontSize: "16px",
            userSelect: "none",
            color: "rgb(50, 56, 62)",
            ":hover": {
              color: "primary.500",
              cursor: "pointer",
              textDecoration: "none",
            },
          }}
          to={element.path}
          key={element.path}
        >
          {element.name}
        </JoyLink>
      ))}
    </Stack>
  );
};

export default NavBar;
