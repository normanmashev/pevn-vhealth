import Vue from "vue";
import { convertYodaDate, getFullname } from "./helpers";

Vue.filter("getFullname", getFullname);

Vue.filter("convertYodaDate", convertYodaDate);
