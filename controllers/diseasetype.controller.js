const db = require("../db");

class DiseaseTypeController {
	async create(req, res) {
		const { description } = req.body;
		const type = await db.query(
			`INSERT INTO DiseaseType (description) 
        VALUES (${description}) 
        RETURNING *`
		);
		res.json(type.rows[0]);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const type = await db.query(
			`SELECT * FROM DiseaseType 
        WHERE id = ${id}`
		);
		res.json(type.rows[0]);
	}

	async getAll(req, res) {
		const types = await db.query(`SELECT * FROM DiseaseType`);
		res.json(types.rows);
	}
}

module.exports = new DiseaseTypeController();
