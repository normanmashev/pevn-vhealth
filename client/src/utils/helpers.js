function capitalizeString(x) {
	return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
}

function convertDate(x) {
	let date = new Date(x),
		mm = "" + (date.getMonth() + 1),
		dd = "" + date.getDate(),
		yyyy = date.getFullYear();

	if (mm.length < 2) mm = "0" + mm;
	if (dd.length < 2) dd = "0" + dd;

	return [yyyy, mm, dd].join("-");
}

function convertYodaDate(x) {
	let [y, m, d] = x.split("-");
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return `${months[m - 1]} ${d}, ${y}`;
}

function getFullname(obj) {
	return `${capitalizeString(obj.name)} ${capitalizeString(obj.surname)}`;
}

export { capitalizeString, convertDate, convertYodaDate, getFullname };
