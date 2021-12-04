<template>
	<aside
		class="
			diseases-info
			is-flex is-flex-direction-column is-justify-content-space-between
		"
	>
		<div
			class="is-flex is-flex-direction-column is-justify-content-center mb-4"
		>
			<h1 class="is-size-5">Disease info</h1>
			<p class="has-text-grey is-size-9">
				Here will appear information about chosen disease
			</p>
		</div>
		<div v-if="diseaseInfo" class="diseases-info__content">
			<p class="diseases-info__paragraph">
				<span> <b>Disease name:</b> {{ diseaseInfo.description }} </span>
				<span>
					<b>Disease code:</b>
					{{ diseaseInfo.disease_code }}
				</span>
			</p>
			<p class="diseases-info__paragraph">
				<span> <b>Pathogen:</b> {{ diseaseInfo.pathogen }} </span>
				<span>
					<b>Disease type:</b>
					{{ diseaseInfo.disease_type }}
				</span>
			</p>
			<p class="diseases-info__paragraph">
				<span>
					<b>Encounters:</b>
					<p v-if="!diseaseInfo.encounters.length" class="has-text-grey">
						Not found.
					</p>
					<ul v-else>
						<li
							v-for="e of diseaseInfo.encounters"
							:key="e.cname"
							class="encounter"
							@dblclick="showConfirmDialog(e)"
						>
							<b-tooltip
								label="Double click to delete"
								position="is-right"
								size="is-small"
							>
								{{ e.cname }} at {{ e.first_enc_date | convertYodaDate }}
							</b-tooltip>
						</li>
					</ul>
				</span>
			</p>
		</div>
	</aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "DiseasesInfo",

	computed: {
		...mapGetters({
			diseaseInfo: "disease/getDiseaseInfo",
		}),
	},

	methods: {
		async deleteDiseaseEncounter(e) {
			const res = await this.$store.dispatch(
				"disease/deleteDiseaseEncounter",
				e
			);

			this.$buefy.toast.open({
				message: res.message,
				type: "is-success",
			});
		},

		showConfirmDialog(e) {
			this.$buefy.dialog.confirm({
				title: "Deleting disease counter",
				message:
					"Are you sure you want to <b>delete</b> this disease encounter? This action cannot be undone.",
				confirmText: "Delete encounter",
				type: "is-danger",
				hasIcon: true,
				onConfirm: () => this.deleteDiseaseEncounter(e),
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.diseases-info {
	&__paragraph {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
}
.encounter {
	cursor: pointer;
	&:hover {
		text-decoration: line-through;
	}
}
</style>
