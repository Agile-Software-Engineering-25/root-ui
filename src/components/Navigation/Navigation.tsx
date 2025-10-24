import { Box, Stack } from "@mui/joy";
import { useNavigate } from "react-router";
import { useWindowSize } from "../../hooks/useWindowSize.ts";
import provadisIcon from "@assets/provadis-icon.svg";
import NavMenu from "./NavMenu.tsx";
import NavContent from "./NavContent.tsx";
import NavDrawer from "./NavDrawer.tsx";

const RESP_BREAKPOINT = 1250;

const routes = [
	{
		name: "Prüfungen und Noten",
		children: [
			{ name: "Zeugnisse", path: "/exams/certificate" },
			{ name: "Prüfungen", path: "/exams/exam" },
		],
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
		path: "/room-booking",
	},
	{
		name: "About",
		path: "/about",
	},
];

const Navigation = () => {
	const navigate = useNavigate();
	const { width } = useWindowSize();

	return (
		<Stack sx={{ width: "100%", maxWidth: "2000px",margin: "0 auto", display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px" }}>
			
			<Box sx={{flex: "1 1 0"}}>
				{
					width < RESP_BREAKPOINT ? 
					<NavDrawer navBarElements={routes} /> 
					: 
					<img src={provadisIcon} alt={"Provadis Logo"} style={{ height: "36px", cursor: "pointer" }} onClick={() => navigate("/")} />
				}
			</Box>

			<Box sx={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
				{
					width >= RESP_BREAKPOINT ? 
					<NavContent navBarElements={routes} /> 
					: 
					<img src={provadisIcon} alt={"Provadis Logo"} style={{ height: "36px", cursor: "pointer" }} onClick={() => navigate("/")} />
				}
			</Box>

			<Box sx={{flex: "1 1 0"}}>
				<NavMenu />
			</Box>
		</Stack>
	);
};

export default Navigation;
