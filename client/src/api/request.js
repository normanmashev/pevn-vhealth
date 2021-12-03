import axios from "axios";
import store from "@/store";
import cookies from "@/utils/cookies";

const request = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

request.interceptors.request.use(
	config => {
		const token = cookies.getToken();
		if (token) {
			config.headers["Authorization"] = token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

request.interceptors.response.use(
	response => {
		if (response.status !== 200) {
			return Promise.reject(new Error(res.data.error || "Ошибка"));
		}
		return response;
	},
	error => {
		if (error.response.status === 401) {
			store.dispatch("user/logout");
			return;
		}
		return Promise.reject({
			type: "is-danger",
			status: error.response.status,
			...error.response.data,
		});
	}
);

export default request;
