import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import React from "react";

const PageDialog = ({
	open,
	handleClose,
	selectedPage,
	page,
	setPage,
	handleSave,
}) => {
	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>
				{selectedPage ? `Editing Page: ${page.name}` : "Add New Page"}
			</DialogTitle>
			<DialogContent>
				<TextField
					label="Name"
					margin="dense"
					type="text"
					fullWidth
					value={page.name}
					onChange={(e) => setPage({ ...page, name: e.target.value })}
				/>
				<TextField
					label="URL"
					margin="dense"
					type="text"
					fullWidth
					value={page.url}
					onChange={(e) => setPage({ ...page, url: e.target.value })}
				/>
				<TextField
					label="Category"
					margin="dense"
					type="text"
					fullWidth
					value={page.category}
					onChange={(e) => setPage({ ...page, category: e.target.value })}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave}>{selectedPage ? "Update" : "Add"}</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PageDialog;
