import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/styles.scss";

import * as VeeValidate from "vee-validate";
import {
	ValidationProvider,
	ValidationObserver,
} from "vee-validate/dist/vee-validate.full.esm";
import BInputValidation from "@/components/app/BInputValidation";
import BSelectValidation from "@/components/app/BSelectValidation";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("BInputValidation", BInputValidation);
Vue.component("BSelectValidation", BSelectValidation);

import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);

import Buefy from "buefy";
import "buefy/dist/buefy.css";

import { library } from "@fortawesome/fontawesome-svg-core";
// internal icons
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.use(VeeValidate, { inject: false });
Vue.use(Buefy, {
	defaultIconComponent: "vue-fontawesome",
	defaultIconPack: "fas",
	customIconPacks: {
		fas: {
			sizes: {
				default: "lg",
				"is-small": "1x",
				"is-medium": "2x",
				"is-large": "3x",
			},
			iconPrefix: "",
		},
	},
});

import "./utils/filters";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
