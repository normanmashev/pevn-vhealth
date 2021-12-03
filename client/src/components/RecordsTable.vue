<template>
	<section class="records-table">
		<div class="is-flex is-flex-direction-column is-align-items-center mb-2">
			<h1 class="is-size-5 mr-2">Diseases records</h1>
			<legend class="is-size-9">All records from all over the world</legend>
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
			detailed
			detail-key="id"
			detail-transition="fade"
			show-detail-icon
			:opened-detailed="[]"
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
				{{ props.row[field.field] }}
			</b-table-column>

			<template #empty>
				<div class="has-text-centered">No records</div>
			</template>

			<template #detail="props">
				<article class="media">
					<div class="media-content">
						<div class="content">
							<p>
								<strong class="mr-1">
									{{ props.row.name }}
									{{ props.row.surname }}
								</strong>
								<small class="mr-2">{{ props.row.email }}</small>
								<small>31m</small>
								<br />
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
								ornare magna eros, eu pellentesque tortor vestibulum ut.
								Maecenas non massa sem. Etiam finibus odio quis feugiat
								facilisis.
							</p>
						</div>
					</div>
				</article>
			</template>
		</b-table>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "RecordsTable",

	data() {
		return {
			currentPage: 1,
			fields: [
				{ field: "cname", label: "Country" },
				{ field: "fullname", label: "Servant fullname" },
				{ field: "email", label: "Email" },
				{ field: "disease", label: "Disease name & code" },
				{ field: "total_patients", label: "Total patients" },
				{ field: "total_deaths", label: "Total deaths" },
			],
		};
	},

	computed: {
		...mapGetters({
			loading: "records/getLoading",
			data: "records/getRecords",
		}),
	},

	methods: {
		showRowInfo(e) {
			this.$store.dispatch("records/getRecordInfo", e.email);
		},
	},

	mounted() {
		this.$store.dispatch("records/getRecords");
	},
};
</script>

<style></style>
