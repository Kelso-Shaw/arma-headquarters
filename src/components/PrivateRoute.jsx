import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { apiRequest } from "./funcs/common/apiRequest";

const PrivateRoute = ({ children, pageUrl }) => {
	const { auth } = useAuth();
	const [hasPermission, setHasPermission] = useState(null);
	useEffect(() => {
		const checkPermission = async () => {
			if (!auth.isAuthenticated) {
				setHasPermission(false);
				return;
			}
			try {
				const response = await apiRequest(
					"permissions/check",
					"POST",
					{
						userId: auth.id,
						pageUrl: pageUrl,
					},
					auth.token,
				);
				setHasPermission(response.success);
			} catch (error) {
				console.error(error);
				setHasPermission(false);
			}
		};

		checkPermission();
	}, [auth, pageUrl]);

	if (hasPermission === null) {
		return;
	}

	if (!auth.isAuthenticated) {
		return <Navigate to="/" />;
	}

	if (!hasPermission) {
		return <Navigate to="/" />;
	}

	return children ? children : <Outlet />;
};

export default PrivateRoute;
