const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;

module.exports = function (allowedRoles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}

		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) return res.status(403).send("Access denied");

			const { role } = jwt.verify(token, JWTSECRET);

			if (!allowedRoles.includes(role)) {
				return res.status(403).send("Access denied");
			}

			next();
		} catch (error) {
			return res.status(400).json({ message: "Invalid token" });
		}
	};
};
