import { AddCountry, GetAllCountries } from "@/api/country";

const state = {
	loading: true,
	countries: [],
};

const getters = {
	getCountries: state => state.countries,
	getLoading: state => state.loading,
};

const mutations = {
	SET_LOADING: (state, data) => (state.loading = data),
	SET_COUNTRIES: (state, data) => (state.countries = data),
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
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
