import { Grid } from "@mui/material";
import React from "react";
import { useAuth } from "../AuthContext";
import Layout from "../layouts/Layout";
import DashboardGrid from "./assets/DashboardGrid";

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
