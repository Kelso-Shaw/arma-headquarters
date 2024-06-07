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

// Import userRoutes
const userRoutes = require("./routes/userRoutes");

// Use the user routes with /api prefix
app.use("/api/users", userRoutes);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
