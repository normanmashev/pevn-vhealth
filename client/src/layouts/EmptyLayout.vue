<template>
	<div class="empty-layout">
		<div class="container">
			<router-view> </router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "EmptyLayout",
};
</script>

<style>
.empty-layout {
	display: flex;
	height: 100vh;
}
.container {
	flex: 1;
}
</style>
