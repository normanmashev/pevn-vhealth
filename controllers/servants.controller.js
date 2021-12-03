const db = require("../db");

class ServantsController {
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
				`SELECT cname, D.disease_code, description, total_deaths, total_patients
        FROM Record as R
        JOIN Disease as D
        ON R.disease_code = D.disease_code
        WHERE R.email = $1`,
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
			const servants = await db.query(
				`SELECT P.*, U.name, U.surname, U.salary, U.cname 
        FROM PublicServant as P
        JOIN Users as U
        ON U.email = P.email`
			);
			return res.json(servants.rows);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async remove(req, res) {
		try {
			const email = req.params.id;
			await db.query(`DELETE FROM PublicServant WHERE email = ${email}`);
			return res.json({ message: "Public servant has been deleted" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getMostActive(req, res) {
		try {
			const servants = await db.query(
				`SELECT P.email, U.name, U.surname,
        SUM(total_patients) as total_patients, 
        COUNT(DISTINCT(R.cname)) as total_countries, 
        COUNT(*) as total_records
        FROM PublicServant as P
        JOIN Record as R
        ON R.email = P.email
        JOIN Users as U
        ON U.email = P.email
        GROUP BY P.email, U.name, U.surname
        ORDER BY total_patients DESC
        LIMIT 3`
			);
			return res.json(servants.rows);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}
}

module.exports = new ServantsController();
