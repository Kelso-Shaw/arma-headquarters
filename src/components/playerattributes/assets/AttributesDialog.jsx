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

const AttributesDialog = ({
	open,
	handleClose,
	attribute,
	setAttribute,
	handleSave,
}) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>
			{attribute?.id ? "Edit Attribute" : "Add New Attribute"}
		</DialogTitle>
		<DialogContent>
			<DialogContentText>
				{attribute?.id
					? "Edit the details of the attribute."
					: "Enter details of the new attribute."}
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Attribute Name"
				type="text"
				fullWidth
				value={attribute?.attribute ?? ""}
				onChange={(e) =>
					setAttribute({ ...attribute, attribute: e.target.value })
				}
			/>
			<TextField
				margin="dense"
				id="description"
				label="Description"
				type="text"
				fullWidth
				value={attribute?.description ?? ""}
				onChange={(e) =>
					setAttribute({ ...attribute, description: e.target.value })
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

export default AttributesDialog;
