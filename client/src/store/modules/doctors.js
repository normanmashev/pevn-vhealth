import { GetAllDoctors, GetOneDoctor } from "@/api/doctors";

const state = {
	loading: true,
	doctors: [],
	doctorInfo: null,
};

const getters = {
	getDoctors: state => state.doctors,
	getDoctorInfo: state => state.doctorInfo,
	getLoading: state => state.loading,
};

const mutations = {
	SET_LOADING: (state, data) => (state.loading = data),
	SET_DOCTOR_INFO: (state, data) => (state.doctorInfo = data),
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

	async getDoctorInfo({ commit }, id) {
		try {
			const res = await GetOneDoctor(id);
			commit("SET_DOCTOR_INFO", res);
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
