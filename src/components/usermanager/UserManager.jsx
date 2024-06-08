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
	const [newUser, setUser] = useState({
		name: "",
		role: "",
		password: null,
	});
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
			setUser({ name: user.name, role: user.role });
		} else {
			setUser({ name: "", role: "" });
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedUser(null);
		setUser({ name: "", email: "" });
	};
	if (auth.role < 2) {
		return "You are not supposed to be here";
	}
	const handleSave = async () => {
		try {
			const method = selectedUser ? "POST" : "PUT";
			const url = selectedUser ? `users/${selectedUser.id}` : "users";
			const requestBody = {
				name: newUser.name,
				role: newUser.role,
			};

			if (newUser.password) {
				requestBody.password = newUser.password;
			}

			await apiRequest(url, method, requestBody, auth.token || null);

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
