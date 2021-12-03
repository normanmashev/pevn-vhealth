const db = require("../db");

class ServantsController {
	async create(req, res) {
		try {
			const { email, cname, disease_code, total_patients, total_deaths } =
				req.body;

			const population = await db.query(
				`SELECT population FROM Country WHERE cname = $1`,
				[cname]
			);

			if (total_deaths > total_patients) {
				throw {
					message: "Number of deaths can't be larger than number of patients",
				};
			}

			if (total_patients > population) {
				throw { message: "Number of patients is larger than the population" };
			}

			const candidate = await db.query(
				`SELECT * FROM Record 
        WHERE email = $1 AND cname = $2 AND disease_code = $3`,
				[email, cname, disease_code]
			);

			if (candidate.rows.length) {
				throw {
					record: candidate.rows[0],
					message: "You already have a record in this country",
				};
			}

			await db.query(
				`INSERT INTO Record (email, cname, disease_code, total_patients, total_deaths) VALUES ($1, $2, $3, $4, $5)`,
				[email, cname, disease_code, total_patients, total_deaths]
			);

			return res.json({ message: "Record has been added" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async update(req, res) {
		try {
			const {
				email,
				cname,
				disease_code,
				total_patients_update,
				total_deaths_update,
			} = req.body;

			const candidate = await db.query(
				`SELECT * FROM Record WHERE email = $1 AND cname = $2 AND disease_code = $3`,
				[email, cname, disease_code]
			);

			if (!candidate.rows.length) {
				throw { message: "Record has not been found" };
			}

			await db.query(
				`UPDATE Record 
        SET total_patients = total_patients + $1, 
        total_deaths = total_deaths + $2 
        WHERE email = $3 AND cname = $4 AND disease_code = $5`,
				[total_patients_update, total_deaths_update, email, cname, disease_code]
			);

			return res.json({ message: "Record has been updated" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getOne(req, res) {
		try {
			const email = req.params.id;

			const servant = await db.query(
				`SELECT P.*, U.name, U.surname, U.salary, U.cname
        FROM PublicServant as P
        JOIN Users as U
        ON U.email = P.email
        WHERE P.email = $1`,
				[email]
			);

			const records = await db.query(
				`SELECT cname, disease_code, total_deaths, total_patients
        FROM Record as R
        WHERE email = $1`,
				[email]
			);

			const total_countries = await db.query(
				`SELECT COUNT(DISTINCT(cname))
        FROM Record as R
        WHERE email = $1`,
				[email]
			);

			const total_patients = records.rows.reduce(
				(acc, val) => (acc += val.total_patients),
				0
			);

			return res.json({
				data: servant.rows[0],
				records: records.rows,
				total_countries: total_countries.rows[0],
				total_patients,
			});
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const records = await db.query(
				`SELECT R.*, D.description, U.name, U.surname 
        FROM Record as R
        JOIN Disease as D
        ON R.disease_code = D.disease_code
        JOIN Users as U
        ON U.email = R.email`
			);
			return res.json(records.rows);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getServantRecords(req, res) {
		try {
			const email = req.params.id;
			const records = await db.query(
				`SELECT R.*, description FROM Record as R
        JOIN Disease as D
        ON D.disease_code = R.disease_code
        WHERE email = $1`,
				[email]
			);
			return res.json(records.rows);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async remove(req, res) {
		try {
			const data = req.body;
			await db.query(
				`DELETE FROM Record WHERE email = $1 AND cname = $2 AND disease_code = $3`,
				[data.email, data.cname, data.disease_code]
			);
			return res.json({ message: "Record has been deleted" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}
}

module.exports = new ServantsController();
