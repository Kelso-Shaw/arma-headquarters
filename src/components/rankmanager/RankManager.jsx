import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { AddButtonTable } from "../buttons/AddButtonTable";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import Layout from "../layouts/Layout";
import RankDialog from "./assets/RankDialog";
import RankTable from "./assets/RankTable";

const RankManager = () => {
	const { auth } = useAuth();
	const [ranks, setRanks] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedRank, setSelectedRank] = useState(null);

	const fetchRanks = useCallback(async () => {
		try {
			const rankData = await fetchHelper(auth.token, "ranks");
			setRanks(rankData);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchRanks();
	}, [fetchRanks]);

	const handleOpen = (rank = null) => {
		setSelectedRank(
			rank || { rank: "", order: Math.max(...ranks.map((r) => r.order)) + 1 },
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedRank(null);
	};

	const handleSave = async () => {
		try {
			const method = selectedRank?.id ? "POST" : "PUT";
			const url = selectedRank?.id ? `ranks/${selectedRank.id}` : "ranks";
			await apiRequest(url, method, selectedRank, auth.token);
			await fetchRanks();
			handleClose();
		} catch (error) {
			console.error("Error saving rank:", error);
		}
	};

	const handleDelete = async (rankId) => {
		try {
			const response = await apiRequest(
				`ranks/${rankId}`,
				"DELETE",
				"",
				auth.token || null,
			);
			if (!response.Success) {
				throw new Error(response.message);
			}
			await fetchRanks();
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	const handleOrderChange = async (id, newOrder) => {
		const originalRank = ranks.find((rank) => rank.id === id);
		const originalOrder = originalRank.order;

		if (originalOrder === newOrder) {
			return;
		}

		const increment = originalOrder > newOrder ? 1 : -1;

		try {
			const updatePromises = ranks
				.filter((rank) =>
					increment > 0
						? rank.order >= newOrder && rank.order < originalOrder
						: rank.order > originalOrder && rank.order <= newOrder,
				)
				.map((rank) => {
					return apiRequest(
						`ranks/${rank.id}`,
						"POST",
						{ ...rank, order: rank.order + increment },
						auth.token,
					);
				});

			updatePromises.push(
				apiRequest(
					`ranks/${id}`,
					"POST",
					{ ...originalRank, order: newOrder },
					auth.token,
				),
			);

			await Promise.all(updatePromises);
			await fetchRanks();
		} catch (error) {
			console.error("Error updating ranks:", error);
		}
	};

	return (
		<Layout
			title="Rank Manager"
			buttonName="Add New Rank"
			buttonOnClick={() => handleOpen()}
		>
			<RankTable
				ranks={ranks}
				handleDelete={handleDelete}
				handleOrderChange={handleOrderChange}
			/>
			{open && (
				<RankDialog
					open={open}
					handleClose={handleClose}
					rank={selectedRank}
					setRank={setSelectedRank}
					handleSave={handleSave}
				/>
			)}
		</Layout>
	);
};

export default RankManager;
