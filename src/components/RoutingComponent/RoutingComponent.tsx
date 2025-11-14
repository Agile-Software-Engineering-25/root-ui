import { Box } from "@mui/joy";
import { useLocation } from "react-router";
import ExamPage from "../../pages/ExamPage/ExamPage.tsx";
import GenericPage from "./GenericPage";

const paths = [
  {
    path: "/",
    component: (
      <GenericPage
        title={"Willkommen im neuen Hochschulportal"}
        subtitle={"Sieh dir die Funktionen an:"}
      />
    ),
  },

  { path: "/exams", component: <ExamPage /> },
  {
    path: "/document-management/documents",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-07-base-data-service"}
      />
    ),
  },
  {
    path: "/document-management/requests",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-06-antrag-service"}
      />
    ),
  },
  {
    path: "/newsfeed",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-05-newsfeed-service"}
      />
    ),
  },

  {
    path: "/data/person",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-11-persoenliche-daten"}
      />
    ),
  },
  {
    path: "/masterdata/management",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-11-stammdatenverwaltung"}
      />
    ),
  },
  {
    path: "/masterdata/studycontent",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-09-studyunit-data-service"}
      />
    ),
  },
  {
    path: "/parkingspot",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-03-parking-service"}
      />
    ),
  },
  {
    path: "/room-booking",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-01-room-booking-service"}
      />
    ),
  },
  {
    path: "/timetable",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-02-timetable-service"}
      />
    ),
  },
  {
    path: "/about",
    component: (
      <GenericPage title={"SAU"} subtitle={"Student Assistance Utility"} />
    ),
  },
  {
    path: "/masterdata/access-rights",
    component: (
      <GenericPage
        embedName={"@agile-software-engineering/ase-08-access-rights-service"}
      />
    ),
  },
];

const RoutingComponent = () => {
  const { pathname } = useLocation();

  const activeElement = paths.find((path) =>
    path.path === "/"
      ? pathname === "/"
      : pathname === path.path || pathname.startsWith(path.path + "/")
  );

  return (
    <>
      {paths.map((path) => (
        <Box
          sx={{
            display: activeElement?.path === path.path ? "flex" : "none",
            flexGrow: 1,
          }}
          key={path.path}
        >
          {path.component}
        </Box>
      ))}
    </>
  );
};
export default RoutingComponent;
