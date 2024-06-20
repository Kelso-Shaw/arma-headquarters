import { Delete, Edit } from "@mui/icons-material";
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
import { useState } from "react";

const PlayerTable = ({ players, handleOpen, handleDelete }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedPlayers = players?.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage,
	);
	console.log(paginatedPlayers);
	return (
		<TableContainer component={Paper} style={{ marginTop: 20 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Username</TableCell>
						<TableCell>Squad(s)</TableCell>
						<TableCell>Rank</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedPlayers?.map((player) => (
						<TableRow key={player.id}>
							<TableCell>{player.username}</TableCell>
							<TableCell>
								{player.squads.length > 0
									? player.squads.map((squad, index) =>
											squad.name.length > 0 ? (
												<span
													key={squad.id}
												>{`${(index ? ", " : "") + squad.name}`}</span>
											) : (
												<span key={squad.id}>None </span>
											),
										)
									: "None"}
							</TableCell>
							<TableCell>{player.rank}</TableCell>
							<TableCell align="right">
								<IconButton color="primary" onClick={() => handleOpen(player)}>
									<Edit />
								</IconButton>
								<IconButton
									color="error"
									onClick={() => handleDelete(player.id)}
								>
									<Delete sx={{ color: "primary.error" }} />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={players?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

export default PlayerTable;
