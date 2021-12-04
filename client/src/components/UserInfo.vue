<template>
	<article class="columns">
		<div v-if="info" class="column is-12">
			<h1 class="is-size-2">{{ info | getFullname }}</h1>
			<h5 class="is-size-7">{{ info.role }}</h5>
			<section class="is-size-12 mt-5">
				<ValidationObserver ref="observer">
					<div class="columns">
						<div class="column is-4">
							<BInputValidation
								v-model.trim="data.name"
								rules="required"
								label="Name"
							/>
						</div>
						<div class="column is-4">
							<BInputValidation
								v-model.trim="data.surname"
								rules="required"
								label="Surname"
							/>
						</div>
						<div class="column is-4">
							<b-field label="Country">
								<BAutocompleteCountries :cname.sync="data.cname" disabled />
							</b-field>
						</div>
					</div>

					<div class="columns">
						<div class="column is-4">
							<BInputValidation
								v-model.trim="data.phone"
								v-mask="'+7-###-###-##-##'"
								rules="required|length:16"
								label="Phone number"
								placeholder="+7-___-___-__-__"
							/>
						</div>
						<div class="column is-4">
							<BInputValidation
								v-model="data.salary"
								label="Salary"
								placeholder="In Dollar US."
								rules="required|numeric|min_value:0"
								vid="number"
							/>
						</div>
						<div class="column is-4">
							<BInputValidation
								v-model.trim="data.email"
								rules="required|email"
								label="Email"
								placeholder="e.g. john.doe@example.com"
								disabled
							/>
						</div>
					</div>

					<div class="columns">
						<div v-if="data.role === 'Doctor'" class="column is-4">
							<BSelectValidation
								v-model.trim="data.degree"
								label="Degree"
								placeholder="Choose doctoral degree"
								rules="required"
								expanded
							>
								<option v-for="d of DEGREES" :key="d" :value="d">
									{{ d }}
								</option>
							</BSelectValidation>
						</div>
						<div v-else-if="data.role !== null" class="column is-4">
							<BSelectValidation
								v-model.trim="data.department"
								label="Department"
								placeholder="Choose your department"
								rules="required"
								expanded
							>
								<option
									v-for="d of DEPARTMENTS"
									:key="d"
									:value="d.toLowerCase()"
								>
									{{ d }}
								</option>
							</BSelectValidation>
						</div>
						<div v-if="data.role === 'Doctor'" class="column is-4">
							<b-field label="Specializations">
								<b-select multiple native-size="4" v-model="data.specialize">
									<option v-for="d of diseaseTypes" :key="d.id" :value="d.id">
										{{ d.description }}
									</option>
								</b-select>
							</b-field>
						</div>
					</div>

					<b-button type="is-primary" @click="handleSubmit"
						>Save changes</b-button
					>

					<b-notification
						v-if="notification"
						class="mt-3"
						:type="notification.type + ' is-light'"
						aria-close-label="Close notification"
						role="alert"
					>
						{{ notification.message }}
					</b-notification>
				</ValidationObserver>
			</section>
		</div>
	</article>
</template>

<script>
import { DEPARTMENTS, DEGREES } from "@/utils/variables";
import BAutocompleteCountries from "@/components/BAutocompleteCountries";
import { mapGetters } from "vuex";

export default {
	name: "UserInfo",

	components: {
		BAutocompleteCountries,
	},

	props: {
		info: {
			required: true,
		},
	},

	data() {
		return {
			DEGREES,
			DEPARTMENTS,
			data: {
				email: "",
				name: "",
				surname: "",
				salary: null,
				phone: "",
				cname: null,
				password: "",
				confirmPassword: "",
				specialize: [],
				role: null,
				department: null,
				degree: null,
			},
			notification: null,
		};
	},

	computed: {
		...mapGetters({
			diseaseTypes: "disease/getDiseaseTypes",
		}),
	},

	watch: {
		info() {
			this.data = { ...this.info };
			console.log(this.data);
		},
	},

	methods: {
		validate() {
			let message = "";

			if (!this.data.cname) {
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

			if (!this.validate() || !vee) return;

			try {
				const res = await this.$store.dispatch("user/updateUser", this.data);

				this.notification = {
					type: "is-success",
					message: res.message,
				};
			} catch (error) {
				this.notification = error;
			}
		},
	},

	beforeCreate() {
		this.$store.dispatch("disease/getDiseaseTypes");
	},
};
</script>

<style></style>
