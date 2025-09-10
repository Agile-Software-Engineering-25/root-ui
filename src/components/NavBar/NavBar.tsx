import { Stack, Typography } from "@mui/joy";
import provadisIcon from "@assets/provadis-icon.svg";
import { useNavigate } from "react-router";

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
        <Typography
          level="body-md"
          sx={{
            fontSize: "16px",
            userSelect: "none",
            ":hover": {
              color: "primary.500",
              cursor: "pointer",
            },
          }}
          onClick={() => navigate(element.path)}
          key={element.path}
        >
          {element.name}
        </Typography>
      ))}
    </Stack>
  );
};

export default NavBar;
