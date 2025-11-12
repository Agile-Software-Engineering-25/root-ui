import provadisIcon from "@assets/provadis-icon.svg";
import { Box, Stack } from "@mui/joy";
import { useTranslation } from "react-i18next";
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
    name: "nav.exams.generic",
    path: "/exams",
    children: [
      {
        name: "nav.exams.examsOverview",
        path: "/exams/exams",
        visibleOnRoles: [
          UserRole.UniversityAdministrativeStaff,
          UserRole.SauAdmin,
        ],
      },
      {
        name: "nav.exams.certificates",
        path: "/exams/certificates",
        visibleOnRoles: [
          UserRole.UniversityAdministrativeStaff,
          UserRole.SauAdmin,
        ],
      },
    ],
  },
  { name: "nav.newsfeed", path: "/newsfeed" },
  {
    name: "nav.documentsname",
    children: [
      {
        name: "nav.documents.documents",
        path: "/document-management/documents",
      },
      { name: "nav.documents.requests", path: "/document-management/requests" },
    ],
  },
  {
    name: "nav.masterdataname",
    children: [
      { name: "nav.masterdata.persons", path: "/data/person" },
      {
        name: "nav.masterdata.studycontent",
        path: "/masterdata/studycontent",
        visibleOnRoles: [
          UserRole.Lecturer,
          UserRole.UniversityAdministrativeStaff,
          UserRole.SauAdmin,
        ],
      },
    ],
  },
  {
    name: "nav.parking",
    path: "/parkingspot",
  },
  {
    name: "nav.timetable",
    path: "/timetable",
  },
  {
    name: "nav.roomresourcesname",
    children: [
      {
        name: "nav.roomresources.bookings",
        path: "/room-booking/bookings",
      },
      {
        name: "nav.roomresources.rooms",
        path: "/room-booking/rooms",
      },
      {
        name: "nav.roomresources.buildings",
        path: "/room-booking/buildings",
      },
    ],
  },
  {
    name: "nav.about",
    path: "/about",
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: "2000px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Box sx={{ flex: "1 1 0", alignItems: "center" }}>
        {width < RESP_BREAKPOINT ? (
          <NavDrawer navBarElements={routes} />
        ) : (
          <img
            src={provadisIcon}
            alt={t("brand.provadisAlt")}
            style={{ height: "36px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        )}
      </Box>

      <Box
        sx={{
          flex: "0 0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {width >= RESP_BREAKPOINT ? (
          <NavContent navBarElements={routes} />
        ) : (
          <img
            src={provadisIcon}
            alt={t("brand.provadisAlt")}
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
