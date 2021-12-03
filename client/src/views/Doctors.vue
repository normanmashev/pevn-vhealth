<template>
	<section class="doctors">
		<DoctorsTable />
		<br />
		<transition name="fade">
			<DoctorInfo v-if="doctorInfo" :data="doctorInfo" />
		</transition>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

import DoctorInfo from "@/components/DoctorInfo";
import DoctorsTable from "@/components/DoctorsTable";

export default {
	name: "Servants",

	components: {
		DoctorInfo,
		DoctorsTable,
	},

	computed: {
		...mapGetters({
			doctorInfo: "doctors/getDoctorInfo",
		}),
	},
};
</script>

<style></style>
