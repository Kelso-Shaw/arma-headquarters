import { Grid } from "@mui/material";
import React from "react";
import DashboardGrid from "./dashboard/DashboardGrid";
import { useAuth } from "./AuthContext";
import Layout from "./layouts/Layout";

const Dashboard = () => {
	const { auth } = useAuth();
	return (
		<Layout hideButton={1}>
			<Grid container spacing={3} justifyContent="center">
				<DashboardGrid auth={auth} />
			</Grid>
		</Layout>
	);
};

export default Dashboard;
