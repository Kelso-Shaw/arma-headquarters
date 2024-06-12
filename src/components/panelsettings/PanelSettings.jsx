import { Container, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../funcs/common";
import SettingsTable from "./assets/SettingTable";

const UserManager = () => {
	const [settings, setSettings] = useState([]);
	const { auth } = useAuth();

	const fetchSettings = useCallback(async () => {
		try {
			const settingData = await apiRequest("panel", "GET", null, auth.token);
			setSettings(settingData.settings);
		} catch (error) {
			console.error("Error fetching settings:", error);
		}
	}, [auth.token]);

	const updateSetting = async (id, newStatus) => {
		try {
			await apiRequest(
				`panel/${id}`,
				"POST",
				{ status: newStatus },
				auth.token,
			);
			setSettings((prevSettings) =>
				prevSettings.map((setting) =>
					setting.id === id ? { ...setting, status: newStatus } : setting,
				),
			);
		} catch (error) {
			console.error("Error updating setting:", error);
		}
	};

	useEffect(() => {
		fetchSettings();
	}, [fetchSettings]);

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Panel Settings
			</Typography>
			<SettingsTable settings={settings} onStatusChange={updateSetting} />
		</Container>
	);
};

export default UserManager;
