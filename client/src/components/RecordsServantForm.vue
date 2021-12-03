<template>
	<ValidationObserver ref="observer">
		<div class="card">
			<header class="modal-card-head">
				<p class="modal-card-title is-size-5">
					{{ data.exist ? "Update the record" : "Create a new record" }}
				</p>
			</header>
			<section class="modal-card-body">
				<BSelectValidation
					v-model="data.disease_code"
					label="Disease code"
					placeholder="Choose disease code"
					rules="required"
					:loading="isLoadingDiseases"
					expanded
					:disabled="data.exist"
				>
					<option
						v-for="d of diseases"
						:key="d.disease_code"
						:value="d.disease_code"
					>
						{{ d.disease_code }}
					</option>
				</BSelectValidation>

				<b-field label="Country">
					<BAutocompleteCountries
						:cname.sync="data.cname"
						placeholder="Select a country"
						:disabled="data.exist"
					/>
				</b-field>

				<div class="columns">
					<div class="column is-6">
						<BInputValidation
							v-model.trim="data.total_patients"
							type="number"
							rules="required"
							label="Total patients"
							:disabled="data.exist"
						/>
					</div>
					<div class="column is-6">
						<BInputValidation
							v-model.trim="data.total_deaths"
							type="number"
							rules="required"
							label="Total deaths"
							:disabled="data.exist"
						/>
					</div>
				</div>

				<!-- Update no. of patients and deaths -->
				<div v-if="data.exist" class="columns">
					<div class="column is-6">
						<b-field label="Update patients">
							<b-input
								v-model.trim="data.total_patients_update"
								type="number"
								min="0"
							/>
						</b-field>
					</div>
					<div class="column is-6">
						<b-field label="Update deaths">
							<b-input
								v-model.trim="data.total_deaths_update"
								type="number"
								min="0"
							/>
						</b-field>
					</div>
				</div>

				<b-notification
					v-if="notification"
					class="mt-3"
					:type="notification.type + ' is-light'"
					aria-close-label="Close notification"
					role="alert"
				>
					{{ notification.message }}
				</b-notification>
			</section>

			<footer class="modal-card-foot">
				<b-button
					:label="data.exist ? 'Update' : 'Add'"
					type="is-primary"
					:loading="isLoading"
					@click="handleSubmit"
				/>
				<b-button label="Reset" type="is-link is-light" @click="resetForm" />
				<b-button
					v-if="data.exist"
					label="Delete"
					icon-left="trash"
					type="is-danger is-light"
					@click="showConfirmDialog"
				/>
			</footer>
		</div>
	</ValidationObserver>
</template>

<script>
import { mapGetters } from "vuex";

import BAutocompleteCountries from "@/components/BAutocompleteCountries";

export default {
	name: "RecordsServantForm",

	components: {
		BAutocompleteCountries,
	},

	data() {
		return {
			data: {
				cname: "",
				disease_code: null,
				total_patients: null,
				total_deaths: null,
			},
			notification: null,
		};
	},

	computed: {
		...mapGetters({
			isLoading: "records/getLoading",
			isLoadingDiseases: "disease/isLoadingDiseases",
			diseases: "disease/getDiseases",
			recordInfo: "records/getRecordInfo",
		}),
	},

	watch: {
		recordInfo(val) {
			this.data = {
				...val,
				total_deaths_update: null,
				total_patients_update: null,
			};
		},
	},

	methods: {
		validate() {
			let message = "";

			if (!this.data.disease_code) {
				message = "Choose a disease code";
			} else if (!this.data.cname) {
				message = "Select country from the list";
			}

			if (message) {
				this.notification = {
					type: "is-danger",
					message,
				};
			}

			return !message;
		},

		async handleSubmit() {
			this.notification = null;

			const vee = await this.$refs.observer.validate();

			if (!vee || !this.validate()) return;

			try {
				let res;

				if (this.data.exist) {
					res = await this.$store.dispatch("records/updateRecord", this.data);
				} else {
					res = await this.$store.dispatch("records/addRecord", this.data);
				}

				this.notification = {
					type: "is-success",
					message: res.message || "Record is successfully added",
				};

				this.resetForm();
			} catch (error) {
				this.notification = error;
			}
		},

		async deleteRecord() {
			const res = await this.$store.dispatch("records/deleteRecord", this.data);
			this.resetForm();
			this.notification = {
				type: "is-success",
				message: res.message,
			};
		},

		showConfirmDialog() {
			this.$buefy.dialog.confirm({
				title: "Deleting record",
				message:
					"Are you sure you want to <b>delete</b> this record? This action cannot be undone.",
				confirmText: "Delete record",
				type: "is-danger",
				hasIcon: true,
				onConfirm: () => this.deleteRecord(),
			});
		},

		resetForm() {
			this.data = {
				cname: "",
				disease_code: null,
				total_patients: null,
				total_deaths: null,
			};
			this.$refs.observer.reset();
		},
	},

	beforeCreate() {
		this.$store.dispatch("disease/getDiseases");
	},
};
</script>

<style></style>
