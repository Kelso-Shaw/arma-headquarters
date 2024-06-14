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
import React, { useState } from "react";

const PageTable = ({ pages, handleOpen, handleDelete }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedPages = pages?.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage,
	);

	return (
		<TableContainer component={Paper} style={{ marginTop: 20 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>URL</TableCell>
						<TableCell>Category</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedPages?.map((page) => (
						<TableRow key={page.id}>
							<TableCell>{page.name}</TableCell>
							<TableCell>{page.url}</TableCell>
							<TableCell>{page.category}</TableCell>
							<TableCell align="right">
								<IconButton color="primary" onClick={() => handleOpen(page)}>
									<Edit />
								</IconButton>
								<IconButton color="error" onClick={() => handleDelete(page.id)}>
									<Delete />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[10, 15, 25]}
				component="div"
				count={pages?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

export default PageTable;
