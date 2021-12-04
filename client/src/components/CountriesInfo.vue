<template>
	<aside
		class="
			countries-info
			is-flex is-flex-direction-column is-justify-content-space-between
		"
	>
		<div
			class="is-flex is-flex-direction-column is-justify-content-center mb-4"
		>
			<h1 class="is-size-5">Country info</h1>
			<p class="has-text-grey is-size-9">
				Here will appear information about chosen country
			</p>
		</div>
		<div v-if="countryInfo" class="countries-info__content">
			<p class="countries-info__paragraph">
				<span> <b>Country name:</b> {{ countryInfo.country.cname }} </span>
				<span>
					<b>Population:</b>
					{{ Number(countryInfo.country.population).toLocaleString() }}
				</span>
			</p>
			<p class="countries-info__paragraph">
				<span>
					<b>Doctors:</b>
					<span v-if="!countryInfo.doctors.length" class="has-text-grey">
						Not found.
					</span>
					<ul v-else>
						<li v-for="d of countryInfo.doctors" :key="d.id">
							{{ d.fullname }}
						</li>
					</ul>
				</span>

				<span>
					<b>Servants:</b>
					<span v-if="!countryInfo.servants.length" class="has-text-grey">
						Not found.
					</span>
					<ul v-else>
						<li v-for="s of countryInfo.servants" :key="s.id">
							{{ s.fullname }}
						</li>
					</ul>
				</span>
			</p>
			<p class="countries-info__paragraph">
				<span>
					<b>Records:</b>
					<span v-if="!countryInfo.records.length" class="has-text-grey">
						Not found.
					</span>
					<ul v-else>
						<li v-for="r of countryInfo.records" :key="r.disease_code">
							{{ `${r.description} (${r.disease_code})` }}
						</li>
					</ul>
				</span>
			</p>
		</div>
		<div v-if="countryInfo" class="countries-info__footer">
			<b-button
				class="mr-2"
				type="is-info is-light"
				@click="showPopulationModal"
			>
				Change population
			</b-button>
			<b-button
				type="is-danger is-light"
				icon-left="trash"
				@click="showConfirmDialog"
			>
				Delete country
			</b-button>
		</div>
	</aside>
</template>

<script>
import { mapGetters } from "vuex";
import CountryPopulationModal from "@/components/CountryPopulationModal";

export default {
	name: "CountriesInfo",

	components: { CountryPopulationModal },

	data() {
		return {
			number: 32412341,
		};
	},

	computed: {
		...mapGetters({
			countryInfo: "country/getCountryInfo",
		}),
	},

	methods: {
		async deleteCountry() {
			try {
				const res = await this.$store.dispatch(
					"country/deleteCountry",
					this.countryInfo.country.cname
				);
				this.$buefy.toast.open({
					message: res.message,
					type: "is-success",
				});
			} catch (error) {
				this.$buefy.toast.open(error);
			}
		},

		showConfirmDialog() {
			this.$buefy.dialog.confirm({
				title: "Deleting country",
				message:
					"Are you sure you want to <b>delete</b> this country? This action cannot be undone.",
				confirmText: "Delete country",
				type: "is-danger",
				hasIcon: true,
				onConfirm: () => this.deleteCountry(),
			});
		},

		showPopulationModal() {
			this.$buefy.modal.open({
				parent: this,
				props: {
					country: this.countryInfo.country,
				},
				component: CountryPopulationModal,
				hasModalCard: true,
				trapFocus: true,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.countries-info {
	&__paragraph {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
}
</style>
