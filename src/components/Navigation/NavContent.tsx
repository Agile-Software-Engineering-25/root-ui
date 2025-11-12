import { List, ListItem, ListItemButton } from "@mui/joy";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import useUser from "../../hooks/useUser";
import { Route } from "./Navigation";

export default function NavContent({
  navBarElements,
}: {
  navBarElements: Route[];
}) {
  const user = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState<number | null>(null);
  return (
    <List
      orientation="horizontal"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {navBarElements.map((element, index) =>
        !element.visibleOnRoles || user.hasAnyRole(element.visibleOnRoles) ? (
          <ListItem key={`nav-${index}-${element.name}`}>
            <ListItemButton
              sx={{ userSelect: "none", borderRadius: "5px" }}
              selected={
                window.location.pathname != "/" &&
                (element.path === window.location.pathname ||
                  element.children
                    ?.map((child) => child.path)
                    .join("")
                    .includes(window.location.pathname))
              }
              onClick={() => {
                console.log(
                  element.children?.filter(
                    (child) =>
                      !child.visibleOnRoles ||
                      user.hasAnyRole(child.visibleOnRoles)
                  )?.[0]?.path ??
                    element?.path ??
                    "#"
                );
                navigate(
                  element.children?.filter(
                    (child) =>
                      !child.visibleOnRoles ||
                      user.hasAnyRole(child.visibleOnRoles)
                  )?.[0]?.path ??
                    element?.path ??
                    "#"
                );
              }}
              onMouseEnter={() =>
                setCurrentItem(
                  (
                    element.children?.filter((child) =>
                      child.visibleOnRoles
                        ? user.hasAnyRole(child.visibleOnRoles)
                        : true
                    ) ?? []
                  ).length > 0
                    ? index
                    : null
                )
              }
            >
              {t(element.name)}
            </ListItemButton>
            {currentItem === index && (
              <List
                orientation="horizontal"
                onMouseLeave={() => setCurrentItem(null)}
                sx={{
                  width: "100vw",
                  p: "10px",
                  position: "fixed",
                  left: "0",
                  top: "68px",
                  justifyContent: "center",
                  gap: "20px",
                  borderTop: "1px solid #00000032",
                  borderBottom: "1px solid #F3F8FF",
                  backgroundColor: "#F3F8FF",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  boxSizing: "border-box",
                }}
              >
                {element.children?.map((child, cidx) =>
                  !child.visibleOnRoles ||
                  user.hasAnyRole(child.visibleOnRoles) ? (
                    <ListItem key={`child-${index}-${cidx}`}>
                      <ListItemButton
                        selected={child.path === window.location.pathname}
                        sx={{ userSelect: "none", borderRadius: "5px" }}
                        onClick={() => navigate(child.path)}
                      >
                        {t(child.name)}
                      </ListItemButton>
                    </ListItem>
                  ) : null
                )}
              </List>
            )}
          </ListItem>
        ) : null
      )}
    </List>
  );
}
