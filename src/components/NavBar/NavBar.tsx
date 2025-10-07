import { Button, IconButton, Link as JoyLink, Stack } from "@mui/joy";
import { Person } from "@mui/icons-material";
import { Notifications } from "@mui/icons-material";
import { enqueueSnackbar } from 'notistack';
import provadisIcon from "@assets/provadis-icon.svg";
import { Link as ReactRouterLink, useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import { useState } from "react";
import { Modal } from "@agile-software/shared-components";
import useUser from "../../hooks/useUser";

const navBarElements = [
  {
    name: "Prüfungen und Noten",
    path: "/exams",
    children: [
      {name: "Zeugnisse", path: "/exams/certificate"},
      {name: "Prüfungen", path: "/exams/exam"}
    ]
  },
  {
    name: "Dokumentenmanagement",
    path: "/document-management",
    children: [
      {name: "Newsfeed", path: "/document-management/newsfeed"},
      {name: "Dokumente", path: "/document-management/documents"},
      {name: "Anträge", path: "/document-management/requests"}
    ]
  },
  {
    name: "Stammdaten",
    path: "/data",
    children: [
      {name: "Personen", path: "/data/person"},
      {name: "Studieninhalt", path: "data/study"}
    ]
  },
  {
    name: "Parkplatzanalyse",
    path: "/parkingspot",
  },
  {
    name: "Stundenplan",
    path: "/timetable",
  },
  {
    name: "Raumressourcen",
    path: "/room-booking/rooms"
  }
];

const NavBar = ({ setActiveMenu }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = useUser();
  const [openUserModal, setOpenUserModal] = useState(false);

  return (
    <Stack
      direction="row"
      component="nav"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Stack direction={"row"} spacing={"50px"} alignItems={"center"}>
        <img
          src={provadisIcon}
          alt={"Provadis Logo"}
          style={{ height: "36px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        {navBarElements.map((element) => (
          <JoyLink
            component={ReactRouterLink}
            level="body-sm"
            sx={{
              fontSize: "13px",
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
            onMouseEnter={() => element.children && setActiveMenu(element.name)}
          >
            {element.name}
          </JoyLink>
        ))}
      </Stack>
      
      <Stack direction="row" spacing={3} alignItems="center">
        { /* Notice bell modal */ }
      <IconButton
        key={'bell-button'}
        color={'primary'}
        variant={'plain'}>
        <Notifications />
      </IconButton>

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
          <Button onClick={() => {
            auth.signoutRedirect().catch((e) => {
              console.error(e);
              enqueueSnackbar("Couldn't logout. Please try again.", { variant: 'error' });
            });
          }}>Logout</Button>
          <Button 
            onClick={() => {
              const token = user.getAccessToken();
              if (token) {
                navigator.clipboard.writeText(token)
                  .then(() => enqueueSnackbar("Token copied to clipboard!", { variant: 'success' }))
                  .catch((e) => console.error(e));
              }
            }}
            variant="outlined"
          >
            Copy Token
          </Button>
        </Stack>
      </Modal>
      </Stack>  
    </Stack>
  );
};

export default NavBar;
