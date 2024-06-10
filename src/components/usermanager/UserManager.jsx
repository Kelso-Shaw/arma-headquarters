import { Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { AddButtonTable } from "../buttons/AddButtonTable";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import UserDialog from "./assets/UserDialog";
import UserTable from "./assets/UserTable";

const UserManager = () => {
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedEntity, setSelectedEntity] = useState(null);

	const [newEntity, setNewEntity] = useState({
		username: "",
		role: "",
		password: null,
	});

	const { auth } = useAuth();

	const fetchUsers = useCallback(async () => {
		try {
			const usersData = await fetchHelper(auth.token, "users");
			setUsers(usersData);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleOpen = (entity = null) => {
		setSelectedEntity(entity);
		if (entity) {
			setNewEntity({ username: entity.username, role: entity.role });
		} else {
			setNewEntity({ username: "", role: "", password: null });
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedEntity(null);
		setNewEntity({ username: "", role: "", password: null });
	};

	const handleSave = async () => {
		try {
			const method = selectedEntity ? "POST" : "PUT";
			const url = selectedEntity ? `users/${selectedEntity.id}` : "users";
			const requestBody = {
				username: newEntity.username,
				role: newEntity.role,
			};

			if (newEntity.password) {
				requestBody.password = newEntity.password;
			}

			await apiRequest(url, method, requestBody, auth.token || null);
			await fetchUsers();
			handleClose();
		} catch (error) {
			console.error("Error saving user:", error);
		}
	};

	const handleDelete = async (entityId) => {
		try {
			const response = await apiRequest(
				`users/${entityId}`,
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

	if (auth.role < 2) {
		return "You are not supposed to be here";
	}

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography variant="h4" gutterBottom>
				User Manager
			</Typography>
			<AddButtonTable text={"Add New User"} onClick={() => handleOpen(null)} />
			<UserTable
				users={users}
				handleOpen={(user) => handleOpen(user)}
				handleDelete={(id) => handleDelete(id)}
			/>
			<UserDialog
				open={open}
				handleClose={handleClose}
				selectedUser={selectedEntity}
				user={newEntity}
				setUser={setNewEntity}
				handleSave={handleSave}
			/>
		</Container>
	);
};

export default UserManager;
