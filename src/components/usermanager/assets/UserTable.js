import { Delete, Edit } from "@mui/icons-material";
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";

const getRoleName = (role) => {
	switch (Number(role)) {
		case 1:
			return "Editor";
		case 2:
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
					<TableCell align="right">Role</TableCell>
					<TableCell align="right">Actions</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.name}</TableCell>
						<TableCell align="right">{getRoleName(user.role)}</TableCell>
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
