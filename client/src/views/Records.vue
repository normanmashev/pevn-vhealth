<template>
	<section class="records column is-multiline">
		<div class="column">
			<RecordsTable />
		</div>
		<div v-if="role !== 'doctor'" class="column">
			<RecordsServant />
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

import RecordsTable from "@/components/RecordsTable";
import RecordsServant from "@/components/RecordsServant";

export default {
	name: "Records",

	components: {
		RecordsTable,
		RecordsServant,
	},

	computed: {
		...mapGetters({
			role: "user/getUserRole",
		}),
	},
};
</script>

<style lang="scss" scoped>
.columns,
.column {
	padding: 0 !important;
}
</style>
