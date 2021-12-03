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

export const GetOneDoctor = id =>
	request({
		url: `/doctors/${id}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
