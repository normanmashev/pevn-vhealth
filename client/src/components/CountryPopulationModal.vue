<template>
	<ValidationObserver ref="observer">
		<div class="modal-card" style="max-width: 400px">
			<header class="modal-card-head">
				<p class="modal-card-title">Change population</p>
				<button type="button" class="delete" @click="$emit('close')" />
			</header>
			<section class="modal-card-body">
				<h2 class="is-size-5">
					Current population of <b>{{ country.cname }}</b>
				</h2>
				<h1 class="is-size-3">
					<b>{{ Number(country.population).toLocaleString() }}</b>
				</h1>

				<p v-if="data.increase || data.decrease">
					Estimated population: {{ Number(estimated).toLocaleString() }}
				</p>

				<div class="columns mt-4">
					<div class="column is-6">
						<b-field label="Increase by">
							<b-input v-model="data.increase" type="number" min="0"></b-input>
						</b-field>
					</div>
					<div class="column is-6">
						<b-field label="Decrease by">
							<b-input v-model="data.decrease" type="number" min="0"></b-input>
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
				<b-button label="Cancel" @click="$emit('close')" />
				<b-button
					label="Update"
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
	name: "CountriesPopulationModal",

	props: {
		country: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			data: {
				increase: 0,
				decrease: 0,
			},
			notification: null,
		};
	},

	computed: {
		...mapGetters({
			loading: "country/getLoading",
		}),
		estimated() {
			return (
				+this.country.population + +this.data.increase - +this.data.decrease
			);
		},
	},

	methods: {
		async customValidation() {
			let message;

			if (+this.data.increase < 0 || this.data.decrease < 0) {
				message = "Enter non-negative number";
			}

			this.notification = {
				type: "is-danger",
				message,
			};

			return !message;
		},

		async handleSubmit() {
			this.notification = null;
			const vee = await this.$refs.observer.validate();

			if (!vee || !this.customValidation()) return;

			const data = {
				cname: this.country.cname,
				population: +this.estimated,
			};

			try {
				const res = await this.$store.dispatch("country/updateCountry", data);

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
