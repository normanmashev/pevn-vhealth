import request from "./request";

export const getAllDiseases = () =>
	request({
		url: `/disease`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const getOneDisease = id =>
	request({
		url: `/disease/${id}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const addDisease = data =>
	request({
		url: `/disease`,
		method: "post",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const getMostDangerousDisease = () =>
	request({
		url: `/disease/most-dangerous`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
