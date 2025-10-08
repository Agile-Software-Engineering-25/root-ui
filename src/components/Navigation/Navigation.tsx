import { Stack } from "@mui/joy";
import NavBar from "../NavBar/NavBar.tsx";
import SubNav from "../SubNav/SubNav.tsx";
import NavDrawer from "../NavDrawer/NavDrawer.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.ts";
import { useState } from "react";

const routes = [
	{
		name: "Prüfungen und Noten",
		path: "/exams",
		children: [
			{ name: "Zeugnisse", path: "/exams/certificate" },
			{ name: "Prüfungen", path: "/exams/exam" },
		],
	},
	{
		name: "Dokumentenmanagement",
		path: "/document-management",
		children: [
			{ name: "Newsfeed", path: "/document-management/newsfeed" },
			{ name: "Dokumente", path: "/document-management/documents" },
			{ name: "Anträge", path: "/document-management/requests" },
		],
	},
	{
		name: "Stammdaten",
		path: "/data",
		children: [
			{ name: "Personen", path: "/data/person" },
			{ name: "Studieninhalt", path: "data/study" },
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
		path: "/room-booking/rooms",
	},
];

const Navigation = () => {
	const { width } = useWindowSize();
	const [activeMenu, setActiveMenu] = useState<string | null>(null);

	return (
		<Stack width="100%" zIndex={1000}>
			{/* {width < 1120 ? (
				<NavDrawer navBarElements={routes} />
			) : (
				<>
					<NavBar navBarElements={routes} setActiveMenu={setActiveMenu} />
					<SubNav navBarElements={routes} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
				</>
			)} */}

      
		</Stack>
	);
};

export default Navigation;
