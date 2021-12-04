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

			let data = {
				...user,
				...roleInfo.rows[0],
				role,
			};

			if (role === "Doctor") {
				const specialize = await db.query(
					`SELECT id FROM Specialize WHERE email = $1`,
					[user.email]
				);
				data = { specialize: specialize.rows.map(e => e.id), ...data };
			}

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
		console.log("UPDATING", req.body);
		const { email, name, surname, salary, phone, cname, role } = req.body;

		const user = await db.query(
			`UPDATE Users 
        SET email = $1, name = $2, surname = $3, salary = $4, phone = $5, cname = $6 
        WHERE email = $7
        RETURNING *`,
			[email, name, surname, salary, phone, cname, email]
		);

		if (role === "Doctor") {
			const { specialize, degree } = req.body;

			const already = await db.query(
				`SELECT id FROM Specialize WHERE email = $1`,
				[email]
			);

			const toRemove = already.rows.filter(
				e => !specialize.some(s => s === e.id)
			);
			const toAdd = specialize.filter(e => !already.rows.some(s => s.id === e));

			for (const e of toRemove) {
				await db.query(`DELETE FROM Specialize WHERE email = $1 AND id = $2`, [
					email,
					e.id,
				]);
			}

			for (const e of toAdd) {
				await db.query(`INSERT INTO Specialize (id, email) VALUES ($1, $2)`, [
					e,
					email,
				]);
			}

			await db.query("UPDATE Doctor SET degree = $1 WHERE email = $2", [
				degree,
				email,
			]);
		} else {
			const { department } = req.body;

			await db.query(
				"UPDATE PublicServant SET department = $1 WHERE email = $2",
				[department, email]
			);
		}

		return res.json({
			message: "User info has been updated",
			user: user.rows[0],
		});
	}
}

module.exports = new UserController();
