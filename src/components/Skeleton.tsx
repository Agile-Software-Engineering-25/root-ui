import { Box, Sheet, Stack } from "@mui/joy";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import RoutingComponent from "./RoutingComponent/RoutingComponent";

const Skeleton = () => {
  return (
    <Sheet sx={{ width: "100%", minWidth: "350px", display: "flex", flexDirection: "column"}}>
      <Box sx={{minHeight: "100vh"}}>
          <Stack id={"navbar"} direction={"row"} alignItems={"center"} spacing={1} 
            sx={{height: "68px", px: "25px", backgroundColor: "white", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", boxSizing: "border-box"}}
          >
          <Navigation />
        </Stack>
        <Box sx={{m: "2em 1em", overflowX: "auto"}}>
          <RoutingComponent />
        </Box>
      </Box>
      <Footer />
    </Sheet>
  );
};

export default Skeleton;
