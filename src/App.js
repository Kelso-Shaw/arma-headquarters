import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { ThemeToggleProvider } from "./ThemeContext";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import { fetchHelper } from "./components/funcs/common/fetchHelper";

const App = () => {
	const clanName = process.env.REACT_APP_CLAN_NAME;
	const [pages, setPages] = useState([]);
	const { auth } = useAuth();

	const fetchPages = useCallback(async () => {
		try {
			const pagesData = await fetchHelper(auth.token, "pages");
			setPages(pagesData);
		} catch (error) {
			console.error("Error fetching pages:", error);
		}
	}, [auth.token]);

	useEffect(() => {
		fetchPages();
	}, [fetchPages]);

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
							<Route path="/dashboard" element={<Outlet />}>
								<Route path="" element={<Dashboard />} />
								{pages.map((page) => (
									<Route
										key={page.url}
										path={page.url ? page.url.replace("/dashboard/", "") : ""}
										element={
											page.url ? (
												<PrivateRoute pageUrl={page.url}>
													<Suspense fallback={<></>}>
														<DynamicComponentLoader
															componentName={page.name.replace(" ", "")}
														/>
													</Suspense>
												</PrivateRoute>
											) : (
												<div>Error: Invalid page URL</div>
											)
										}
									/>
								))}
							</Route>
						</Routes>
					</div>
				</Router>
			</AuthProvider>
		</ThemeToggleProvider>
	);
};

const DynamicComponentLoader = ({ componentName }) => {
	const [Component, setComponent] = useState(null);

	useEffect(() => {
		const loadComponent = async () => {
			try {
				const { default: loadedComponent } = await import(
					`./components/${componentName.toLowerCase()}/${componentName}`
				);
				setComponent(() => loadedComponent);
			} catch (error) {
				console.error(`Error loading component ${componentName}:`, error);
			}
		};
		loadComponent();
	}, [componentName]);

	if (!Component) {
		return;
	}

	return <Component />;
};

export default App;
