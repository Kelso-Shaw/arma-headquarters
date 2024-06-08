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

const PlayerTable = ({ players, handleOpen, handleDelete }) => (
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
				{players.map((player) => (
					<TableRow key={player.id}>
						<TableCell>{player.username}</TableCell>
						<TableCell align="right">{player.role}</TableCell>
						<TableCell align="right">
							<IconButton color="primary" onClick={() => handleOpen(player)}>
								<Edit />
							</IconButton>
							<IconButton color="error" onClick={() => handleDelete(player.id)}>
								<Delete />
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);

export default PlayerTable;
