import { addDiseaseType, getAllDiseaseTypes } from "@/api/diseaseTypes";

import { addDisease, getAllDiseases } from "@/api/disease";

const state = {
	diseases: [],
	diseaseTypes: [],
	loadingDiseases: true,
	loadingTypes: true,
};

const getters = {
	getDiseases: state => state.diseases,
	isLoadingDiseases: state => state.loadingDiseases,
	getDiseaseTypes: state => state.diseaseTypes,
	isLoadingTypes: state => state.loadingTypes,
};

const mutations = {
	SET_LOADING_TYPES: (state, data) => (state.loadingTypes = data),
	SET_DISEASE_TYPES: (state, data) => (state.diseaseTypes = data),
	SET_DISEASES: (state, data) => (state.diseases = data),
	SET_LOADING_DISEASES: (state, data) => (state.loadingDiseases = data),
};

const actions = {
	async getDiseaseTypes({ commit }) {
		try {
			commit("SET_LOADING_TYPES", true);
			const res = await getAllDiseaseTypes();
			commit("SET_DISEASE_TYPES", res);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING_TYPES", false);
		}
	},

	async addDiseaseType({ commit, dispatch }, data) {
		try {
			commit("SET_LOADING_TYPES", true);
			const res = await addDiseaseType(data);
			dispatch("getDiseaseTypes");
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING_TYPES", false);
		}
	},

	async getDiseases({ commit }) {
		try {
			commit("SET_LOADING_DISEASES", true);
			const res = await getAllDiseases();
			commit("SET_DISEASES", res);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING_DISEASES", false);
		}
	},

	async addDisease({ commit, dispatch }, data) {
		try {
			commit("SET_LOADING_DISEASES", true);
			const res = await addDisease(data);
			dispatch("getDiseases");
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING_DISEASES", false);
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
