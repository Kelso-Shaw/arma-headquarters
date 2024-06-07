import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const TOKEN_EXPIRATION_TIME = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		isAuthenticated: false,
		token: null,
		loading: true,
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		const expiration = localStorage.getItem("tokenExpiration");
		const isExpired = expiration && new Date().getTime() > Number(expiration);

		if (token && !isExpired) {
			setAuth({
				isAuthenticated: true,
				token,
				loading: false,
			});
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("tokenExpiration");
			setAuth({
				isAuthenticated: false,
				token: null,
				loading: false,
			});
		}
	}, []);

	const login = async (email, password) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/users/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				},
			);

			if (!response.ok) {
				const error = await response.json();
				return { success: false, message: error.error || "Login failed" };
			}

			const data = await response.json();
			if (!data.Success) {
				return { success: false, message: "Login failed" };
			}

			const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;

			setAuth({
				isAuthenticated: true,
				token: data.accessToken,
				loading: false,
			});
			localStorage.setItem("token", data.accessToken);
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
			loading: false,
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
