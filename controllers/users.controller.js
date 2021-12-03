const db = require("../db");

class UserController {
	async getOne(req, res) {
		try {
			const { id } = req.params;

			let user = await db.query(`SELECT * FROM Users WHERE id = $1`, [id]);

			if (!user.rows.length) {
				throw {
					status: 404,
					message: `No user with id ${id}`,
				};
			}

			user = user.rows[0];
			delete user.password;

			const isDoctor = await db.query(
				`SELECT EXISTS (SELECT 1 FROM Doctor WHERE email = $1)`,
				[user.email]
			);

			const role = isDoctor.rows[0].exists ? "Doctor" : "PublicServant";
			const roleInfo = await db.query(
				`SELECT * FROM ${role} WHERE email = $1`,
				[user.email]
			);

			const data = { ...user, ...roleInfo.rows[0], role };

			return res.json(data);
		} catch (error) {
			return res.status(error.status || 400).json({ message: error.message });
		}
	}

	async getAll(req, res) {
		const users = await db.query(`SELECT * FROM Users`);
		return res.json(users.rows);
	}

	async remove(req, res) {
		const { id } = req.params;
		const user = await db.query(`DELETE FROM Users WHERE id = ${id}`);
		return res.json({ message: "User has been deleted" });
	}

	async update(req, res) {
		const { id } = req.params;
		const { email, name, surname, salary, phone, cname } = req.body;
		const user = await db.query(
			`UPDATE Users 
        SET email = $1, name = $2, surname = $3, salary = $4, phone = $5, cname = $6 
        WHERE id = ${id}
        RETURNING *`,
			[email, name, surname, salary, phone, cname]
		);
		return res.json({
			message: "User info has been updated",
			user: user.rows[0],
		});
	}
}

module.exports = new UserController();
