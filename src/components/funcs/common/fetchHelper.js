import { apiRequest } from "./apiRequest";

export const fetchHelper = async (token, resource, userId = null) => {
	if (resource === "permissions" && !userId) {
		throw new Error("userId is required for fetching permissions");
	}
	const endpoint =
		resource === "permissions" ? `permissions/user/${userId}` : resource;
	try {
		const data = await apiRequest(endpoint, "GET", "", token || null);
		return data[resource];
	} catch (error) {
		console.error(`Error fetching ${resource}:`, error);
		throw error;
	}
};
