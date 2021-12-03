<template>
	<div id="app">
		<component :is="`${layout}-layout`">
			<router-view />
		</component>
	</div>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
export default {
	name: "App",

	components: { BaseLayout, EmptyLayout },

	computed: {
		layout() {
			return this.$route.meta.layout || "base";
		},
	},

	created() {
		this.$store.dispatch("country/getCountries");
	},
};
</script>
