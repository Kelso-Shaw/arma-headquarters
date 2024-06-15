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

const SquadsTable = ({ squads, handleDelete, handleEdit, players }) => {
	const getPlayerNameById = (id) => {
		const player = players.find((player) => player.id === id);
		return player ? player.username : "Unknown";
	};

	return (
		<TableContainer component={Paper} style={{ marginTop: 20 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Squad</TableCell>
						<TableCell>Lead</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{squads.map((squad) => (
						<TableRow key={squad.id}>
							<TableCell>{squad.name}</TableCell>
							<TableCell>
								{squad.roles.length > 0
									? getPlayerNameById(squad.roles[0].assigned)
									: "No Leader"}
							</TableCell>
							<TableCell align="right">
								<IconButton color="primary" onClick={() => handleEdit(squad)}>
									<Edit />
								</IconButton>
								<IconButton
									color="error"
									onClick={() => handleDelete(squad.name)}
								>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SquadsTable;
