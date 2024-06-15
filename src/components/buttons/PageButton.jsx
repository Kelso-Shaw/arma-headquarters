import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const PageButton = ({ item, checkPermission, navigate, auth }) => {
	const [hasPermission, setHasPermission] = useState(null);
	console.log(auth);

	useEffect(() => {
		const fetchPermission = async () => {
			const permission = await checkPermission(item.url);
			setHasPermission(permission);
		};
		fetchPermission();
	}, [item, checkPermission]);

	if (hasPermission === null) {
		return null;
	}

	if (!hasPermission) {
		return null;
	}

	return (
		<Button onClick={() => navigate(item.url)} sx={{ marginBottom: 1 }}>
			{item.name}
		</Button>
	);
};

export default PageButton;
