import { Button, IconButton, Link as JoyLink, Snackbar, Stack } from "@mui/joy";
import { Person } from "@mui/icons-material";
import provadisIcon from "@assets/provadis-icon.svg";
import { Link as ReactRouterLink, useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import { useState } from "react";
import { Modal } from "@agile-software/shared-components";
import useUser from "../../hooks/useUser";

const navBarElements = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Prüfungen",
    path: "/exams",
  },
  {
    name: "Raum Buchung",
    path: "/room-booking/rooms",
  },
  {
    name: "Document Management",
    path: "/document-management/document-management",
  },
];

const NavBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = useUser();

  const [openUserModal, setOpenUserModal] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  return (
    <Stack
      direction={"row"}
      component={"nav"}
      gap={"74px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Stack direction={"row"} gap={"74px"} alignItems={"center"}>
        <img
          src={provadisIcon}
          alt={"Provadis Logo"}
          style={{ height: "36px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        {navBarElements.map((element) => (
          <JoyLink
            component={ReactRouterLink}
            level="body-md"
            sx={{
              fontSize: "16px",
              userSelect: "none",
              color: "rgb(50, 56, 62)",
              ":hover": {
                color: "primary.500",
                cursor: "pointer",
                textDecoration: "none",
              },
            }}
            to={element.path}
            key={element.path}
          >
            {element.name}
          </JoyLink>
        ))}
      </Stack>

      { /* User data and logout modal */ }
      <IconButton
        onClick={() => setOpenUserModal(true)}
        key={'logout-button'}
        color={'primary'}
        variant={'plain'}>
        <Person />
      </IconButton>
      <Modal
        header="User Information"
        open={openUserModal}
        setOpen={setOpenUserModal}
        disableEscape={false}
      >
        <Stack spacing={1} sx={{ marginBottom: 2 }}>
          <Stack direction="row" spacing={1}>
            <span style={{ fontWeight: "bold", minWidth: "80px" }}>User-ID:</span>
            <span>{user.getUserId()}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span style={{ fontWeight: "bold", minWidth: "80px" }}>Name:</span>
            <span>{user.getFullName()}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span style={{ fontWeight: "bold", minWidth: "80px" }}>E-Mail:</span>
            <span>{user.getEmail()}</span>
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={2}>
          <Button onClick={() => {auth.signoutRedirect().catch((e) => console.error(e))}}>Logout</Button>
          <Button 
            onClick={() => {
              const token = user.getAccessToken();
              if (token) {
                navigator.clipboard.writeText(token)
                  .then(() => setShowCopyFeedback(true))
                  .catch((e) => console.error(e));
              }
            }}
            variant="outlined"
          >
            Copy Token
          </Button>
        </Stack>
      </Modal>
      <Snackbar
        open={showCopyFeedback}
        onClose={() => setShowCopyFeedback(false)}
        autoHideDuration={3000}
        color="success"
      >
        Token copied to clipboard!
      </Snackbar>
    </Stack>
  );
};

export default NavBar;
