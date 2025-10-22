import Grid from "@mui/material/Grid";
import { Box, Typography, Link as JoyLink, IconButton, Divider } from "@mui/joy";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import provadisIcon from "@assets/provadis_logo.png";
import { useNavigate } from "react-router";

const companyLinks = [
	{ name: "ABOUT US", path: "#" },
	{ name: "BLOG", path: "#" },
	{ name: "PARTNERSHIPS", path: "#" },
	{ name: "CAREERS", path: "#" },
	{ name: "PRESS", path: "#" },
	{ name: "IMPRESSUM", path: "#" },
];

const resourceLinks = [
	{ name: "APPLICATION", path: "#" },
	{ name: "SYSTEMS", path: "#" },
	{ name: "FAQ", path: "#" },
];

const socialMediaList = [
	{ icon: <Facebook />, path: "#" },
	{ icon: <Twitter />, path: "#" },
	{ icon: <LinkedIn />, path: "#" },
	{ icon: <Instagram />, path: "#" },
];

const contactList = ["Provadis School of International", "Management and Technology AG", "Industriepark Höchst, Gebäude B845", "65926 Frankfurt am Main", "Telefon: +49 69 395-81051", "E-Mail: info@provadis-hochschule.de"];

const flexcenter = { display: "flex", justifyContent: "center", alignItems: "start" };

export default function Footer() {
	const navigate = useNavigate();

	return (
		<Box component="footer" sx={{ bgcolor: "#002E6D", px: 6, py: 6, mt: "auto" }}>
			<Grid container spacing={3} sx={{ ...flexcenter, maxWidth: "2000px", margin: "0 auto" }}>
				<Grid size={{ xs: 12, lg: 3 }} sx={{ ...flexcenter, alignContent: "center" }}>
					<img src={provadisIcon} alt="Provadis Logo" style={{ cursor: "pointer", width: "80%", maxWidth: "600px" }} onClick={() => navigate("/")} />
				</Grid>

				<Grid size={{ xs: 6, md: 4, lg: 3 }} sx={{ ...flexcenter, alignItems: "center", flexDirection: "column", gap: 3 }}>
					<Divider sx={{ "--Divider-childPosition": "50%" }}>COMPANY</Divider>
					<Box sx={{ ...flexcenter, flexDirection: "column", justifyContent: "start", gap: 3 }}>
						{companyLinks.map((src, index) => (
							<JoyLink key={index} level="body-sm" underline="none" sx={{ color: "white", "&:hover": { color: "primary.300" } }} href={src.path}>
								{src.name}
							</JoyLink>
						))}
					</Box>
				</Grid>

				<Grid size={{ xs: 6, md: 4, lg: 3 }} sx={{ ...flexcenter, alignItems: "center", flexDirection: "column", gap: 3 }}>
					<Divider sx={{ "--Divider-childPosition": "50%" }}>RESOURCES</Divider>
					<Box sx={{ ...flexcenter, flexDirection: "column", justifyContent: "start", gap: 3 }}>
						{resourceLinks.map((src, index) => (
							<JoyLink key={index} level="body-sm" underline="none" sx={{ color: "white", "&:hover": { color: "primary.300" } }} href={src.path}>
								{src.name}
							</JoyLink>
						))}
					</Box>
				</Grid>

				<Grid size={{ xs: 12, md: 4, lg: 3 }} sx={{ ...flexcenter, alignItems: "center", flexDirection: "column", gap: 3 }}>
					<Divider sx={{ "--Divider-childPosition": "50%" }}>CONTACT</Divider>
					<Box sx={{ ...flexcenter, flexDirection: "column", justifyContent: "start", gap: 3 }}>
						{contactList.map((line, index) => (
							<Typography key={index} level="body-sm" sx={{ color: "white" }}>
								{line}
							</Typography>
						))}
					</Box>
				</Grid>

				<Grid size={{ xs: 12 }}>
					<Divider sx={{ "--Divider-childPosition": "50%" }}>Social Media</Divider>
				</Grid>

				<Grid size={{ xs: 12 }} sx={{ ...flexcenter, gap: 3 }}>
					{socialMediaList.map((social, index) => (
						<IconButton key={index} variant="solid" color="primary" onClick={() => navigate(social.path)}>
							{social.icon}
						</IconButton>
					))}
				</Grid>
			</Grid>
		</Box>
	);
}
