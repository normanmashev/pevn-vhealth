import Vue from "vue";
import { getFullname } from "./helpers";

Vue.filter("getFullname", getFullname);
