import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";
import cookies from "@/utils/cookies";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		meta: {
			title: "Home",
			requireAuth: true,
		},
		component: () => import("@/views/Home.vue"),
	},
	{
		path: "/doctors",
		name: "Doctors",
		meta: {
			title: "Doctors",
			requireAuth: true,
		},
		component: () => import("@/views/Doctors.vue"),
	},
	{
		path: "/profile",
		name: "Profile",
		meta: {
			title: "Profile",
			requireAuth: true,
		},
		component: () => import("@/views/Profile.vue"),
	},
	{
		path: "/records",
		name: "Records",
		meta: {
			title: "Records",
			requireAuth: true,
		},
		component: () => import("@/views/Records.vue"),
	},
	{
		path: "/servants",
		name: "PublicServants",
		meta: {
			title: "Public servants",
			requireAuth: true,
		},
		component: () => import("@/views/Servants.vue"),
	},
	{
		path: "/register",
		name: "Register",
		meta: {
			title: "Registration",
			layout: "empty",
			requireAuth: false,
			noAccessAuth: true,
		},
		component: () => import("@/views/Register.vue"),
	},
	{
		path: "/login",
		name: "Login",
		meta: {
			title: "Authorization",
			layout: "empty",
			requireAuth: false,
			noAccessAuth: true,
		},
		component: () => import("@/views/Login.vue"),
	},
	{
		path: "*",
		name: "Error404",
		meta: {
			title: "404. Not found",
			layout: "empty",
			requireAuth: false,
		},
		component: () => import("@/views/Error404.vue"),
	},
];

const router = new VueRouter({
	routes,
	mode: "history",
	linkActiveClass: "is-active",
	linkExactActiveClass: "is-active",
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = store.getters["user/isAuthenticated"];
	const token = cookies.getToken();

	document.title = to.meta.title;

	if (to.meta.requireAuth && (!isAuthenticated || !token)) {
		next("/login");
	} else if (to.meta.noAccessAuth && isAuthenticated && token) {
		next("/");
	} else {
		next();
	}
});

export default router;
