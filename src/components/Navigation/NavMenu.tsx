import { Button, IconButton, Stack } from "@mui/joy";
import { Person } from "@mui/icons-material";
import { Notifications } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "react-oidc-context";
import { useState } from "react";
import { Modal } from "@agile-software/shared-components";
import useUser from "../../hooks/useUser";

const userCreds = [
	{ name: "User-ID", func: (user) => user.getUserId() },
	{ name: "Name", func: (user) => user.getFullName() },
	{ name: "E-Mail", func: (user) => user.getEmail() },
];

export default function PostNav() {
	const auth = useAuth();
	const user = useUser();
	const [openUserModal, setOpenUserModal] = useState(false);

	const logout = () => {
		auth.signoutRedirect().catch((e) => {
			console.error(e);
			enqueueSnackbar("Couldn't logout. Please try again.", { variant: "error" });
		});
	};

	const copyToken = () => {
		const token = user.getAccessToken();
		if (token) {
			navigator.clipboard
				.writeText(token)
				.then(() => enqueueSnackbar("Token copied to clipboard!", { variant: "success" }))
				.catch((e) => console.error(e));
		}
	};

	return (
		// <Stack direction="row" spacing={3} alignItems="center">
		<Stack sx={{width: "110px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
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
					{userCreds.map((cred) => (
						<Stack direction="row" spacing={1}>
							<span style={{ fontWeight: "bold", minWidth: "80px" }}>{cred.name}:</span>
							<span>{cred.func(user)}</span>
						</Stack>
					))}
				</Stack>
				<Stack direction={"row"} gap={2}>
					<Button onClick={logout}>Logout</Button>
					<Button onClick={copyToken} variant="outlined">
						Copy Token
					</Button>
				</Stack>
			</Modal>
		</Stack>
	);
}
