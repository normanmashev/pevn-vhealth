<template>
	<section class="servants">
		<ServantsTable />
		<br />
		<transition name="fade">
			<ServantInfo v-if="servantInfo" :data="servantInfo" />
		</transition>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

import ServantInfo from "@/components/ServantInfo";
import ServantsTable from "@/components/ServantsTable";

export default {
	name: "Servants",

	components: {
		ServantInfo,
		ServantsTable,
	},

	computed: {
		...mapGetters({
			servantInfo: "servants/getServantInfo",
		}),
	},
};
</script>

<style></style>
