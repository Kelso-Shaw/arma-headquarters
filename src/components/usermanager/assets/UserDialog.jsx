import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	TextField,
} from "@mui/material";
import React from "react";

const UserDialog = ({
	open,
	handleClose,
	selectedUser,
	user,
	setUser,
	handleSave,
}) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
		<DialogContent>
			<DialogContentText>
				{selectedUser
					? "Edit the details of the user."
					: "Enter details of the new user."}
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				label="Username"
				type="text"
				fullWidth
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
			/>
			<TextField
				autoFocus
				margin="dense"
				label="Password"
				type="password"
				fullWidth
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>
			<FormControl fullWidth margin="dense" sx={{ width: 120 }}>
				<FormControlLabel
					control={
						<Checkbox
							checked={user.role === 1}
							onChange={(e) =>
								setUser({ ...user, role: e.target.checked ? 1 : 0 })
							}
							name="role"
							color="primary"
						/>
					}
					label="Admin"
				/>
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

export default UserDialog;
