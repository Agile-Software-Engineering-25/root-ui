import {Box, Typography} from "@mui/joy";

const AboutPage = () => {
    return <Box
        sx={{flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography level={"title-md"} fontSize={"64px"} component={"h1"}>SAU</Typography>
        <Typography level={"title-md"} fontSize={"32px"} component={"h2"}>Student Assistance Utility</Typography>
    </Box>;
}

export default AboutPage;
