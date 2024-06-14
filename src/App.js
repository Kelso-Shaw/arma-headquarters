import React from "react";
import {
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { ThemeToggleProvider } from "./ThemeContext";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import PanelSettings from "./components/panelsettings/PanelSettings";
import PlayerAttributes from "./components/playerattributes/PlayerAttributes";
import PlayerManager from "./components/playermanager/PlayerManager";
import RankManager from "./components/rankmanager/RankManager";
import UserManager from "./components/usermanager/UserManager";
import PageManager from "./components/pagemanager/PageManager";

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
							<Route path="/access-denied" element={<>Access Denied</>} />
							<Route
								path="/dashboard"
								element={
									<PrivateRoute pageUrl="/dashboard">
										<Outlet />
									</PrivateRoute>
								}
							>
								<Route path="" element={<Dashboard />} />
								<Route
									path="user-manager"
									element={
										<PrivateRoute pageUrl="/dashboard/user-manager">
											<UserManager />
										</PrivateRoute>
									}
								/>
								<Route
									path="panel-settings"
									element={
										<PrivateRoute pageUrl="/dashboard/panel-settings">
											<PanelSettings />
										</PrivateRoute>
									}
								/>
								<Route
									path="page-manager"
									element={
										<PrivateRoute pageUrl="/dashboard/page-manager">
											<PageManager />
										</PrivateRoute>
									}
								/>
								<Route
									path="player-manager"
									element={
										<PrivateRoute pageUrl="/dashboard/player-manager">
											<PlayerManager />
										</PrivateRoute>
									}
								/>
								<Route
									path="rank-manager"
									element={
										<PrivateRoute pageUrl="/dashboard/rank-manager">
											<RankManager />
										</PrivateRoute>
									}
								/>
								<Route
									path="player-attributes"
									element={
										<PrivateRoute pageUrl="/dashboard/player-attributes">
											<PlayerAttributes />
										</PrivateRoute>
									}
								/>
							</Route>
						</Routes>
					</div>
				</Router>
			</AuthProvider>
		</ThemeToggleProvider>
	);
};

export default App;
