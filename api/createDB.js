require("dotenv").config({ path: "../.env" });
const { Sequelize } = require("sequelize");

const databaseName = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(`mysql://${username}:${password}@${host}/`, {
	logging: false,
});

async function initializeDatabase() {
	try {
		const tempSequelize = new Sequelize(databaseName, username, password, {
			dialect: "mysql",
			host,
		});
		await tempSequelize.authenticate();
		console.log(`Database '${databaseName}' already exists.`);
	} catch (error) {
		console.log(`Database '${databaseName}' does not exist. Creating now...`);
		await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
		console.log(`Database '${databaseName}' created successfully.`);
	} finally {
		await sequelize.close();
	}
}

initializeDatabase();
