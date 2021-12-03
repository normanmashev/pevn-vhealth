import {
	AddRecord,
	DeleteRecord,
	GetAllRecords,
	GetOneRecord,
	GetServantRecords,
	UpdateRecord,
} from "@/api/records";

import { getFullname } from "@/utils/helpers";

const state = {
	loading: true,
	records: [],
	recordInfo: null,
	servantRecords: [],
};

const getters = {
	getRecords: state => state.records,
	getRecordInfo: state => state.recordInfo,
	getLoading: state => state.loading,
	getServantRecords: state => state.servantRecords,
};

const mutations = {
	SET_LOADING: (state, data) => (state.loading = data),
	SET_RECORD_INFO: (state, data) => (state.recordInfo = data),
	SET_RECORDS: (state, data) => (state.records = data),
	SET_SERVANT_RECORDS: (state, data) => (state.servantRecords = data),
};

const actions = {
	async addRecord({ rootGetters, dispatch }, record) {
		try {
			const email = rootGetters["user/getUserInfo"].email;
			const data = { email, ...record };
			let res = await AddRecord(data);
			dispatch("getRecords");
			dispatch("getServantRecords", email);
			return res;
		} catch (error) {
			throw error;
		}
	},

	async getRecords({ commit }) {
		try {
			commit("SET_LOADING", true);
			let res = await GetAllRecords();

			res = res.map(e => {
				const obj = {
					...e,
					fullname: getFullname(e),
					disease: `${e.description} (${e.disease_code})`,
				};
				return obj;
			});

			commit("SET_RECORDS", res);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async getServantRecords({ commit }, id) {
		try {
			commit("SET_LOADING", true);
			const res = await GetServantRecords(id);
			commit("SET_SERVANT_RECORDS", res);
			return res;
		} catch (error) {
			throw error;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async getRecordInfo({ commit }, id) {
		try {
			const res = await GetOneRecord(id);
			commit("SET_RECORD_INFO", res);
			return res;
		} catch (error) {
			throw error;
		}
	},

	async updateRecord({ dispatch }, data) {
		try {
			const res = await UpdateRecord(data);
			dispatch("getRecords");
			dispatch("getServantRecords", data.email);
			return res;
		} catch (error) {
			throw error;
		}
	},

	async deleteRecord({ rootGetters, dispatch }, data) {
		try {
			const email = rootGetters["user/getUserInfo"].email;
			const res = await DeleteRecord({ ...data, email });
			dispatch("getRecords");
			dispatch("getServantRecords", email);
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
