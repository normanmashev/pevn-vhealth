import { GetAllServants, GetOneServant } from "@/api/servants";

const state = {
	loading: true,
	servants: [],
	servantInfo: null,
};

const getters = {
	getServants: state => state.servants,
	getServantInfo: state => state.servantInfo,
	getLoading: state => state.loading,
};

const mutations = {
	SET_LOADING: (state, data) => (state.loading = data),
	SET_SERVANT_INFO: (state, data) => (state.servantInfo = data),
	SET_SERVANTS: (state, data) => (state.servants = data),
};

const actions = {
	async getServants({ commit }) {
		try {
			commit("SET_LOADING", true);
			const res = await GetAllServants();
			commit("SET_SERVANTS", res);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async getServantInfo({ commit }, id) {
		try {
			const res = await GetOneServant(id);
			commit("SET_SERVANT_INFO", res);
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
