import React, { useState, useCallback, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchHelper } from "../funcs/common/fetchHelper";

const DashboardGrid = ({ auth }) => {
	const [pages, setPages] = useState(null);
	const navigate = useNavigate();

	const fetchPages = useCallback(async () => {
		try {
			const pagesData = await fetchHelper(auth.token, "pages");
			const groupedPages = pagesData.reduce((acc, page) => {
				if (!acc[page.category]) {
					acc[page.category] = [];
				}
				acc[page.category].push(page);
				return acc;
			}, {});
			setPages(groupedPages);
			console.log(groupedPages);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchPages();
	}, [fetchPages]);

	if (!pages) {
		return <div>Loading...</div>;
	}

	return (
		<Grid container spacing={3}>
			{Object.keys(pages).map((category) => (
				<Grid item xs={12} sm={6} md={4} key={category}>
					<Paper
						sx={{
							padding: 2,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Typography variant="h6" gutterBottom textAlign="center">
							{category}
						</Typography>
						{pages[category].map((item) => (
							<Button
								key={item.url}
								onClick={() => navigate(item.url)}
								sx={{ marginBottom: 1 }}
							>
								{item.name}
							</Button>
						))}
					</Paper>
				</Grid>
			))}
		</Grid>
	);
};

export default DashboardGrid;
