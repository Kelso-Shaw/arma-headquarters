import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../funcs/common";
import { fetchHelper } from "../funcs/common/fetchHelper";
import Layout from "../layouts/Layout";
import SquadsDialog from "./assets/SquadsDialog";
import SquadsTable from "./assets/SquadsTable";

const SquadBuilder = () => {
	const [squads, setSquads] = useState([]);
	const [players, setPlayers] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedSquad, setSelectedSquad] = useState(null);
	const [squad, setSquad] = useState({ name: "", roles: [] });
	const { auth } = useAuth();

	const fetchSquads = useCallback(async () => {
		try {
			const squadsData = await fetchHelper(auth.token, "squads");
			setSquads(squadsData);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	const fetchPlayers = useCallback(async () => {
		try {
			const playerData = await fetchHelper(auth.token, "players");
			setPlayers(playerData);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchSquads();
		fetchPlayers();
	}, [fetchSquads, fetchPlayers]);

	const handleDelete = async (name) => {
		await apiRequest("squads", "DELETE", { name: name }, auth.token);
		await fetchSquads();
	};

	const handleAddSquad = () => {
		setSelectedSquad(null);
		setSquad({ name: "", roles: [] });
		setDialogOpen(true);
	};

	const handleEditSquad = (squad) => {
		setSelectedSquad(squad);
		setSquad(squad);
		setDialogOpen(true);
	};

	const handleSaveSquad = async () => {
		const oldName = selectedSquad ? selectedSquad.name : null;
		if (selectedSquad) {
			await apiRequest("squads", "POST", { oldName, ...squad }, auth.token);
		} else {
			await apiRequest("squads", "PUT", squad, auth.token);
		}
		setDialogOpen(false);
		await fetchSquads();
	};

	const handleRoleChange = (index, field, value) => {
		const newRoles = squad.roles.map((role, i) =>
			i === index ? { ...role, [field]: value } : role,
		);
		setSquad({ ...squad, roles: newRoles });
	};

	const handleAddRole = () => {
		setSquad({
			...squad,
			roles: [...squad.roles, { role: "", assigned: null, order: 1 }],
		});
	};

	const handleDeleteRole = (index) => {
		const newRoles = squad.roles.filter((_, i) => i !== index);
		setSquad({ ...squad, roles: newRoles });
	};

	return (
		<Layout
			title="Squad Builder"
			buttonName="Add Squad"
			buttonOnClick={handleAddSquad}
		>
			<SquadsTable
				squads={squads}
				handleDelete={handleDelete}
				handleEdit={handleEditSquad}
				players={players}
			/>
			<SquadsDialog
				open={dialogOpen}
				handleClose={() => setDialogOpen(false)}
				selectedSquad={selectedSquad}
				squad={squad}
				setSquad={setSquad}
				handleSave={handleSaveSquad}
				handleRoleChange={handleRoleChange}
				handleAddRole={handleAddRole}
				handleDeleteRole={handleDeleteRole}
				players={players}
			/>
		</Layout>
	);
};

export default SquadBuilder;
