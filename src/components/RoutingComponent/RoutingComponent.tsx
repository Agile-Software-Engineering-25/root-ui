import { Box } from "@mui/joy";
import { useLocation } from "react-router";
import AboutPage from "../../pages/AboutPage/AboutPage.tsx";
import BaseDataPage from "../../pages/BaseDataPage/BaseDataPage.tsx";
import EmbedPage from "../../pages/EmbedPage/EmbedPage.tsx";
import ExamPage from "../../pages/ExamPage/ExamPage.tsx";
import PersonalInformationPage from "../../pages/PersonalInformationPage/PersonalInformationPage.tsx";
import RoomBookingService from "../../pages/RoomBookingPage/RoomBookingPage.tsx";
import RootPage from "../../pages/RootPage/RootPage.tsx";
import StudyContentPage from "../../pages/StudyContentPage/StudyContentPage.tsx";

const paths = [
  { path: "/", component: <RootPage /> },

  { path: "/exams", component: <ExamPage /> },

  // { path: "/document-management/newsfeed", component: <></> },
  { path: "/document-management/documents", component: <BaseDataPage /> },
  {
    path: "/document-management/requests",
    component: (
      <EmbedPage pageID="@agile-software-engineering/ase-06-antrag-service" />
    ),
  },

  { path: "/data/person", component: <PersonalInformationPage /> },
  { path: "/masterdata/studycontent", component: <StudyContentPage /> },

  // { path: "/parkingspot", component: <></> },

  // { path: "/timetable", component: <></> },

  { path: "/room-booking", component: <RoomBookingService /> },

  { path: "/about", component: <AboutPage /> },
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
