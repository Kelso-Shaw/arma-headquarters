import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import Layout from "../layouts/Layout";
import PermissionDialog from "./assets/PermissionDialog";
import UserDialog from "./assets/UserDialog";
import UserTable from "./assets/UserTable";

const UserManager = () => {
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);
	const [permissionOpen, setPermissionOpen] = useState(false);
	const [selectedEntity, setSelectedEntity] = useState(null);
	const [permissions, setPermissions] = useState([]);
	const [pages, setPages] = useState([]);

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
			console.error(error);
		}
	}, [auth.token]);

	const fetchPages = useCallback(async () => {
		try {
			const pagesData = await fetchHelper(auth.token, "pages");
			setPages(pagesData);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	const fetchUserPermissions = useCallback(
		async (userId) => {
			try {
				const permissionsData = await fetchHelper(
					auth.token,
					"permissions",
					userId,
				);
				setPermissions(permissionsData);
			} catch (error) {
				console.error(error);
			}
		},
		[auth.token],
	);

	useEffect(() => {
		fetchUsers();
		fetchPages();
	}, [fetchUsers, fetchPages]);

	const handleOpen = (entity = null) => {
		setSelectedEntity(entity);
		if (entity) {
			setNewEntity({ username: entity.username, role: entity.role });
		} else {
			setNewEntity({ username: "", role: "", password: null });
		}
		setOpen(true);
	};

	const handlePermissionOpen = (user) => {
		setSelectedEntity(user);
		fetchUserPermissions(user.id);
		setPermissionOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedEntity(null);
		setNewEntity({ username: "", role: "", password: null });
	};

	const handlePermissionClose = () => {
		setPermissionOpen(false);
		setSelectedEntity(null);
		setPermissions([]);
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

	const handlePermissionChange = async (pageId, canAccess) => {
		try {
			const url = `permissions/${selectedEntity.id}/${pageId}`;
			const requestBody = { canAccess };
			await apiRequest(url, "POST", requestBody, auth.token || null);
			fetchUserPermissions(selectedEntity.id);
		} catch (error) {
			console.error("Error updating permission:", error);
		}
	};

	if (auth.role < 2) {
		return "You are not supposed to be here";
	}

	return (
		<Layout
			title="User Manager"
			buttonName="Add New User"
			buttonOnClick={() => handleOpen()}
		>
			<UserTable
				users={users}
				handleOpen={(user) => handleOpen(user)}
				handleDelete={(id) => handleDelete(id)}
				handlePermissionOpen={(user) => handlePermissionOpen(user)}
			/>
			<UserDialog
				open={open}
				handleClose={handleClose}
				selectedUser={selectedEntity}
				user={newEntity}
				setUser={setNewEntity}
				handleSave={handleSave}
			/>
			<PermissionDialog
				open={permissionOpen}
				handleClose={handlePermissionClose}
				pages={pages}
				permissions={permissions}
				handlePermissionChange={handlePermissionChange}
			/>
		</Layout>
	);
};

export default UserManager;
