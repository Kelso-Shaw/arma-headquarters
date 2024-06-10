import { Container, Typography } from "@mui/material";
import React from "react";
import { AddButtonTable } from "../buttons/AddButtonTable";

const Layout = ({ children, title, buttonName, buttonOnClick }) => {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography variant="h4" gutterBottom>
				{title}
			</Typography>
			<AddButtonTable text={buttonName} onClick={buttonOnClick} />
			{children}
		</Container>
	);
};

export default Layout;
