<template>
	<section class="diseases">
		<div class="columns is-multiline">
			<div class="column is-8">
				<DiseasesTable per-page="10" />
			</div>
			<div class="column is-4">
				<DiseasesInfo />
			</div>
		</div>
	</section>
</template>

<script>
import DiseasesInfo from "@/components/DiseasesInfo";
import DiseasesTable from "@/components/DiseasesTable";

export default {
	name: "Diseases",

	components: {
		DiseasesInfo,
		DiseasesTable,
	},
};
</script>

<style></style>
