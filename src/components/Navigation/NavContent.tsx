import { List, ListItem, ListItemButton } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function NavContent({ navBarElements }) {
	const navigate = useNavigate();
	const [currentItem, setCurrentItem] = useState(null);
	return (
		<List orientation="horizontal" sx={{ justifyContent: "space-between" }}>
			{navBarElements.map((element, index) => (
				<ListItem>
					<ListItemButton onClick={() => navigate(element.path)} onMouseEnter={() => setCurrentItem(element.children ? index : null)}>
						{element.name}
					</ListItemButton>
					{currentItem == index && (
						<List orientation="horizontal" onMouseLeave={() => setCurrentItem(null)} sx={{ width: "100vw", p: "10px", position: "fixed", left: "0", top: "69px", justifyContent: "center", gap: "20px", borderBottom: "1px solid #F3F8FF", backgroundColor: "#F3F8FF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", boxSizing: "border-box" }}>
							{element.children.map((child) => (
								<ListItem>
									<ListItemButton onClick={() => navigate(child.path)}>{child.name}</ListItemButton>
								</ListItem>
							))}
						</List>
					)}
				</ListItem>
			))}
		</List>
	);
}
