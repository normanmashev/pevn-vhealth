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
			const { id } = req.params;
			const country = await db.query(
				`SELECT * FROM Country WHERE cname = ${id}`
			);
			return res.json({ country: country.rows[0] });
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

	async remove(req, res) {
		try {
			const { id } = req.params;
			await db.query(`DELETE FROM Country WHERE cname = ${id}`);
			return res.json({ message: "Country has been deleted" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}
}

module.exports = new CountryController();
