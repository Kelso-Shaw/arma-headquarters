import { Button, Typography } from "@mui/material";
import React from "react";

export const FormButton = () => {
	return (
		<Button
			type="submit"
			fullWidth
			variant="contained"
			sx={{
				mt: 3,
				mb: 2,
				bgcolor: "primary",
				"&:hover": {
					bgcolor: "primary.accent",
				},
			}}
		>
			<Typography>Sign In</Typography>
		</Button>
	);
};
