<template>
	<section class="login columns is-vcentered is-centered py-6">
		<div class="card column is-7 is-10-mobile is-offset-1-mobile">
			<ValidationObserver ref="observer">
				<div class="card-content">
					<h1 class="is-size-4">VHealth application authorization</h1>
					<legend>
						<router-link to="/register">Sign up</router-link>
						if you don't have an account yet
					</legend>

					<hr />

					<BInputValidation
						v-model.trim="data.email"
						rules="required|email"
						label="Email"
						placeholder="e.g. john.doe@example.com"
					/>

					<BInputValidation
						v-model.trim="data.password"
						rules="required"
						vid="password"
						type="password"
						label="Password"
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

					<b-button class="mt-3" type="is-primary" @click="handleLogin">
						<!-- validate().then(handleLogin) -->
						Login
					</b-button>
				</div>
			</ValidationObserver>
		</div>
	</section>
</template>

<script>
export default {
	name: "Login",

	data() {
		return {
			data: {
				email: "",
				password: "",
			},
			notification: null,
			loading: false,
		};
	},

	methods: {
		async handleLogin() {
			this.notification = null;

			const vee = await this.$refs.observer.validate();

			if (!vee) return;

			try {
				this.loading = true;

				const res = await this.$store.dispatch("user/login", this.data);

				this.notification = {
					type: "is-success",
					message:
						"You are logged in! You will be redirected to the home page in a moment..",
				};

				setTimeout(() => this.$router.push("/"), 1000);
			} catch (error) {
				console.error(error);
				this.notification = {
					type: "is-danger",
					message: error.message,
				};
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>

<style scoped>
.login {
	height: 100% !important;
	background-image: url("../assets/login.svg");
	background-repeat: no-repeat;
	background-position: 50% 100%;
	background-size: 300px;
}
</style>
