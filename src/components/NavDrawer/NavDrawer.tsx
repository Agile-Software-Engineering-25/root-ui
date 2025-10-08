import { Button, Drawer, IconButton, List, ListItem, ListItemButton, Stack } from "@mui/joy";
import { Person } from "@mui/icons-material";
import { Notifications, Menu } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import provadisIcon from "@assets/provadis-icon.svg";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import { useState } from "react";
import { Modal } from "@agile-software/shared-components";
import useUser from "../../hooks/useUser";

const NavBar = ({navBarElements}) => {
	const navigate = useNavigate();
	const auth = useAuth();
	const user = useUser();
	const [openUserModal, setOpenUserModal] = useState(false);
	const [isDrawerExpanded, setDrawerExpanded] = useState(false);

	const onItemClick = (path: string) => {
		navigate(path);
		setDrawerExpanded(false);
	};

	return (
		<Stack direction="row" component="nav" alignItems="center" justifyContent="space-between" width="100%">
			<Drawer open={isDrawerExpanded} onClose={() => setDrawerExpanded(false)} sx={{}}>
				<List>
					<ListItem>
						<ListItemButton onClick={()=>onItemClick("/")}>Home</ListItemButton>
					</ListItem>
					{navBarElements.map((element) => (
						<ListItem key={element.name} nested>
							<ListItemButton onClick={()=>onItemClick(element.path)}>{element.name}</ListItemButton>
							{element.children &&
								element.children.map((child) => (
									<List key={child.name} sx={{ mx: 1 }}>
										<ListItem>
											<ListItemButton onClick={()=>onItemClick(child.path)}>{child.name}</ListItemButton>
										</ListItem>
									</List>
								))}
						</ListItem>
					))}
				</List>
			</Drawer>

			<IconButton onClick={() => setDrawerExpanded(true)} key={"drawer"} color={"primary"} variant={"plain"}>
				<Menu />
			</IconButton>

			<img src={provadisIcon} alt={"Provadis Logo"} style={{ height: "36px", cursor: "pointer" }} onClick={() => navigate("/")} />

			<Stack direction="row" spacing={3} alignItems="center">
				{/* Notice bell modal */}
				<IconButton key={"bell-button"} color={"primary"} variant={"plain"}>
					<Notifications />
				</IconButton>

				{/* User data and logout modal */}
				<IconButton onClick={() => setOpenUserModal(true)} key={"logout-button"} color={"primary"} variant={"plain"}>
					<Person />
				</IconButton>
				<Modal header="User Information" open={openUserModal} setOpen={setOpenUserModal} disableEscape={false}>
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
						<Button
							onClick={() => {
								auth.signoutRedirect().catch((e) => {
									console.error(e);
									enqueueSnackbar("Couldn't logout. Please try again.", { variant: "error" });
								});
							}}
						>
							Logout
						</Button>
						<Button
							onClick={() => {
								const token = user.getAccessToken();
								if (token) {
									navigator.clipboard
										.writeText(token)
										.then(() => enqueueSnackbar("Token copied to clipboard!", { variant: "success" }))
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
