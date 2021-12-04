import { addDiseaseType, getAllDiseaseTypes } from "@/api/diseaseTypes";

import {
	AddDisease,
	DeleteDiseaseEncounter,
	GetAllDiseases,
	GetOneDisease,
} from "@/api/disease";

const state = {
	diseases: [],
	diseaseTypes: [],
	diseaseInfo: null,
	loadingDiseases: true,
	loadingTypes: true,
};

const getters = {
	getDiseases: state => state.diseases,
	isLoadingDiseases: state => state.loadingDiseases,
	getDiseaseTypes: state => state.diseaseTypes,
	getDiseaseInfo: state => state.diseaseInfo,
	isLoadingTypes: state => state.loadingTypes,
};

const mutations = {
	SET_LOADING_TYPES: (state, data) => (state.loadingTypes = data),
	SET_DISEASE_TYPES: (state, data) => (state.diseaseTypes = data),
	SET_DISEASES: (state, data) => (state.diseases = data),
	SET_DISEASE_INFO: (state, data) => (state.diseaseInfo = data),
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
			const res = await GetAllDiseases();
			commit("SET_DISEASES", res);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING_DISEASES", false);
		}
	},

	async getDiseaseInfo({ commit }, { disease_code }) {
		try {
			const res = await GetOneDisease(disease_code);
			commit("SET_DISEASE_INFO", res);
			return res;
		} catch (error) {
			throw error;
		}
	},

	async addDisease({ getters, commit, dispatch }, data) {
		try {
			commit("SET_LOADING_DISEASES", true);
			const res = await AddDisease(data);
			dispatch("getDiseases");
			if (getters.getDiseaseInfo) {
				dispatch("getDiseaseInfo", getters.getDiseaseInfo);
			}
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING_DISEASES", false);
		}
	},

	async deleteDiseaseEncounter({ getters, dispatch }, data) {
		try {
			const res = await DeleteDiseaseEncounter({
				...data,
				disease_code: getters.getDiseaseInfo.disease_code,
			});
			dispatch("getDiseases");
			dispatch("getDiseaseInfo", getters.getDiseaseInfo);
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
