<template>
	<b-navbar shadow wrapper-class="container">
		<template #brand>
			<b-navbar-item tag="router-link" to="/">
				<img alt="Vue logo" src="../assets/logo.png" />
			</b-navbar-item>
		</template>
		<template #start>
			<b-navbar-item
				v-for="link of links"
				:key="link.link"
				:to="link.to"
				tag="router-link"
			>
				{{ link.link }}
			</b-navbar-item>
		</template>

		<template #end>
			<b-navbar-item tag="div">
				<div class="buttons">
					<b-button
						type="is-primary"
						icon-left="user"
						@click="$router.push('/profile')"
					>
						Profile
					</b-button>
					<b-button
						type="is-secondary is-light"
						icon-left="sign-out-alt"
						@click="handleLogout"
					>
						Logout
					</b-button>
				</div>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
export default {
	name: "Navbar",
	data() {
		return {
			links: [
				{ link: "Home", to: "/" },
				{ link: "Diseases", to: "/diseases" },
				{ link: "Countries", to: "/countries" },
				{ link: "Public servants", to: "/servants" },
				{ link: "Doctors", to: "/doctors" },
				{ link: "Records", to: "/records" },
			],
		};
	},

	methods: {
		handleLogout() {
			this.$store.dispatch("user/logout");
			this.$router.push("/login");
		},
	},
};
</script>

<style></style>
