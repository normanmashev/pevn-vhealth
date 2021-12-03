import Cookies from "js-cookie";

const TOKEN_KEY = "Authorization";

export default {
	getToken() {
		return Cookies.get(TOKEN_KEY);
	},
	setToken(token) {
		return Cookies.set(TOKEN_KEY, token);
	},
	removeToken() {
		return Cookies.remove(TOKEN_KEY);
	},
};
