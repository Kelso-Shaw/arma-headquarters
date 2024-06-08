import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";

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
				label="Name"
				type="text"
				fullWidth
				value={user.name}
				onChange={(e) => setUser({ ...user, name: e.target.value })}
			/>
			<TextField
				margin="dense"
				label="Email"
				type="email"
				fullWidth
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
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
					<MenuItem value="1">User</MenuItem>
					<MenuItem value="2">Editor</MenuItem>
					<MenuItem value="3">Admin</MenuItem>
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
