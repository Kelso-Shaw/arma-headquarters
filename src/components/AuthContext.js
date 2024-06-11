import { apiRequest } from "./funcs/common";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const TOKEN_EXPIRATION_TIME = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		isAuthenticated: false,
		token: null,
		role: null,
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		const expiration = localStorage.getItem("tokenExpiration");
		const role = localStorage.getItem("role");
		const id = localStorage.getItem("id");
		const isTokenExpired =
			expiration && new Date().getTime() > Number(expiration);

		if (token && !isTokenExpired) {
			setAuth({
				isAuthenticated: true,
				token,
				role,
				id,
			});
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("tokenExpiration");
			localStorage.removeItem("role");
			localStorage.removeItem("id");

			setAuth({
				isAuthenticated: false,
				token: null,
				role: null,
			});
		}
	}, []);

	const login = async (username, password) => {
		try {
			const response = await apiRequest(
				"users/login",
				"POST",
				{ username, password },
				null,
			);

			const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;

			setAuth({
				isAuthenticated: true,
				token: response.accessToken,
				role: response.role,
				id: response.user.id,
			});
			localStorage.setItem("token", response.accessToken);
			localStorage.setItem("tokenExpiration", expirationTime);
			localStorage.setItem("role", response.role);
			localStorage.setItem("id", response.user.id);

			return { success: true };
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	const logout = () => {
		setAuth({
			isAuthenticated: false,
			token: null,
		});
		localStorage.removeItem("token");
		localStorage.removeItem("tokenExpiration");
		localStorage.removeItem("role");
		localStorage.removeItem("id");
	};

	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
