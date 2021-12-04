import { GetAllDoctors } from "@/api/doctors";

const state = {
	loading: true,
	doctors: [],
};

const getters = {
	getDoctors: state => state.doctors,
	getLoading: state => state.loading,
};

const mutations = {
	SET_LOADING: (state, data) => (state.loading = data),
	SET_DOCTORS: (state, data) => (state.doctors = data),
};

const actions = {
	async getDoctors({ commit }) {
		try {
			commit("SET_LOADING", true);
			const res = await GetAllDoctors();
			commit("SET_DOCTORS", res);
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
