import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import React from "react";

const RankDialog = ({ open, handleClose, rank, setRank, handleSave }) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>Add New Rank</DialogTitle>
		<DialogContent>
			<DialogContentText>Enter details of the new rank.</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Rank Name"
				type="text"
				fullWidth
				value={rank.rank}
				onChange={(e) => setRank({ ...rank, rank: e.target.value })}
			/>
			<TextField
				margin="dense"
				id="order"
				label="Order"
				type="number"
				fullWidth
				value={rank.order}
				onChange={(e) =>
					setRank({ ...rank, order: Number.parseInt(e.target.value, 10) })
				}
			/>
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

export default RankDialog;
