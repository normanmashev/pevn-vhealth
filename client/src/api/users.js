import request from "./request";

export const getUser = id =>
	request({
		url: `/users/${id}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
