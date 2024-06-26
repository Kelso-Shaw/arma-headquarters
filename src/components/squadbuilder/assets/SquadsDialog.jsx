import { Delete } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import React from "react";

const SquadsDialog = ({
	open,
	handleClose,
	selectedSquad,
	squad,
	setSquad,
	handleSave,
	handleRoleChange,
	handleAddRole,
	handleDeleteRole,
	players,
}) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>{selectedSquad ? "Edit Squad" : "Add New Squad"}</DialogTitle>
		<DialogContent>
			<DialogContentText>
				{selectedSquad
					? "Edit the details of the squad."
					: "Enter details of the new squad."}
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				label="Squad Name"
				type="text"
				fullWidth
				value={squad.name}
				onChange={(e) => setSquad({ ...squad, name: e.target.value })}
			/>
			<TableContainer component={Paper} style={{ marginTop: 20 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Role</TableCell>
							<TableCell>Assigned</TableCell>
							<TableCell>Order</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{squad.roles.map((role, index) => (
							<TableRow key={role.id}>
								<TableCell>
									<TextField
										fullWidth
										value={role.role}
										onChange={(e) =>
											handleRoleChange(index, "role", e.target.value)
										}
									/>
								</TableCell>
								<TableCell>
									<FormControl fullWidth>
										<Select
											value={role.assigned ?? null}
											onChange={(e) =>
												handleRoleChange(index, "assigned", e.target.value)
											}
											displayEmpty
										>
											<MenuItem value={null}>
												<em>None</em>
											</MenuItem>
											{players.map((player) => (
												<MenuItem key={player.id} value={player.id}>
													{player.username}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</TableCell>
								<TableCell>
									<TextField
										fullWidth
										type="number"
										InputProps={{ inputProps: { min: 1 } }}
										value={role.order}
										onChange={(e) =>
											handleRoleChange(
												index,
												"order",
												Number.parseInt(e.target.value, 10),
											)
										}
									/>
								</TableCell>
								<TableCell align="right">
									<IconButton
										color="error"
										onClick={() => handleDeleteRole(index)}
									>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button onClick={handleAddRole} color="primary" style={{ marginTop: 10 }}>
				Add Role
			</Button>
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

export default SquadsDialog;
