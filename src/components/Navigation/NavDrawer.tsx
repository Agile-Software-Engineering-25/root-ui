import {
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
} from "@mui/joy";
import { Menu, SubdirectoryArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { NavBarElement } from "./Navigation";

const NavBar = ({ navBarElements }: { navBarElements: NavBarElement[] }) => {
	const navigate = useNavigate();
	const [isDrawerExpanded, setDrawerExpanded] = useState(false);

	const onItemClick = (path?: string) => {
		if (!path) return;
		navigate(path);
		setDrawerExpanded(false);
	};

	return (
		<Box>
			<Drawer
				open={isDrawerExpanded}
				onClose={() => setDrawerExpanded(false)}
			>
				<List>
					<ListItem>
						<ListItemButton onClick={() => onItemClick("/")}>
							Home
						</ListItemButton>
					</ListItem>
					{navBarElements.map((element) => (
						<ListItem key={element.name} nested>
							<ListItemButton 
								onClick={() => onItemClick(element.path)}
								sx={element.path ? {} : {backgroundColor: "#98989826"}}
							>
								{element.name}
							</ListItemButton>
							{element.children &&
								element.children.map((child) => (
									<List key={child.name} sx={{ mx: 1 }}>
										<ListItem>
											<ListItemButton onClick={() => onItemClick(child.path)}>
												<SubdirectoryArrowRight />
												{child.name}
											</ListItemButton>
										</ListItem>
									</List>
								))}
						</ListItem>
					))}
				</List>
			</Drawer>

			<IconButton
				onClick={() => setDrawerExpanded(true)}
				key={"drawer"}
				color={"primary"}
				variant={"plain"}
			>
				<Menu />
			</IconButton>
		</Box>
	);
};

export default NavBar;
