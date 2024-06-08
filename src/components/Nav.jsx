import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ThemeButton from "./buttons/ThemeButton";

function Nav({ name }) {
	const { auth } = useAuth();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navigate = useNavigate();

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	const { logout } = useAuth();
	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const drawerList = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				<ListItemButton onClick={() => navigate("dashboard")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItemButton>
				<ListItemButton onClick={() => navigate("dashboard/panel-settings")}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="Settings" />
				</ListItemButton>
				<ListItemButton onClick={() => navigate("dashboard/user-manager")}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="User Manager" />
				</ListItemButton>
				{auth.isAuthenticated ? (
					<ListItemButton onClick={handleLogout}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItemButton>
				) : (
					""
				)}
			</List>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						color="text.title"
						sx={{ flexGrow: 1 }}
					>
						{name}
					</Typography>
					<ThemeButton />
				</Toolbar>
			</AppBar>
			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				{drawerList()}
			</Drawer>
		</Box>
	);
}

export default Nav;
