import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	Checkbox,
	Button,
} from "@mui/material";

const PermissionDialog = ({
	open,
	handleClose,
	pages,
	permissions,
	handlePermissionChange,
}) => {
	const getPermission = (pageId) => {
		const permission = permissions.find((perm) => perm.page_id === pageId);
		return permission ? permission.can_access : false;
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Manage Permissions</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Toggle the permissions for the selected user.
				</DialogContentText>
				{pages && pages.length > 0 ? (
					pages.map((page) => (
						<FormControlLabel
							key={page.id}
							control={
								<Checkbox
									checked={getPermission(page.id)}
									onChange={(e) =>
										handlePermissionChange(page.id, e.target.checked)
									}
								/>
							}
							label={page.name}
						/>
					))
				) : (
					<DialogContentText>No pages available</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PermissionDialog;
