import { Stack, Link as JoyLink } from "@mui/joy";
import { Link as ReactRouterLink } from "react-router";

const SubNav = ({ navBarElements, activeMenu, setActiveMenu }) => {
  if (!activeMenu) return null;

  const children = navBarElements.find((el) => el.name === activeMenu)?.children;
  if (!children) return null;

  return (
    <Stack
      y-position={20}
      direction="row"
      alignItems="center"
      spacing={6}
      width="100%"
      sx={{
        position: "absolute",
        top: 68,
        left: 0,
        height: "64px",
        px: 6, 
        borderBottom: "1px solid #F3F8FF",
        bgcolor: "#F3F8FF",
      }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      {children.map((child) => (
        <JoyLink
          key={child.path}
          component={ReactRouterLink}
          to={child.path}
          sx={{
            fontSize: "13px",
            color: "rgb(50, 56, 62)",
            ":hover": { color: "primary.500", textDecoration: "none" },
          }}
        >
          {child.name}
        </JoyLink>
      ))}
    </Stack>
  );
};


export default SubNav;
