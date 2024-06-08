import axios from "axios";

export const apiRequest = async (endpoint, method = "GET", payload = null) => {
	try {
		const options = {
			method,
			url: `${process.env.REACT_APP_API_URL}/api/${endpoint}`,
			headers: {
				"Content-Type": "application/json",
			},
			data:
				payload &&
				(method === "POST" ||
					method === "PUT" ||
					method === "PATCH" ||
					method === "DELETE")
					? payload
					: null,
		};

		const response = await axios(options);

		if (response.status !== 200) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = response.data;

		if (data.status !== "success") {
			throw new Error(data.message || "Something went wrong");
		}

		return data;
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw error;
	}
};
