const db = require("../db");

async function addDiscover({ first_enc_date, cname, disease_code }) {
	try {
		console.log(first_enc_date, cname, disease_code);

		const isExisting = await db.query(
			`SELECT EXISTS (SELECT 1 FROM Discover WHERE cname = $1 AND disease_code = $2)`,
			[cname, disease_code]
		);

		if (isExisting.rows[0].exists) {
			throw {
				message: `Information about first discover of ${disease_code} in ${cname} already exists`,
			};
		}

		await db.query(
			`INSERT INTO Discover (cname, disease_code, first_enc_date) VALUES ($1, $2, $3)`,
			[cname, disease_code, first_enc_date]
		);

		return { message: "New encounter has been added" };
	} catch (error) {
		throw { message: error.message };
	}
}

class DiseaseController {
	async create(req, res) {
		try {
			const { disease_code, pathogen, description, id } = req.body;

			const isExisting = await db.query(
				`SELECT EXISTS (SELECT 1 FROM Disease WHERE disease_code = $1)`,
				[disease_code]
			);

			if (isExisting.rows[0].exists) {
				const discover = await addDiscover(req.body);
				return res.json({ message: discover.message });
			}

			const disease = await db.query(
				`INSERT INTO Disease (disease_code, pathogen, description, id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
				[disease_code, pathogen, description, id]
			);

			const discover = await addDiscover(req.body);

			console.log(disease, discover);

			return res.json({
				message: "New disease and its first encounter has been added",
			});
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const disease = await db.query(
				`SELECT D.*, DT.description as disease_type,
        json_agg(json_build_object('first_enc_date', F.first_enc_date, 'cname', F.cname)) as encounters
        FROM Disease as D
        JOIN Discover as F
        ON F.disease_code = D.disease_code
        JOIN DiseaseType as DT
        ON DT.id = D.id
        WHERE D.disease_code = $1
        GROUP BY D.disease_code`,
				[id]
			);
			return res.json(disease.rows[0]);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const diseases = await db.query(
				`SELECT D.disease_code, D.pathogen, D.description, DT.description as disease_type_name, DT.id
        FROM Disease as D
        JOIN DiseaseType as DT
        ON DT.id = D.id`
			);
			return res.json(diseases.rows);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}

	async getMostDangerous(req, res) {
		try {
			const limit = req.body.limit || 3;
			const dangerous = await db.query(
				`SELECT DT.description, R.disease_code, 
          SUM(total_patients) as total_patients, 
          SUM(total_deaths) as total_deaths 
          FROM Record as R
          JOIN Disease as D
          ON D.disease_code = R.disease_code
          JOIN DiseaseType as DT
          ON DT.id = D.id
          GROUP BY R.disease_code, DT.description 
          ORDER BY total_deaths DESC 
          LIMIT $1`,
				[limit]
			);

			return res.json(dangerous.rows);
		} catch (error) {
			return res.status(400).send({ message: error.message });
		}
	}
}

module.exports = new DiseaseController();
