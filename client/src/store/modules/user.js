import { Register, Login } from "@/api/auth";
import { getUser } from "@/api/users";

import cookies from "@/utils/cookies";

const state = {
	auth: false,
	userInfo: null,
	loading: false,
};

const getters = {
	isAuthenticated: state => state.auth,
	isLoading: state => state.loading,
	getUserInfo: state => state.userInfo,
	getUserRole: state => state.userInfo.role,
};

const mutations = {
	SET_AUTH: (state, data) => (state.auth = data),
	SET_USER_INFO: (state, data) => (state.userInfo = data),
	SET_LOADING: (state, data) => (state.loading = data),
};

const actions = {
	async getOneUser({ commit }, id) {
		try {
			commit("SET_LOADING", true);
			const res = await getUser(id);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async login({ commit, dispatch }, data) {
		try {
			const res = await Login(data);

			commit("SET_AUTH", true);
			cookies.setToken(res.token);

			const info = await dispatch("getOneUser", res.userInfo.id);
			commit("SET_USER_INFO", info);

			return { message: res.message };
		} catch (error) {
			throw error;
		}
	},

	async register(context, data) {
		try {
			const res = await Register(data);
			return res;
		} catch (error) {
			throw error;
		}
	},

	async logout({ commit }) {
		cookies.removeToken();
		commit("SET_AUTH", false);
		commit("SET_USER_INFO", null);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
