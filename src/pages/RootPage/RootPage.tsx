import { Box, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

const RootPage = () => {
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
        {t("root.welcomeTitle")}
      </Typography>
      <Typography level={"title-md"} fontSize={"36px"} component={"h2"}>
        {t("root.subtitle")}
      </Typography>
    </Box>
  );
};

export default RootPage;
