import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	Grid,
	Typography,
} from "@mui/material";
import React from "react";

const PermissionDialog = ({
	open,
	handleClose,
	pages,
	permissions,
	handlePermissionChange,
	selectedEntity,
}) => {
	const getPermission = (pageId) => {
		const permission = permissions.find((perm) => perm.page_id === pageId);
		return permission ? permission.can_access : false;
	};

	const groupedPages = pages.reduce((groups, page) => {
		const category = page.category || "Uncategorized";
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(page);
		return groups;
	}, {});
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle textAlign="center">Manage Permissions</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ marginBottom: 2 }} textAlign="center">
					Toggle the permissions for {selectedEntity?.username}
				</DialogContentText>
				{Object.keys(groupedPages).length > 0 ? (
					Object.keys(groupedPages).map((category) => (
						<Box key={category} mb={2}>
							<Typography textAlign="center" variant="h6">
								{category}
							</Typography>
							<Grid container spacing={2}>
								{groupedPages[category].map((page) => (
									<Grid item xs={12} sm={6} md={4} key={page.id}>
										<FormControlLabel
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
									</Grid>
								))}
							</Grid>
						</Box>
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
