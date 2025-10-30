import provadisIcon from "@assets/provadis-icon.svg";
import { Box, Stack } from "@mui/joy";
import { useNavigate } from "react-router";
import { useWindowSize } from "../../hooks/useWindowSize.ts";
import { UserRole } from "../../types/enums.ts";
import NavContent from "./NavContent.tsx";
import NavDrawer from "./NavDrawer.tsx";
import NavMenu from "./NavMenu.tsx";

const RESP_BREAKPOINT = 1250;

export type Route = {
  name: string;
  path?: string;
  children?: Subroute[];
  visibleOnRoles?: UserRole[];
};

export type Subroute = {
  name: string;
  path: string;
  disabled?: boolean;
  visibleOnRoles?: UserRole[];
};

const routes: Route[] = [
  {
    name: "Prüfungen und Noten",
    path: "/exams",
  },
  {
    name: "Dokumentenmanagement",
    children: [
      { name: "Newsfeed", path: "/document-management/newsfeed" },
      { name: "Dokumente", path: "/document-management/documents" },
      { name: "Anträge", path: "/document-management/requests" },
    ],
  },
  {
    name: "Stammdaten",
    children: [
      { name: "Personen", path: "/data/person" },
      {
        name: "Studieninhalt",
        path: "/masterdata/studycontent",
        visibleOnRoles: [
          UserRole.SauAdmin,
          UserRole.UniversityAdministrativeStaff,
        ],
      },
    ],
  },
  {
    name: "Parkplatzanalyse",
    path: "/parkingspot",
  },
  {
    name: "Stundenplan",
    path: "/timetable",
  },
  {
    name: "Raumressourcen",
    path: "/room-booking",
  },
  {
    name: "About",
    path: "/about",
  },
];

export interface NavBarElement {
  name: string;
  path?: string;
  children?: { name: string; path: string }[];
}

const Navigation = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: "2000px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <Box sx={{ flex: "1 1 0" }}>
        {width < RESP_BREAKPOINT ? (
          <NavDrawer navBarElements={routes} />
        ) : (
          <img
            src={provadisIcon}
            alt={"Provadis Logo"}
            style={{ height: "36px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        )}
      </Box>

      <Box sx={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
        {width >= RESP_BREAKPOINT ? (
          <NavContent navBarElements={routes} />
        ) : (
          <img
            src={provadisIcon}
            alt={"Provadis Logo"}
            style={{ height: "36px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        )}
      </Box>

      <Box sx={{ flex: "1 1 0" }}>
        <NavMenu />
      </Box>
    </Stack>
  );
};

export default Navigation;
