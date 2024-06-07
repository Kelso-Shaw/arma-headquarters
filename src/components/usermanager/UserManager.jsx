import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const UserManager = () => {
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [newUser, setNewUser] = useState({ name: "", email: "" });

	useEffect(() => {}, []);

	const handleOpen = (user = null) => {
		setSelectedUser(user);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedUser(null);
	};

	const handleSave = () => {
		if (selectedUser) {
		} else {
		}
		handleClose();
	};

	const handleDelete = (userId) => {};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Admin User Manager
			</Typography>
			<Button variant="contained" color="primary" onClick={() => handleOpen()}>
				Add New User
			</Button>
			<TableContainer component={Paper} style={{ marginTop: 20 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell align="right">
									<IconButton color="primary" onClick={() => handleOpen(user)}>
										<Edit />
									</IconButton>
									<IconButton
										color="secondary"
										onClick={() => handleDelete(user.id)}
									>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

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
						value={selectedUser ? selectedUser.name : newUser.name}
						onChange={(e) =>
							selectedUser
								? setSelectedUser({ ...selectedUser, name: e.target.value })
								: setNewUser({ ...newUser, name: e.target.value })
						}
					/>
					<TextField
						margin="dense"
						label="Email"
						type="email"
						fullWidth
						value={selectedUser ? selectedUser.email : newUser.email}
						onChange={(e) =>
							selectedUser
								? setSelectedUser({ ...selectedUser, email: e.target.value })
								: setNewUser({ ...newUser, email: e.target.value })
						}
					/>
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
		</Container>
	);
};

export default UserManager;
