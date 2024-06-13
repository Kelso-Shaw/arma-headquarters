import axios from "axios";

export const apiRequest = async (
	endpoint,
	method = "GET",
	payload = null,
	token = null,
) => {
	try {
		const options = {
			method,
			url: `${process.env.REACT_APP_API_URL}/api/${endpoint}`,
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
		};

		if (payload && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
			options.data = payload;
		}

		const response = await axios(options);

		if (response.status >= 200 && response.status < 300) {
			if (response.data.success !== true) {
				throw new Error(response.data.message || "Something went wrong");
			}
			return response.data;
		}
		throw new Error(`HTTP error! status: ${response.status}`);
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw error;
	}
};
