<template>
	<section class="records-servant-table">
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
				sortable
				v-slot="props"
			>
				<span v-if="field.field === 'disease'">
					{{ `${props.row["description"]} (${props.row["disease_code"]})` }}
				</span>
				<span v-else>
					{{ props.row[field.field] }}
				</span>
			</b-table-column>

			<template #empty>
				<div class="has-text-centered">
					<span class="has-text-link">No own records.</span> Add your first
					record in the form on the right
				</div>
			</template>
		</b-table>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "RecordsServantTable",

	data() {
		return {
			currentPage: 1,
			fields: [
				{ field: "cname", label: "Country" },
				{ field: "disease", label: "Disease name & code" },
				{ field: "total_patients", label: "Total patients" },
				{ field: "total_deaths", label: "Total deaths" },
			],
		};
	},

	computed: {
		...mapGetters({
			loading: "records/getLoading",
			data: "records/getServantRecords",
			userInfo: "user/getUserInfo",
		}),
	},

	methods: {
		showRowInfo(e) {
			this.$store.commit("records/SET_RECORD_INFO", { ...e, exist: true });
		},
	},

	mounted() {
		this.$store.dispatch("records/getServantRecords", this.userInfo.email);
	},
};
</script>

<style></style>
