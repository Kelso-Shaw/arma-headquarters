import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Logout = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<Button variant="contained" color="secondary" onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default Logout;
