<template>
	<section class="doctors-table">
		<div class="is-flex is-flex-direction-column is-align-items-center mb-2">
			<h1 class="is-size-5 mr-2">Doctors</h1>
			<legend class="is-size-9">
				You can click on a row to see more information about doctor
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

			<b-table-column field="specialize" label="Specialize" v-slot="props">
				<span v-if="!props.row['specialize']" class="has-text-grey">
					No specializations
				</span>
				<span v-else>{{ props.row["specialize"] }}</span>
			</b-table-column>
			<template #empty>
				<div class="has-text-centered">No doctors</div>
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
				{ field: "cname", label: "Lives in" },
				{ field: "degree", label: "Degree" },
				{ field: "salary", label: "Salary" },
			],
		};
	},

	computed: {
		...mapGetters({
			loading: "doctors/getLoading",
			data: "doctors/getDoctors",
		}),
	},

	methods: {
		showRowInfo(e) {
			this.$store.dispatch("doctors/getDoctorInfo", e.email);
		},
	},

	mounted() {
		this.$store.dispatch("doctors/getDoctors");
	},
};
</script>

<style></style>
