/* 	
const { auth } = useAuth();
const fetchUsers = useCallback(async () => {
    try {
        const usersData = await fetchUsersHelper(auth.token);
        setUsers(usersData);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}, [auth.token]);

useEffect(() => {
    fetchUsers();
}, [fetchUsers]);
*/

import { apiRequest } from "./apiRequest";

export const fetchUsersHelper = async (token, user) => {
	switch (user) {
		case "users":
			try {
				const data = await apiRequest("users", "GET", "", token ? token : null);
				return data.users;
			} catch (error) {
				console.error("Error fetching users:", error);
				throw error;
			}
		case "players":
			try {
				const data = await apiRequest(
					"players",
					"GET",
					"",
					token ? token : null,
				);
				return data.users;
			} catch (error) {
				console.error("Error fetching users:", error);
				throw error;
			}
	}
};
