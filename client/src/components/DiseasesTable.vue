<template>
	<section class="diseases-table">
		<div class="is-flex is-align-items-center mb-2">
			<h1 class="is-size-5 mr-2">Diseases</h1>
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
			per-page="5"
			pagination-simple
			pagination-position="bottom"
			sort-icon="chevron-up"
			sort-icon-size="is-small"
			:current-page.sync="currentPage"
			:loading="isLoading"
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
				<div class="has-text-centered">No records</div>
			</template>
		</b-table>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

import DiseasesModal from "@/components/DiseasesModal";

export default {
	name: "DiseasesTable",

	components: {
		DiseasesModal,
	},

	props: {
		extended: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			currentPage: 1,
			fields: [
				// { field: "diseaseId", label: "ID" },
				{ field: "disease_type_name", label: "Disease type" },
				{ field: "disease_code", label: "Disease code" },
				{ field: "pathogen", label: "Pathogen" },
				{ field: "description", label: "Description" },
			],
			fieldsExtended: [
				{ field: "disease_type_name", label: "Disease type" },
				{ field: "disease_code", label: "Disease code" },
				{ field: "pathogen", label: "Pathogen" },
				{ field: "description", label: "Description" },
			],
		};
	},

	computed: {
		...mapGetters({
			data: "disease/getDiseases",
			isLoading: "disease/isLoadingDiseases",
		}),
	},

	methods: {
		showAddModal() {
			this.$buefy.modal.open({
				parent: this,
				width: 700,
				component: DiseasesModal,
				hasModalCard: true,
				trapFocus: true,
			});
		},
	},

	created() {
		if (this.extended) {
			this.fields = { ...this.fields, ...this.fieldsExtended };
		}
	},

	mounted() {
		this.$store.dispatch("disease/getDiseases");
	},
};
</script>

<style></style>
