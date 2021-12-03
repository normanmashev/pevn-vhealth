<template>
	<artice class="columns">
		<div class="column is-12">
			<h1 class="is-size-2">{{ info | getFullname }}</h1>
			<h5 class="is-size-7">{{ info.role }}</h5>
		</div>
	</artice>
</template>

<script>
export default {
	name: "UserInfo",

	props: {
		info: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style></style>
