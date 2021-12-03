const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAccessToken = payload => {
	const JWTSECRET = process.env.JWTSECRET;

	return jwt.sign(payload, JWTSECRET, { expiresIn: "2h" });
};

class AuthController {
	async register(req, res) {
		try {
			const { email, name, surname, salary, phone, cname, password, role } =
				req.body;

			const candidate = await db.query(`SELECT * FROM Users WHERE email = $1`, [
				email,
			]);

			if (candidate.rows.length) {
				return res
					.status(400)
					.json({ message: "User with such email already exists" });
			}

			const JWTSALT = process.env.JWTSALT;
			const hashedPassword = bcrypt.hashSync(password, Number(JWTSALT));

			await db.query(
				`INSERT INTO Users (email, password, name, surname, salary, phone, cname) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
				[email, hashedPassword, name, surname, salary, phone, cname]
			);

			// Role of the user
			if (role === "doctor") {
				const { degree } = req.body;
				await db.query(`INSERT INTO Doctor (email, degree) VALUES ($1, $2)`, [
					email,
					degree,
				]);
			} else {
				const { department } = req.body;
				await db.query(
					`INSERT INTO PublicServant (email, department) VALUES ($1, $2)`,
					[email, department]
				);
			}

			return res.json({ message: "User has been created" });
		} catch (error) {
			console.error(error);
			return res.status(400).json({ message: error.message });
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		const user = await db.query(
			`SELECT * FROM Users 
      WHERE email = $1`,
			[email]
		);

		if (!user.rows.length) {
			return res
				.status(404)
				.json({ message: "Check the correctness of the entered data" });
		}

		const checkPassword = bcrypt.compareSync(password, user.rows[0].password);

		if (!checkPassword) {
			return res
				.status(404)
				.json({ message: "Check the correctness of the entered data" });
		}

		delete user.rows[0].password;

		const token = getAccessToken(user.rows[0]);

		return res.json({
			token: `Bearer ${token}`,
			userInfo: { ...user.rows[0] },
			message: "Authorization successful",
		});
	}
}

module.exports = new AuthController();
