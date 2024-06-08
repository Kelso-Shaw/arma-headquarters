import { Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../funcs/common";
import { fetchUsersHelper } from "../funcs/common/fetchUsersHelper";
import UserDialog from "./assets/UserDialog";
import UserTable from "./assets/UserTable";

const UserManager = () => {
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [newUser, setUser] = useState({ name: "", email: "", role: "" });
	const { auth } = useAuth();

	const fetchUsers = useCallback(async () => {
		try {
			const usersData = await fetchUsersHelper(auth.token);
			setUsers(usersData);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleOpen = (user = null) => {
		setSelectedUser(user);
		if (user) {
			setUser({ name: user.name, email: user.email, role: user.role });
		} else {
			setUser({ name: "", email: "", role: "User" });
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedUser(null);
		setUser({ name: "", email: "" });
	};

	const handleSave = async () => {
		try {
			const method = selectedUser ? "POST" : "PUT";
			const url = selectedUser ? `users/${selectedUser.id}` : "users";

			await apiRequest(
				url,
				method,
				{ name: newUser.name, email: newUser.email, role: newUser.role },
				auth.token || null,
			);

			await fetchUsers();
			handleClose();
		} catch (error) {
			console.error("Error saving user:", error);
		}
	};

	const handleDelete = async (userId) => {
		try {
			const response = await apiRequest(
				`users/${userId}`,
				"DELETE",
				"",
				auth.token || null,
			);
			if (!response.Success) {
				throw new Error(response.message);
			}
			await fetchUsers();
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				User Manager
			</Typography>
			<Button variant="contained" color="primary" onClick={() => handleOpen()}>
				Add New User
			</Button>
			<UserTable
				users={users}
				handleOpen={handleOpen}
				handleDelete={handleDelete}
			/>
			<UserDialog
				open={open}
				handleClose={handleClose}
				selectedUser={selectedUser}
				user={newUser}
				setUser={setUser}
				handleSave={handleSave}
			/>
		</Container>
	);
};

export default UserManager;
