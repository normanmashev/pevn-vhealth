<template>
	<ValidationObserver ref="observer">
		<div class="modal-card" style="max-width: 400px">
			<header class="modal-card-head">
				<p class="modal-card-title">Add new country</p>
				<button type="button" class="delete" @click="$emit('close')" />
			</header>
			<section class="modal-card-body">
				<BInputValidation
					v-model.trim="data.cname"
					rules="required"
					label="Country name"
				/>

				<BInputValidation
					v-model.trim="data.population"
					rules="required"
					type="number"
					min="1"
					label="Population"
				/>

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
					:loading="loading"
					@click="handleSubmit"
				/>
			</footer>
		</div>
	</ValidationObserver>
</template>

<script>
import { mapGetters } from "vuex";

import { capitalizeString } from "@/utils/helpers";

export default {
	name: "CountriesModal",

	data() {
		return {
			data: {
				cname: "",
				population: "",
			},
			notification: null,
		};
	},

	computed: {
		...mapGetters({
			loading: "country/getLoading",
		}),
	},

	methods: {
		async handleSubmit() {
			this.notification = null;
			const vee = await this.$refs.observer.validate();

			if (!vee) return;

			this.data.cname = capitalizeString(this.data.cname);

			try {
				const res = await this.$store.dispatch("country/addCountry", this.data);

				this.notification = {
					type: "is-success",
					message: res.message || "Country is successfully added",
				};

				setTimeout(() => this.$emit("close"), 1000);
			} catch (error) {
				this.notification = error;
			}
		},
	},
};
</script>

<style></style>
