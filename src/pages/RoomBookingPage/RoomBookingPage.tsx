import { Box, Typography } from "@mui/joy";

const RoomBookingService = () => {
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
        Willkommen im neuen Hochschulportal
      </Typography>
      <Typography level={"title-md"} fontSize={"36px"} component={"h2"}>
        Sieh dir die Funktionen an:
      </Typography>
    </Box>
  );
};

export default RoomBookingService;
