import React from "react";
import { useAuth } from "../AuthContext";
import Layout from "../layouts/Layout";

const SquadBuilder = () => {
	const { auth } = useAuth();

	return (
		<Layout
			title="Squad Builder"
			buttonName="Button"
			buttonOnClick={null}
			hideButton={1}
		>
			SquadBuilder
		</Layout>
	);
};

export default SquadBuilder;
