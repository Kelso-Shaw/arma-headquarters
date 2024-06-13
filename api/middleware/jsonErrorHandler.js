const bodyParser = require("body-parser");

const jsonErrorHandler = (app) => {
	app.use(bodyParser.json({ strict: true }));

	app.use(bodyParser.text({ type: "application/json" }));
	app.use((req, res, next) => {
		console.log("Raw body:", req.body);
		next();
	});

	app.use((err, req, res, next) => {
		if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
			console.error("Bad JSON:", err.message);
			return res.status(400).json({ success: false, message: "Invalid JSON" });
		}
		next();
	});
};

module.exports = jsonErrorHandler;
