import { apiRequest } from "./apiRequest";

export const fetchHelper = async (token, resource, userId = null) => {
	switch (resource) {
		case "users":
			try {
				const data = await apiRequest("users", "GET", "", token ? token : null);
				return data.users;
			} catch (error) {
				console.error("Error fetching users:", error);
				throw error;
			}
		case "pages":
			try {
				const data = await apiRequest("pages", "GET", "", token ? token : null);
				return data.pages;
			} catch (error) {
				console.error("Error fetching pages:", error);
				throw error;
			}
		case "permissions":
			if (!userId) {
				throw new Error("userId is required for fetching permissions");
			}
			try {
				const data = await apiRequest(
					`permissions/user/${userId}`,
					"GET",
					"",
					token ? token : null,
				);
				return data.permissions;
			} catch (error) {
				console.error("Error fetching user permissions:", error);
				throw error;
			}
		default:
			throw new Error("Unknown resource type");
	}
};
