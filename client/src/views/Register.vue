<template>
	<section class="register columns is-centered py-6">
		<ValidationObserver
			ref="observer"
			class="column is-7 is-10-mobile is-offset-1-mobile"
		>
			<div class="card">
				<div class="card-content">
					<h1 class="is-size-4">Welcome to the VHealth application</h1>
					<legend>
						<router-link to="/login">Sign in</router-link>
						if you already have an account
					</legend>

					<hr />

					<BInputValidation
						v-model.trim="data.name"
						rules="required"
						label="Name"
					/>

					<BInputValidation
						v-model.trim="data.surname"
						rules="required"
						label="Surname"
					/>

					<b-field label="Country">
						<BAutocompleteCountries :cname.sync="data.cname" />
					</b-field>

					<BInputValidation
						v-model.trim="data.phone"
						v-mask="'+7-###-###-##-##'"
						rules="required|length:16"
						label="Phone number"
						placeholder="+7-___-___-__-__"
					/>

					<BInputValidation
						v-model.trim="data.email"
						rules="required|email"
						label="Email"
						placeholder="e.g. john.doe@example.com"
					/>

					<b-field
						label="Password"
						:type="{ 'is-danger': passwordCheck.error }"
						:message="[
							{
								'At least 4 characters': passwordCheck.length,
								'At least 1 digit': passwordCheck.digit,
								'At least 1 special character': passwordCheck.special,
								'At least 1 uppercase letter': passwordCheck.uppercase,
							},
						]"
					>
						<b-input v-model.trim="data.password" type="password"></b-input>
					</b-field>

					<b-field
						label="Confirm password"
						:type="{ 'is-danger': isPasswordsMatch }"
						:message="{ 'Passwords do not match': isPasswordsMatch }"
					>
						<b-input
							v-model.trim="data.confirmPassword"
							type="password"
							placeholder="Repeat the password you entered"
							password-reveal
						></b-input>
					</b-field>

					<div class="columns mb-0">
						<b-field class="column is-12-mobile mb-0">
							<BInputValidation
								v-model="data.salary"
								label="Salary"
								placeholder="In Dollar US."
								rules="required|numeric|min_value:0"
								vid="number"
							/>
						</b-field>

						<b-field class="column is-12-mobile">
							<BSelectValidation
								v-model="data.role"
								label="Role"
								placeholder="Choose your role"
								rules="required"
								expanded
							>
								<option value="doctor">Doctor</option>
								<option value="public">Public servant</option>
							</BSelectValidation>
						</b-field>
					</div>

					<BSelectValidation
						v-if="data.role === 'doctor'"
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

					<BSelectValidation
						v-else-if="data.role !== null"
						v-model.trim="data.department"
						label="Department"
						placeholder="Choose your department"
						rules="required"
						expanded
					>
						<option v-for="d of DEPARTMENTS" :key="d" :value="d.toLowerCase()">
							{{ d }}
						</option>
					</BSelectValidation>

					<b-notification
						v-if="notification"
						:type="notification.type + ' is-light'"
						aria-close-label="Close notification"
						role="alert"
					>
						{{ notification.message }}
					</b-notification>

					<b-button class="mt-3" type="is-primary" @click="handleRegister">
						Save changes
					</b-button>
				</div>
			</div>
		</ValidationObserver>
	</section>
</template>

<script>
import { DEPARTMENTS, DEGREES } from "@/utils/variables";
import BAutocompleteCountries from "@/components/BAutocompleteCountries";

export default {
	name: "Register",

	components: {
		BAutocompleteCountries,
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
				role: null,
				department: null,
				degree: null,
			},
			notification: null,
			loading: false,
		};
	},

	computed: {
		passwordCheck() {
			const { password } = this.data;
			const regex = {
				special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
				digit: /\d/,
				uppercase: /[A-Z]/,
			};
			const L = password.length;

			const check = {
				length: L && password.length < 4,
				digit: L && !regex.digit.test(password),
				uppercase: L && !regex.uppercase.test(password),
				special: L && !regex.special.test(password),
			};

			const error = Object.keys(check).some(key => check[key]);

			return { ...check, error };
		},

		isPasswordsMatch() {
			const { password, confirmPassword } = this.data;
			return confirmPassword.length && confirmPassword != password;
		},
	},

	methods: {
		validate() {
			let message = "";

			if (!this.data.cname) {
				message = "Select country from the list";
			} else if (this.passwordCheck.error) {
				message = "Enter the valid password";
			} else if (!this.data.confirmPassword) {
				message = "Confirm your password";
			} else if (this.isPasswordsMatch) {
				message = "Passwords do not match";
			}

			if (message) {
				this.notification = {
					type: "is-danger",
					message,
				};
			}

			return !message;
		},

		async handleRegister() {
			this.notification = null;

			const vee = await this.$refs.observer.validate();

			if (!this.validate() || !vee) return;

			try {
				this.loading = true;

				await this.$store.dispatch("user/register", this.data);

				this.notification = {
					type: "is-success",
					message:
						"Account has been successfully created! You will be redirected to the login page in a moment..",
				};

				setTimeout(() => this.$router.push("login"), 1000);
			} catch (error) {
				console.error(error);
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>

<style>
.register {
	height: 100% !important;
}
</style>
