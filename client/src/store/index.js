import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";

// * Auto import store modules
const context = require.context("./modules");
const modules = {};

context.keys().forEach(file => {
	const moduleName = file.replace(/(\.\/|\/*\.js$)/g, "");
	modules[moduleName] = context(file).default || context(file);
	modules[moduleName].namespaced = true;
});

// * Secure localeStorage from VuexPersistedState package
// const ls = new SecureLS({ isCompression: false });

// * Register Vuex directive
Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules,
	plugins: [
		createPersistedState({
			paths: ["user"],
			// storage: {
			// 	getItem: key => ls.get(key),
			// 	setItem: (key, value) => ls.set(key, value),
			// 	removeItem: key => ls.remove(key),
			// },
		}),
	],
});
