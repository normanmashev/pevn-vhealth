const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middlewares import
const errorHandler = require("./middleware/errorHandler.middleware");
// Routes import
const authRouter = require("./routes/auth.route");
const countryRouter = require("./routes/country.route");
const diseaseRouter = require("./routes/disease.route");
const doctorsRouter = require("./routes/doctors.route");
const recordsRouter = require("./routes/records.route");
const servantsRouter = require("./routes/servants.route");
const usersRouter = require("./routes/users.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(errorHandler);

// Static folder
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/country", countryRouter);
app.use("/api/disease", diseaseRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/servants", servantsRouter);
app.use("/api/records", recordsRouter);
app.use("/api/users", usersRouter);

async function start() {
	try {
		app.listen(PORT, () =>
			console.log(`Server has been started on port ${PORT}..`)
		);
	} catch (error) {
		console.log(error);
	}
}

start();
