import { Menu, SubdirectoryArrowRight } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Route } from "./Navigation";

const NavBar = ({ navBarElements }: { navBarElements: Route[] }) => {
  const navigate = useNavigate();
  const [isDrawerExpanded, setDrawerExpanded] = useState(false);
  const { t } = useTranslation();

  const onItemClick = (path?: string) => {
    if (!path) return;
    navigate(path);
    setDrawerExpanded(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        const active = document.activeElement as HTMLElement | null;
        active?.blur();
        setDrawerExpanded((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Box>
      <Drawer open={isDrawerExpanded} onClose={() => setDrawerExpanded(false)}>
        <List>
          <ListItem>
            <ListItemButton
              sx={{ userSelect: "none" }}
              selected={"/" === window.location.pathname}
              onClick={() => onItemClick("/")}
            >
              {t("nav.home")}
            </ListItemButton>
          </ListItem>
          {navBarElements.map((element) => (
            <ListItem key={element.name} nested>
              <ListItemButton
                selected={element.path === window.location.pathname}
                onClick={() => onItemClick(element.path)}
                sx={{
                  ...(element.path ? {} : { backgroundColor: "#98989826" }),
                  userSelect: "none",
                }}
              >
                {t(element.name)}
              </ListItemButton>
              {element.children &&
                element.children.map((child) => (
                  <List
                    key={child.name}
                    sx={{
                      px: 1,
                      backgroundColor:
                        child.path === window.location.pathname
                          ? "#dde7ee"
                          : "transparent",
                    }}
                  >
                    <ListItem>
                      <ListItemButton
                        sx={{ userSelect: "none" }}
                        onClick={() => onItemClick(child.path)}
                      >
                        <SubdirectoryArrowRight />
                        {t(child.name)}
                      </ListItemButton>
                    </ListItem>
                  </List>
                ))}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Tooltip enterDelay={2000} enterNextDelay={2000} title="Ctrl+B">
        <IconButton
          onClick={() => setDrawerExpanded(true)}
          key={"drawer"}
          color={"primary"}
          variant={"plain"}
        >
          <Menu />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NavBar;
