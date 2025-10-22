import { Box, Drawer, IconButton, List, ListItem, ListItemButton } from "@mui/joy";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";

const NavBar = ({ navBarElements }) => {
	const navigate = useNavigate();
	const [isDrawerExpanded, setDrawerExpanded] = useState(false);

	const onItemClick = (path: string) => {
		navigate(path);
		setDrawerExpanded(false);
	};

	return (
		<Box>
			<Drawer open={isDrawerExpanded} onClose={() => setDrawerExpanded(false)} sx={{}}>
				<List>
					<ListItem>
						<ListItemButton onClick={() => onItemClick("/")}>Home</ListItemButton>
					</ListItem>
					{navBarElements.map((element) => (
						<ListItem key={element.name} nested>
							<ListItemButton onClick={() => onItemClick(element.path)}>{element.name}</ListItemButton>
							{element.children &&
								element.children.map((child) => (
									<List key={child.name} sx={{ mx: 1 }}>
										<ListItem>
											<ListItemButton onClick={() => onItemClick(child.path)}>{child.name}</ListItemButton>
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
		</Box>
	);
};

export default NavBar;
