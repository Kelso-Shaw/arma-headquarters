import React, { useState, useCallback, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchHelper } from "../../funcs/common/fetchHelper";
import { apiRequest } from "../../funcs/common/apiRequest";
import PageButton from "../../buttons/PageButton";

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
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchPages();
	}, [fetchPages]);

	if (!pages) {
		return null;
	}

	const checkPermission = async (pageUrl) => {
		try {
			const response = await apiRequest(
				"permissions/check",
				"POST",
				{
					userId: auth.id,
					pageUrl: pageUrl,
				},
				auth.token,
			);
			return response.success;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	return (
		<>
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
							<PageButton
								auth={auth}
								key={item.url}
								item={item}
								checkPermission={checkPermission}
								navigate={navigate}
							/>
						))}
					</Paper>
				</Grid>
			))}
		</>
	);
};

export default DashboardGrid;
