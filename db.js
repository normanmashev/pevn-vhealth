const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	password: "admin",
	port: 5433,
	host: "localhost",
	database: "hw2",
});

module.exports = pool;
