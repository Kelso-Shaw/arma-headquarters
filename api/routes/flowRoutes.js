const express = require("express");
const router = express.Router();
const { Flow } = require("../models");

router.post("/save", async (req, res) => {
	const { nodes, edges } = req.body;

	try {
		let flow = await Flow.findOne({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		if (!flow) {
			flow = await Flow.create({ nodes, edges });
		} else {
			flow.nodes = nodes;
			flow.edges = edges;
			await flow.save();
		}
		res.json({ success: true, flow: flow });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/load", async (req, res) => {
	try {
		const flow = await Flow.findOne({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		res.json({ success: true, flow: flow } || { nodes: [], edges: [] });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
