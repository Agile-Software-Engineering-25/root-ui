import { Stack } from "@mui/joy";
import { useNavigate } from "react-router";
import { useWindowSize } from "../../hooks/useWindowSize.ts";
import provadisIcon from "@assets/provadis-icon.svg";
import PostNav from "./NavMenu.tsx";
import NavContent from "./NavContent.tsx";
import NavDrawer from "./NavDrawer.tsx";

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
			{ name: "Studieninhalt", path: "/data/study" },
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
	const navigate = useNavigate();
	const { width } = useWindowSize();

	return (
		<Stack width="100%">
			<Stack sx={{ width: "100%", maxWidth: "2000px", margin: "0 auto", display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px" }}>
				{width < 1120 && <NavDrawer navBarElements={routes} />}
				<img src={provadisIcon} alt={"Provadis Logo"} style={{ height: "36px", cursor: "pointer" }} onClick={() => navigate("/")} />
				{width >= 1120 && <NavContent navBarElements={routes} />}
				<PostNav />
			</Stack>
		</Stack>
	);
};

export default Navigation;
