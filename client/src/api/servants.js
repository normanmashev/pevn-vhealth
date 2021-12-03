import request from "./request";

export const GetAllServants = () =>
	request({
		url: "/servants",
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetOneServant = id =>
	request({
		url: `/servants/${id}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const getMostActiveServants = () =>
	request({
		url: `/servants/most-active`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
