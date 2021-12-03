import request from "./request";

export const Register = data =>
	request({
		url: "/auth/register",
		method: "post",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const Login = data =>
	request({
		url: "/auth/login",
		method: "post",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
