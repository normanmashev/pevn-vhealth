<template>
	<section class="servants-table">
		<div class="is-flex is-flex-direction-column is-align-items-center mb-2">
			<h1 class="is-size-5 mr-2">Public servants</h1>
			<legend class="is-size-9">
				You can click on a row to see more information about servant
			</legend>
		</div>
		<b-table
			:data="data"
			striped
			hoverable
			mobile-cards
			paginated
			per-page="10"
			pagination-simple
			pagination-position="bottom"
			sort-icon="chevron-up"
			sort-icon-size="is-small"
			default-sort="diseasecode"
			:current-page.sync="currentPage"
			:loading="loading"
			@click="showRowInfo"
		>
			<b-table-column
				v-for="field of fields"
				:key="field.field"
				v-bind="field"
				v-slot="props"
				sortable
			>
				{{ props.row[field.field] }}
			</b-table-column>

			<template #empty>
				<div class="has-text-centered">No public servants</div>
			</template>
		</b-table>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "ServantsTable",

	data() {
		return {
			currentPage: 1,
			fields: [
				{ field: "name", label: "Name" },
				{ field: "surname", label: "Surname" },
				{ field: "email", label: "Email" },
				{ field: "department", label: "Department" },
				{ field: "cname", label: "Lives in" },
			],
		};
	},

	computed: {
		...mapGetters({
			loading: "servants/getLoading",
			data: "servants/getServants",
		}),
	},

	methods: {
		showRowInfo(e) {
			this.$store.dispatch("servants/getServantInfo", e.email);
		},
	},

	mounted() {
		this.$store.dispatch("servants/getServants");
	},
};
</script>

<style></style>
