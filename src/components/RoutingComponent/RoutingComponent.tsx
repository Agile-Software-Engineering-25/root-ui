import { useLocation } from "react-router";
import { Box } from "@mui/joy";
import AboutPage from "../../pages/AboutPage/AboutPage.tsx";
import ExamPage from "../../pages/ExamPage/ExamPage.tsx";
import RootPage from "../../pages/RootPage/RootPage.tsx";
import RoomBookingService from "../../pages/RoomBookingPage/RoomBookingPage.tsx";
import BaseDataPage from "../../pages/BaseDataPage/BaseDataPage.tsx";
import ExaGradStudentPage from "../../pages/ExaGradStudentPage/ExaGradStudentPage.tsx";
import PersonalInformationPage from "../../pages/PersonalInformationPage/PersonalInformationPage.tsx";
import MasterDataPage from "../../pages/MasterDataPage/MasterDataPage.tsx";

const paths = [
	{ path: "/exams/exam", component: <ExamPage /> },
	{ path: "/room-booking", component: <RoomBookingService /> },
	{ path: "/document-management/documents", component: <BaseDataPage /> },
	{ path: "/exams/certificate", component: <ExaGradStudentPage /> },
	{ path: "/about", component: <AboutPage /> },
	{ path: "/", component: <RootPage /> },
	{ path: "/data/person", component: <PersonalInformationPage /> },
	{ path: "/data/study", component: <MasterDataPage /> },
];

const RoutingComponent = () => {
	const { pathname } = useLocation();

	const activeElement = paths.find((path) =>
		path.path === "/"
			? pathname === "/"
			: pathname === path.path || pathname.startsWith(path.path + "/"),
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
