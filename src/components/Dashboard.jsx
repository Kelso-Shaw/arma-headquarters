import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
	return (
		<Grid container spacing={3} justifyContent="center">
			<Grid item xs={12} sm={6} md={4}>
				<Paper
					sx={{
						padding: 2,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography variant="h6" gutterBottom textAlign="center">
						Admin Settings
					</Typography>

					<Button onClick={() => navigate("/dashboard/user-manager")}>
						User Manager
					</Button>
					<Button onClick={() => navigate("/dashboard/player-manager")}>
						Player Manager
					</Button>
					<Button onClick={() => navigate("/dashboard/rank-manager")}>
						Rank Manager
					</Button>
					<Button onClick={() => navigate("/dashboard/player-attributes")}>
						Player Attributes
					</Button>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Paper
					sx={{
						padding: 2,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography variant="h6" gutterBottom textAlign="center">
						Mission Editor
					</Typography>
					<Button>Events</Button>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
