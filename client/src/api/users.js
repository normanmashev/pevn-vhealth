import request from "./request";

export const GetUser = id =>
	request({
		url: `/users/${id}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const UpdateUser = data =>
	request({
		url: `/users`,
		method: "patch",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
