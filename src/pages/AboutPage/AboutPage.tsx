import { Box, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography level={"title-md"} fontSize={"64px"} component={"h1"}>
        {t("about.title1")}
      </Typography>
      <Typography level={"title-md"} fontSize={"32px"} component={"h2"}>
        {t("about.title2")}
      </Typography>
    </Box>
  );
};

export default AboutPage;
