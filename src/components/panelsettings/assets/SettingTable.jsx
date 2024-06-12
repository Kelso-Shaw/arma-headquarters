import {
	Checkbox,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";

const SettingsTable = ({ settings, onStatusChange }) => {
	const handleStatusChange = (id, currentStatus) => {
		const newStatus = !currentStatus;
		onStatusChange(id, newStatus);
	};

	return (
		<TableContainer component={Paper} style={{ marginTop: 20 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Setting</TableCell>
						<TableCell>Desription</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{settings.map((setting) => (
						<TableRow key={setting.id}>
							<TableCell>{setting.setting}</TableCell>
							<TableCell>{setting.description}</TableCell>
							<TableCell>
								<Checkbox
									checked={!!setting.status}
									onChange={() =>
										handleStatusChange(setting.id, setting.status)
									}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SettingsTable;
