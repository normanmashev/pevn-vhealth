import request from "./request";

export const GetAllCountries = () =>
	request({
		url: "/country",
		method: "get",
	})
		.then(res => res.data)
		.catch(e => {
			throw e;
		});

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
