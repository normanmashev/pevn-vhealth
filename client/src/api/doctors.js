import request from "./request";

export const GetAllDoctors = () =>
	request({
		url: "/doctors",
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
