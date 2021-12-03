<template>
	<ValidationObserver ref="observer">
		<div class="modal-card" style="max-width: 500px">
			<header class="modal-card-head">
				<p class="modal-card-title">New disease encounter</p>
				<button type="button" class="delete" @click="$emit('close')" />
			</header>
			<section class="modal-card-body">
				<b-field label="Disease code">
					<BAutocompleteDiseases
						:value.sync="data.disease_code"
						@select="handleDiseaseCodeSelect"
					/>
				</b-field>

				<BSelectValidation
					v-model="data.id"
					label="Disease type"
					placeholder="Choose disease type"
					rules="required"
					:loading="isLoadingTypes"
					:disabled="isDiseaseSelected"
					expanded
				>
					<option v-for="d of diseaseTypes" :key="d.id" :value="d.id">
						{{ d.description }}
					</option>
				</BSelectValidation>

				<BInputValidation
					v-model.trim="data.description"
					rules="required"
					label="Description"
					:disabled="isDiseaseSelected"
				/>

				<BInputValidation
					v-model.trim="data.pathogen"
					rules="required"
					label="Pathogen"
					:disabled="isDiseaseSelected"
				/>

				<b-field label="Country encountered">
					<BAutocompleteCountries
						:cname.sync="data.cname"
						placeholder="Select a country"
					/>
				</b-field>

				<b-field label="Select a first encounter date">
					<b-datepicker
						v-model="data.first_enc_date"
						placeholder="Click to select..."
						icon="calendar"
						:icon-right="data.first_enc_date ? 'close-circle' : ''"
						icon-right-clickable
						:max-date="new Date()"
						@icon-right-click="data.first_enc_date = null"
						trap-focus
					>
					</b-datepicker>
				</b-field>

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
				<b-button label="Cancel" @click="$emit('close')" />
				<b-button
					label="Add"
					type="is-primary"
					:loading="isLoadingDiseases"
					@click="handleSubmit"
				/>
			</footer>
		</div>
	</ValidationObserver>
</template>

<script>
import { mapGetters } from "vuex";
import { convertDate } from "@/utils/helpers";

import BAutocompleteDiseases from "@/components/BAutocompleteDiseases";
import BAutocompleteCountries from "@/components/BAutocompleteCountries";

export default {
	name: "DiseasesModal",

	components: {
		BAutocompleteCountries,
		BAutocompleteDiseases,
	},

	data() {
		return {
			data: {
				id: null,
				description: "",
				disease_code: "",
				pathogen: "",
				cname: "",
				first_enc_date: null,
			},
			isDiseaseSelected: false,
			notification: null,
		};
	},

	computed: {
		...mapGetters({
			isLoadingDiseases: "disease/isLoadingDiseases",
			isLoadingTypes: "disease/isLoadingTypes",
			diseaseTypes: "disease/getDiseaseTypes",
		}),
	},

	methods: {
		validate() {
			let message = "";

			if (!this.data.disease_code) {
				console.log(this.data.disease_code);
				message = "Choose existing disease or create a new one";
			} else if (!this.data.cname) {
				message = "Select country from the list";
			} else if (!this.data.first_enc_date) {
				message = "Select first encounter date";
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
				const data = {
					...this.data,
					first_enc_date: convertDate(this.data.first_enc_date),
					pathogen: this.data.pathogen.toLowerCase(),
				};

				const res = await this.$store.dispatch("disease/addDisease", data);

				this.notification = {
					type: "is-success",
					message: res.message || "Disease is successfully added",
				};

				setTimeout(() => this.$emit("close"), 1000);
			} catch (error) {
				this.notification = error;
			}
		},

		handleDiseaseCodeSelect(selected) {
			if (!selected) {
				this.data = { ...this.data, description: "", pathogen: "", id: null };
				this.isDiseaseSelected = false;
				return;
			}
			this.isDiseaseSelected = true;
			this.data = { ...this.data, ...selected };
		},
	},

	beforeCreate() {
		this.$store.dispatch("disease/getDiseaseTypes");
		this.$store.dispatch("disease/getDiseases");
	},
};
</script>

<style></style>
