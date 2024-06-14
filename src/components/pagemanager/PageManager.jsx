import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import Layout from "../layouts/Layout";
import PageDialog from "./assets/PageDialog";
import PageTable from "./assets/PageTable";

const PageManager = () => {
	const [pages, setPages] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedPage, setSelectedPage] = useState(null);

	const [newPage, setNewPage] = useState({
		name: "",
		url: "",
		category: "",
	});

	const { auth } = useAuth();

	const fetchPages = useCallback(async () => {
		try {
			const pagesData = await fetchHelper(auth.token, "pages");
			setPages(pagesData);
		} catch (error) {
			console.error("Error fetching pages:", error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchPages();
	}, [fetchPages]);

	const handleOpen = (page = null) => {
		setSelectedPage(page);
		if (page) {
			setNewPage({
				name: page.name,
				url: page.url,
				category: page.category,
			});
		} else {
			setNewPage({ name: "", url: "", category: "" });
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedPage(null);
		setNewPage({ name: "", url: "", category: "" });
	};

	const handleSave = async () => {
		try {
			const method = selectedPage ? "POST" : "PUT";
			const url = selectedPage ? `pages/${selectedPage.id}` : "pages";
			const requestBody = {
				id: selectedPage?.id,
				name: newPage.name,
				url: newPage.url,
				category: newPage.category,
			};

			await apiRequest(url, method, requestBody, auth.token || null);
			await fetchPages();
			handleClose();
		} catch (error) {
			console.error("Error saving page:", error);
		}
	};

	const handleDelete = async (pageId) => {
		try {
			const response = await apiRequest(
				`pages/${pageId}`,
				"DELETE",
				"",
				auth.token || null,
			);
			if (!response.success) {
				throw new Error(response.message);
			}
			await fetchPages();
		} catch (error) {
			console.error("Error deleting page:", error);
		}
	};

	return (
		<Layout
			title="Page Manager"
			buttonName="Add New Page"
			buttonOnClick={() => handleOpen()}
		>
			<PageTable
				pages={pages}
				handleOpen={(page) => handleOpen(page)}
				handleDelete={(id) => handleDelete(id)}
			/>
			<PageDialog
				open={open}
				handleClose={handleClose}
				selectedPage={selectedPage}
				page={newPage}
				setPage={setNewPage}
				handleSave={handleSave}
			/>
		</Layout>
	);
};

export default PageManager;
