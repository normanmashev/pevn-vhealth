const db = require("../db");

class DoctorsController {
	async getAll(req, res) {
		try {
			let doctors = await db.query(
				`SELECT degree, U.*, STRING_AGG(description, ', ') as specialize
        FROM Doctor as D
        LEFT JOIN Users as U
        ON U.email = D.email
        LEFT JOIN Specialize as S
        ON S.email = D.email
        LEFT JOIN DiseaseType as DT
        ON S.id = DT.id
        GROUP BY U.email, U.id, degree`
			);

			doctors.rows = doctors.rows.map(e => {
				delete e.password;
				return e;
			});

			return res.json(doctors.rows);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async update(req, res) {
		try {
			const email = req.params.id;
			await db.query(`DELETE FROM PublicServant WHERE email = ${email}`);
			return res.json({ message: "Public servant has been deleted" });
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}
}

module.exports = new DoctorsController();
