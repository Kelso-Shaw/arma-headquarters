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
				<InputLabel>Role</InputLabel>
				<Select
					value={user.role || ""}
					onChange={(e) => setUser({ ...user, role: e.target.value })}
					label="Role"
				>
					<MenuItem value="" disabled>
						Select Role
					</MenuItem>
					<MenuItem value="1">Editor</MenuItem>
					<MenuItem value="2">Admin</MenuItem>
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

export default UserDialog;
