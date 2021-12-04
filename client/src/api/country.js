import request from "./request";

export const AddCountry = data =>
	request({
		url: "/country",
		method: "post",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const DeleteCountry = cname =>
	request({
		url: `/country/${cname}`,
		method: "delete",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetAllCountries = () =>
	request({
		url: "/country",
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const GetOneCountry = cname =>
	request({
		url: `/country/${cname}`,
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

export const UpdateCountry = data =>
	request({
		url: `/country`,
		method: "patch",
		data,
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});
