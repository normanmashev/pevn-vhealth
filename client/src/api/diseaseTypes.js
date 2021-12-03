import request from "./request";

export const getAllDiseaseTypes = () =>
	request({
		url: "/disease/type",
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const addDiseaseType = data =>
	request({
		url: "/disease/type",
		method: "post",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
