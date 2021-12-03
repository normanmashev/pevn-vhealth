const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) return res.status(401).send({ message: "Access denied" });
		const decoded = jwt.verify(token, JWTSECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).send({ message: "Invalid token" });
	}
};
