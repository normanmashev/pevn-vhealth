const db = require("../db");

class CountryController {
	async create(req, res) {
		try {
			const { cname, population } = req.body;

			const candidate = await db.query(
				`SELECT * FROM Country WHERE cname = $1`,
				[cname]
			);

			if (candidate.rows.length) {
				throw { message: "Country already exists in the system" };
			}

			await db.query(
				`INSERT INTO Country (cname, population) VALUES ($1, $2)`,
				[cname, population]
			);

			return res.json({ message: "Country has been added" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getOne(req, res) {
		try {
			const cname = req.params.id;
			const country = await db.query(`SELECT * FROM Country WHERE cname = $1`, [
				cname,
			]);
			const doctors = await db.query(
				`SELECT CONCAT(name, ' ', surname) AS fullname, id
        FROM Users as U 
        JOIN Doctor as D
        ON D.email = U.email
        WHERE cname = $1`,
				[cname]
			);
			const servants = await db.query(
				`SELECT CONCAT(name, ' ', surname) AS fullname, id
        FROM Users as U 
        JOIN PublicServant as P
        ON P.email = U.email
        WHERE cname = $1`,
				[cname]
			);
			const records = await db.query(
				`SELECT DISTINCT(R.disease_code), description
        FROM Record as R
        JOIN Disease as D
        ON D.disease_code = R.disease_code
        WHERE R.cname = $1`,
				[cname]
			);
			return res.json({
				country: country.rows[0],
				doctors: doctors.rows,
				records: records.rows,
				servants: servants.rows,
			});
		} catch (error) {
			return res.status(400).send(error);
		}
	}

	async getAll(req, res) {
		try {
			const country = await db.query(`SELECT * FROM Country`);
			return res.json(country.rows);
		} catch (error) {
			return res.status(400).send(error);
		}
	}

	async update(req, res) {
		try {
			const { cname, population } = req.body;
			await db.query(`UPDATE Country SET population = $1 WHERE cname = $2`, [
				population,
				cname,
			]);
			return res.json({ message: "Country population has been updated" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async remove(req, res) {
		try {
			const { id } = req.params;
			await db.query(`DELETE FROM Country WHERE cname = $1`, [id]);
			return res.json({ message: "Country has been deleted" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}
}

module.exports = new CountryController();
