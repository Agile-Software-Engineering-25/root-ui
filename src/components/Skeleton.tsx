import { Sheet, Stack } from "@mui/joy";
import NavBar from "./NavBar/NavBar";
import RoutingComponent from "./RoutingComponent/RoutingComponent";

const Skeleton = () => {
  return (
    <Sheet sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Stack id={"navbar"} direction={"row"} alignItems={"center"} spacing={1} sx={{
        height: "68px",
        px: "25px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
      }}>
        <NavBar />
      </Stack>
      <RoutingComponent />
      <footer
        style={{
          backgroundColor: "lightgray",
          padding: "1rem",
          width: "calc(100% - 2rem)",
        }}
      >
        Footer
      </footer>
    </Sheet>
  );
};

export default Skeleton;
