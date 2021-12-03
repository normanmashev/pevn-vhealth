<template>
	<div class="base-layout">
		<TheNavbar />
		<main class="main py-5">
			<div class="container">
				<router-view />
			</div>
		</main>
		<TheFooter />
	</div>
</template>

<script>
import TheFooter from "@/components/TheFooter";
import TheNavbar from "@/components/TheNavbar";
export default {
	name: "BaseLayout",

	components: {
		TheNavbar,
		TheFooter,
	},
};
</script>

<style lang="scss" scoped>
.base-layout {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.main {
	flex-grow: 1;
}
</style>
