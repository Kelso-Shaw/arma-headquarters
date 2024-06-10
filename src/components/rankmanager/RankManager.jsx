import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { Container, Typography } from "@mui/material";

const RankManager = () => {
	const { auth } = useAuth();

	return (
		<Container>
			<Typography gutterBottom>RankManager</Typography>
		</Container>
	);
};

export default RankManager;
