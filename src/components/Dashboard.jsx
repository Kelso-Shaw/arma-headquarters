import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6} md={4}>
				<Paper sx={{ padding: 2 }}>
					<Typography variant="h6" gutterBottom>
						Widget 1
					</Typography>
					<Typography>Content for Widget 1</Typography>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Paper sx={{ padding: 2 }}>
					<Typography variant="h6" gutterBottom>
						Widget 2
					</Typography>
					<Typography>Content for Widget 2</Typography>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Paper sx={{ padding: 2 }}>
					<Typography variant="h6" gutterBottom>
						Widget 3
					</Typography>
					<Typography>Content for Widget 3</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
