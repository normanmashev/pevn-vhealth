<template>
	<section
		class="
			error-404
			is-flex
			is-flex-direction-column
			is-fullheight
			is-justify-content-center
			is-align-items-center
		"
	>
		<h1 class="is-size-2 has-text-weight-bold">404. Not found</h1>
		<b-button class="is-primary" @click="$router.back()"> Return </b-button>
	</section>
</template>

<script>
export default {
	name: "Error404",
};
</script>

<style lang="scss" scoped>
.error-404 {
	@include bgImg(404, svg);
}
</style>
