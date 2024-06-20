import { Button } from "@mui/material";

export const AddButtonTable = ({ text, onClick }) => {
	return (
		<Button
			variant="contained"
			color="primary"
			onClick={onClick}
			sx={{
				alignSelf: "flex-end",
				width: "fit-content",
				"&:hover": {
					bgcolor: "primary.accent",
				},
			}}
		>
			{text}
		</Button>
	);
};
