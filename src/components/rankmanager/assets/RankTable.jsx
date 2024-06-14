import { Delete } from "@mui/icons-material";
import {
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
} from "@mui/material";
import React from "react";

const RankTable = ({ ranks, handleDelete, handleOrderChange }) => {
	const sortedRanks = [...ranks].sort((a, b) => a.order - b.order);
	return (
		<TableContainer component={Paper} style={{ marginTop: 20 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Rank</TableCell>
						<TableCell>Order</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedRanks.map((rank) => (
						<TableRow key={rank.id}>
							<TableCell>{rank.rank}</TableCell>
							<TableCell>
								<Select
									value={rank.order}
									onChange={(e) =>
										handleOrderChange(rank.id, Number.parseInt(e.target.value))
									}
									displayEmpty
									inputProps={{ "aria-label": "Without label" }}
								>
									{sortedRanks.map((r) => (
										<MenuItem key={r.id} value={r.order}>
											{r.order}
										</MenuItem>
									))}
								</Select>
							</TableCell>
							<TableCell align="right">
								<IconButton onClick={() => handleDelete(rank.id)}>
									<Delete sx={{ color: "primary.error" }} />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default RankTable;
