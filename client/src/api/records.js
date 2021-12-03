import request from "./request";

export const AddRecord = data =>
	request({
		url: "/records",
		method: "post",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const DeleteRecord = data =>
	request({
		url: "/records",
		method: "delete",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetAllRecords = () =>
	request({
		url: "/records",
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetOneRecord = id =>
	request({
		url: `/records/${id}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetServantRecords = id =>
	request({
		url: `/records/servant/${id}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const UpdateRecord = data =>
	request({
		url: "/records",
		method: "patch",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
