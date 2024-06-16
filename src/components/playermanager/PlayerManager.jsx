import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import Layout from "../layouts/Layout";
import PlayerDialog from "./assets/PlayerDialog";
import PlayerTable from "./assets/PlayerTable";

const PlayerManager = () => {
	const [players, setPlayers] = useState([]);
	const [ranks, setRanks] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedEntity, setSelectedEntity] = useState(null);

	const [newEntity, setNewEntity] = useState({
		username: "",
		rank: "",
		password: null,
		attributes: [],
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

	const fetchAttributes = useCallback(async () => {
		try {
			const attributesData = await fetchHelper(auth.token, "attributes");
			setAttributes(attributesData);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchPlayers();
		fetchRanks();
		fetchAttributes();
	}, [fetchPlayers, fetchRanks, fetchAttributes]);

	const handleOpen = (entity = null) => {
		setSelectedEntity(entity);
		if (entity) {
			setNewEntity({
				username: entity.username,
				rank: entity.rank,
				attributes: entity.attributes.map((attr) => attr.id),
			});
		} else {
			setNewEntity({ username: "", rank: "", password: null, attributes: [] });
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedEntity(null);
		setNewEntity({ username: "", rank: "", password: null, attributes: [] });
	};

	const handleSave = async () => {
		try {
			const method = selectedEntity ? "POST" : "PUT";
			const url = selectedEntity ? `players/${selectedEntity.id}` : "players";
			const requestBody = {
				id: selectedEntity?.id,
				username: newEntity.username,
				rank: newEntity.rank,
				attributes: newEntity.attributes,
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
			if (!response.success) {
				throw new Error(response.message);
			}
			await fetchPlayers();
		} catch (error) {
			console.error("Error deleting player:", error);
		}
	};

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
				attributes={attributes}
			/>
			<PlayerDialog
				open={open}
				handleClose={handleClose}
				selectedPlayer={selectedEntity}
				player={newEntity}
				setPlayer={setNewEntity}
				handleSave={handleSave}
				ranks={ranks}
				attributes={attributes}
			/>
		</Layout>
	);
};

export default PlayerManager;
