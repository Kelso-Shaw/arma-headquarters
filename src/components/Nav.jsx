import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import ThemeButton from "./buttons/ThemeButton";

import { useAuth } from "./AuthContext";
import Logout from "./buttons/Logout";

function Nav({ name }) {
	const { auth } = useAuth();
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
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{name}
					</Typography>
					{auth.isAuthenticated ? <Logout /> : ""}
					<ThemeButton />
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Nav;
