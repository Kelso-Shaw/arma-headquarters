import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React from "react";

const PlayerDialog = ({
	open,
	handleClose,
	selectedPlayer,
	player,
	setPlayer,
	handleSave,
}) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>
			{selectedPlayer ? "Edit Player" : "Add New Player"}
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
				{selectedPlayer
					? "Edit the details of the player."
					: "Enter details of the new player."}
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				label="Username"
				type="text"
				fullWidth
				value={player.username}
				onChange={(e) => setPlayer({ ...player, username: e.target.value })}
			/>
			<TextField
				autoFocus
				margin="dense"
				label="Password"
				type="password"
				fullWidth
				value={player.password}
				onChange={(e) => setPlayer({ ...player, password: e.target.value })}
			/>
			<FormControl fullWidth margin="dense" sx={{ width: 120 }}>
				<InputLabel>Role</InputLabel>
				<Select
					value={player.role || ""}
					onChange={(e) => setPlayer({ ...player, role: e.target.value })}
					label="Role"
				>
					<MenuItem value="" disabled>
						Select Role
					</MenuItem>
					<MenuItem value="Private">Private</MenuItem>
					<MenuItem value="Corporal">Corporal</MenuItem>
				</Select>
			</FormControl>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose} color="primary">
				Cancel
			</Button>
			<Button onClick={handleSave} color="primary">
				Save
			</Button>
		</DialogActions>
	</Dialog>
);

export default PlayerDialog;
