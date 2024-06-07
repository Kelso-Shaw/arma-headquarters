const fs = require("fs");
const path = require("path");

const middleware = {};

fs.readdirSync(__dirname).forEach((file) => {
	if (file !== "index.js" && file.endsWith(".js")) {
		const middlewareName = path.basename(file, ".js");
		console.log(`Loading middleware: ${middlewareName}`);
		middleware[middlewareName] = require(path.join(__dirname, file));
	}
});

module.exports = middleware;
