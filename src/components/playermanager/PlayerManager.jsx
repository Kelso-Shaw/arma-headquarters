import { Container, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { AddButtonTable } from "../buttons/AddButtonTable";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import Layout from "../layouts/Layout";
import PlayerDialog from "./assets/PlayerDialog";
import PlayerTable from "./assets/PlayerTable";

const PlayerManager = () => {
	const [players, setPlayers] = useState([]);
	const [ranks, setRanks] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedEntity, setSelectedEntity] = useState(null);

	const [newEntity, setNewEntity] = useState({
		username: "",
		role: "",
		password: null,
	});

	const { auth } = useAuth();

	const fetchPlayers = useCallback(async () => {
		try {
			const playersData = await fetchHelper(auth.token, "players");
			setPlayers(playersData);
		} catch (error) {
			console.error("Error fetching players:", error);
		}
	}, [auth.token]);

	const fetchRanks = useCallback(async () => {
		try {
			const rankData = await fetchHelper(auth.token, "ranks");
			setRanks(rankData);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchPlayers();
		fetchRanks();
	}, [fetchPlayers, fetchRanks]);

	const handleOpen = (entity = null) => {
		setSelectedEntity(entity);
		if (entity) {
			setNewEntity({ username: entity.username, role: entity.role });
		} else {
			setNewEntity({ username: "", role: "", password: null });
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedEntity(null);
		setNewEntity({ username: "", role: "", password: null });
	};

	const handleSave = async () => {
		try {
			const method = selectedEntity ? "POST" : "PUT";
			const url = selectedEntity ? `players/${selectedEntity.id}` : "players";
			const requestBody = {
				username: newEntity.username,
				role: newEntity.role,
			};

			if (newEntity.password) {
				requestBody.password = newEntity.password;
			}

			await apiRequest(url, method, requestBody, auth.token || null);
			await fetchPlayers();
			handleClose();
		} catch (error) {
			console.error("Error saving player:", error);
		}
	};

	const handleDelete = async (entityId) => {
		try {
			const response = await apiRequest(
				`players/${entityId}`,
				"DELETE",
				"",
				auth.token || null,
			);
			if (!response.Success) {
				throw new Error(response.message);
			}
			await fetchPlayers();
		} catch (error) {
			console.error("Error deleting player:", error);
		}
	};

	if (auth.role < 2) {
		return "You are not supposed to be here";
	}

	return (
		<Layout
			title="Player Manager"
			buttonName="Add New Player"
			buttonOnClick={() => handleOpen()}
		>
			<PlayerTable
				players={players}
				handleOpen={(player) => handleOpen(player)}
				handleDelete={(id) => handleDelete(id)}
			/>
			<PlayerDialog
				open={open}
				handleClose={handleClose}
				selectedPlayer={selectedEntity}
				player={newEntity}
				setPlayer={setNewEntity}
				handleSave={handleSave}
				ranks={ranks}
			/>
		</Layout>
	);
};

export default PlayerManager;
