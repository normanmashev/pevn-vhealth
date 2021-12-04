import {
	AddCountry,
	DeleteCountry,
	GetAllCountries,
	GetOneCountry,
	UpdateCountry,
} from "@/api/country";

const state = {
	loading: true,
	countries: [],
	countryInfo: null,
};

const getters = {
	getCountries: state => state.countries,
	getLoading: state => state.loading,
	getCountryInfo: state => state.countryInfo,
};

const mutations = {
	SET_LOADING: (state, data) => (state.loading = data),
	SET_COUNTRIES: (state, data) => (state.countries = data),
	SET_COUNTRY_INFO: (state, data) => (state.countryInfo = data),
};

const actions = {
	async getCountries({ commit }) {
		try {
			commit("SET_LOADING", true);
			const res = await GetAllCountries();
			commit("SET_COUNTRIES", res);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async addCountry({ commit, dispatch }, data) {
		try {
			commit("SET_LOADING", true);
			const res = await AddCountry(data);
			dispatch("getCountries");
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async deleteCountry({ dispatch, commit }, cname) {
		try {
			const res = await DeleteCountry(cname);
			commit("SET_COUNTRY_INFO", null);
			dispatch("getCountries");
			return res;
		} catch (error) {
			throw error;
		}
	},

	async updateCountry({ dispatch }, data) {
		try {
			const res = await UpdateCountry(data);
			dispatch("getCountryInfo", data);
			dispatch("getCountries");
			return res;
		} catch (error) {
			throw error;
		}
	},

	async getCountryInfo({ commit }, { cname }) {
		try {
			const res = await GetOneCountry(cname);
			commit("SET_COUNTRY_INFO", res);
			return res;
		} catch (error) {
			throw error;
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
