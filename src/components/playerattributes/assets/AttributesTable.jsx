import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
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

const AttributeTable = ({ attributes, handleDelete, handleOpen }) => {
	return (
		<TableContainer component={Paper} style={{ marginTop: 20 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Attribute</TableCell>
						<TableCell>Description</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{attributes.map((a) => (
						<TableRow key={a.id}>
							<TableCell>{a.attribute}</TableCell>
							<TableCell>{a.description}</TableCell>
							<TableCell align="right">
								<IconButton color="primary" onClick={() => handleOpen(a)}>
									<Edit />
								</IconButton>
								<IconButton onClick={() => handleDelete(a.id)}>
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

export default AttributeTable;
