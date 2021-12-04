<template>
	<section class="countries">
		<div class="is-flex is-align-items-center mb-2">
			<h1 class="is-size-5 mr-2">Countries</h1>
			<b-button type="is-ghost" icon-left="plus" @click="showAddModal">
				Add
			</b-button>
		</div>
		<b-table
			:data="data"
			striped
			hoverable
			mobile-cards
			paginated
			:per-page="perPage"
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
				<div class="has-text-centered">No countries</div>
			</template>
		</b-table>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import CountriesModal from "@/components/CountriesModal";

export default {
	name: "CountriesTable",

	components: { CountriesModal },

	props: {
		perPage: {
			type: [Number, String],
			default: 5,
		},
	},

	data() {
		return {
			currentPage: 1,
			fields: [
				{ field: "cname", label: "Country name" },
				{ field: "population", label: "Population" },
			],
		};
	},

	computed: {
		...mapGetters({
			loading: "country/getLoading",
			data: "country/getCountries",
		}),
	},

	methods: {
		async loadData() {
			await this.$store.dispatch("country/getCountries");
		},

		showRowInfo(e) {
			this.$store.dispatch("country/getCountryInfo", e);
		},

		showAddModal() {
			this.$buefy.modal.open({
				parent: this,
				component: CountriesModal,
				hasModalCard: true,
				trapFocus: true,
			});
		},
	},

	mounted() {
		this.loadData();
	},
};
</script>

<style></style>
