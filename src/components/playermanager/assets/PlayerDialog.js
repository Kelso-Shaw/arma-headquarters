import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	Chip,
	Box,
} from "@mui/material";

const PlayerDialog = ({
	open,
	handleClose,
	selectedPlayer,
	player,
	setPlayer,
	handleSave,
	ranks,
	attributes,
}) => {
	const handleAttributeChange = (event) => {
		const {
			target: { value },
		} = event;
		setPlayer((prev) => ({
			...prev,
			attributes: typeof value === "string" ? value.split(",") : value,
		}));
	};

	const sortedRanks = ranks.sort((a, b) => a.order - b.order);

	const handlerankChange = (event) => {
		const {
			target: { value },
		} = event;
		setPlayer((prev) => ({
			...prev,
			rank: value,
		}));
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>{selectedPlayer ? "Edit Player" : "Add Player"}</DialogTitle>
			<DialogContent>
				<InputLabel>Username</InputLabel>
				<TextField
					margin="dense"
					type="text"
					fullWidth
					value={player.username}
					onChange={(e) => setPlayer({ ...player, username: e.target.value })}
				/>
				<InputLabel>Password</InputLabel>
				<TextField
					margin="dense"
					type="password"
					fullWidth
					value={player.password || ""}
					onChange={(e) => setPlayer({ ...player, password: e.target.value })}
				/>
				<InputLabel>Rank</InputLabel>
				<Select fullWidth value={player.rank} onChange={handlerankChange}>
					{sortedRanks.map((rank) => (
						<MenuItem key={rank.id} value={rank.rank}>
							{rank.rank}
						</MenuItem>
					))}
				</Select>
				<InputLabel>Attributes</InputLabel>
				<Select
					sx={{
						marginBottom: 5,
					}}
					fullWidth
					multiple
					value={player.attributes}
					onChange={handleAttributeChange}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap" }}>
							{selected.map((value) => (
								<Chip
									key={value}
									label={
										attributes.find((a) => a.id === value)?.attribute || ""
									}
								/>
							))}
						</Box>
					)}
				>
					{attributes.map((attr) => (
						<MenuItem key={attr.id} value={attr.id}>
							{attr.attribute}
						</MenuItem>
					))}
				</Select>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave}>
					{selectedPlayer ? "Update" : "Add"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PlayerDialog;
