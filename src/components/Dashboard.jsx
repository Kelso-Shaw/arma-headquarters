import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import DashboardGrid from "./dashboard/DashboardGrid";
import { useAuth } from "./AuthContext";

const Dashboard = () => {
	const { auth } = useAuth();
	return (
		<Grid container spacing={3} justifyContent="center">
			<DashboardGrid auth={auth} />
		</Grid>
	);
};

export default Dashboard;
