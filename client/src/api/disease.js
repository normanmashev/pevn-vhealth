import request from "./request";

export const AddDisease = data =>
	request({
		url: `/disease`,
		method: "post",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const DeleteDiseaseEncounter = data =>
	request({
		url: `/disease/encounter`,
		method: "delete",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetAllDiseases = () =>
	request({
		url: `/disease`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetOneDisease = id =>
	request({
		url: `/disease/${id}`,
		method: "get",
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
