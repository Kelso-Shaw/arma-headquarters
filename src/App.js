import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeToggleProvider } from "./ThemeContext";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	const clanName = process.env.REACT_APP_CLAN_NAME;

	return (
		<ThemeToggleProvider>
			<AuthProvider>
				<Router>
					<Nav name={clanName} />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							flex: 1,
							padding: 10,
						}}
					>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route element={<PrivateRoute />}>
								<Route path="/dashboard" element={<Dashboard />} />
							</Route>
						</Routes>
					</div>
				</Router>
			</AuthProvider>
		</ThemeToggleProvider>
	);
};

export default App;
