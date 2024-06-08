import { apiRequest } from "./funcs/common";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const TOKEN_EXPIRATION_TIME = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		isAuthenticated: false,
		token: null,
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		const expiration = localStorage.getItem("tokenExpiration");
		const isExpired = expiration && new Date().getTime() > Number(expiration);

		if (token && !isExpired) {
			setAuth({
				isAuthenticated: true,
				token,
			});
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("tokenExpiration");
			setAuth({
				isAuthenticated: false,
				token: null,
			});
		}
	}, []);

	const login = async (email, password) => {
		try {
			const response = await apiRequest(
				"users/login",
				"POST",
				{ email, password },
				null,
			);

			const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;

			setAuth({
				isAuthenticated: true,
				token: response.accessToken,
			});
			localStorage.setItem("token", response.accessToken);
			localStorage.setItem("tokenExpiration", expirationTime);

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
	};

	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
