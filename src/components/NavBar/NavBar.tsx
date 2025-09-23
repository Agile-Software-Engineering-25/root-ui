import { Link as JoyLink, Stack } from "@mui/joy";
import provadisIcon from "@assets/provadis-icon.svg";
import { Link as ReactRouterLink, useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";

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
  const auth = useAuth();

  return (
    <Stack
      direction={"row"}
      component={"nav"}
      gap={"74px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Stack direction={"row"} gap={"74px"} alignItems={"center"}>
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
      <button
        onClick={() => {auth.signoutRedirect().catch((e) => console.error(e))}}
        style={{
          padding: "4px 8px",
          border: "1px solid #ccc",
          background: "transparent",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Logout
      </button>
    </Stack>
  );
};

export default NavBar;
