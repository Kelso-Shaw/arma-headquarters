import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import Layout from "../layouts/Layout";
import AttributesDialog from "./assets/AttributesDialog";
import AttributeTable from "./assets/AttributesTable";

const PlayerAttributes = () => {
	const { auth } = useAuth();
	const [attributes, setAttributes] = useState([]);
	const [selectedAttribute, setSelectedAttribute] = useState(null);
	const [open, setOpen] = useState(false);

	const fetchAttributes = useCallback(async () => {
		try {
			const attributeData = await fetchHelper(auth.token, "attributes");
			setAttributes(attributeData);
		} catch (error) {
			console.error("Error fetching attributes:", error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchAttributes();
	}, [fetchAttributes]);

	const handleOpen = (attribute = null) => {
		setSelectedAttribute(
			attribute || { id: null, attribute: "", description: "" },
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedAttribute(null);
	};

	const handleSave = async () => {
		try {
			const method = selectedAttribute.id ? "POST" : "PUT";
			const url = selectedAttribute.id
				? `attributes/${selectedAttribute.id}`
				: "attributes";
			const response = await apiRequest(
				url,
				method,
				selectedAttribute,
				auth.token,
			);
			if (response.success) {
				await fetchAttributes();
			} else {
				throw new Error(response.message);
			}
			handleClose();
		} catch (error) {
			console.error("Error saving attribute:", error);
		}
	};

	const handleDelete = async (attributeId) => {
		try {
			const response = await apiRequest(
				`attributes/${attributeId}`,
				"DELETE",
				"",
				auth.token,
			);
			if (!response.success) {
				throw new Error(response.message);
			}
			await fetchAttributes();
		} catch (error) {
			console.error("Error deleting attribute:", error);
		}
	};

	return (
		<Layout
			title="Player Attributes"
			buttonName="Add New Attribute"
			buttonOnClick={() => handleOpen()}
		>
			<AttributeTable
				attributes={attributes}
				handleOpen={handleOpen}
				handleDelete={handleDelete}
			/>
			<AttributesDialog
				open={open}
				handleClose={handleClose}
				attribute={selectedAttribute}
				setAttribute={setSelectedAttribute}
				handleSave={handleSave}
			/>
		</Layout>
	);
};

export default PlayerAttributes;
