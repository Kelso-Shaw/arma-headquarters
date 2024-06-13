require("module-alias/register");
require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
const middleware = require("./middleware");
app.use(cors());
app.use(bodyParser.json());
app.use(middleware.appendApiPrefix);
middleware.jsonErrorHandler(app);

// Import userRoutes
const userRoutes = require("./routes/userRoutes");
const panelRoutes = require("./routes/panelRoutes");
const playerUserRotues = require("./routes/playerUserRoutes");
const rankRoutes = require("./routes/rankRoutes");
const playerAttributesRoutes = require("./routes/playerAttributeRoutes");
const permissionsRoutes = require("./routes/permissionRoutes");
const pageRoutes = require("./routes/pagesRoutes");

// Use the user routes with /api prefix
app.use("/api/users", userRoutes);
app.use("/api/panel", panelRoutes);
app.use("/api/players", playerUserRotues);
app.use("/api/ranks", rankRoutes);
app.use("/api/attributes", playerAttributesRoutes);
app.use("/api/permissions", permissionsRoutes);
app.use("/api/pages", pageRoutes);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
