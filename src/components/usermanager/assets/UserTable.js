import { Delete, Edit, Security } from "@mui/icons-material";
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import React, { useState } from "react";

const getRoleName = (role) => {
	switch (Number(role)) {
		case 1:
			return "Admin";
		default:
			return "User";
	}
};

const UserTable = ({
	users,
	handleOpen,
	handleDelete,
	handlePermissionOpen,
}) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedUsers = users.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage,
	);

	return (
		<TableContainer component={Paper} style={{ marginTop: 20 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Username</TableCell>
						<TableCell align="right">Role</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedUsers.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.username}</TableCell>
							<TableCell align="right">{getRoleName(user.role)}</TableCell>
							<TableCell align="right">
								<IconButton color="primary" onClick={() => handleOpen(user)}>
									<Edit />
								</IconButton>
								<IconButton color="error" onClick={() => handleDelete(user.id)}>
									<Delete />
								</IconButton>
								<IconButton
									color="success"
									onClick={() => handlePermissionOpen(user)}
								>
									<Security />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={users.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

export default UserTable;
