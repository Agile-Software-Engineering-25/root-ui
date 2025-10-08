import { Box, Sheet, Stack } from "@mui/joy";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import RoutingComponent from "./RoutingComponent/RoutingComponent";

const Skeleton = () => {
  return (
    <Sheet sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{minHeight: "100vh"}}>
          <Stack id={"navbar"} direction={"row"} alignItems={"center"} spacing={1} sx={{
          height: "68px",
          px: "25px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          boxSizing: "border-box",
        }}>
          <Navigation />
        </Stack>
        <Box sx={{m: "2em"}}>
          <RoutingComponent />
        </Box>
      </Box>
      <Footer />
    </Sheet>
  );
};

export default Skeleton;
