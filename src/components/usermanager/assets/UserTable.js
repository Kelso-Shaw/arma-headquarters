import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const getRoleName = (role) => {
	switch (Number(role)) {
		case 1:
			return "User";
		case 2:
			return "Editor";
		case 3:
			return "Admin";
		default:
			return "Unknown";
	}
};

const UserTable = ({ users, handleOpen, handleDelete }) => (
	<TableContainer component={Paper} style={{ marginTop: 20 }}>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Email</TableCell>
					<TableCell>Role</TableCell>
					<TableCell align="right">Actions</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{getRoleName(user.role)}</TableCell>
						<TableCell align="right">
							<IconButton color="primary" onClick={() => handleOpen(user)}>
								<Edit />
							</IconButton>
							<IconButton color="error" onClick={() => handleDelete(user.id)}>
								<Delete />
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);

export default UserTable;
