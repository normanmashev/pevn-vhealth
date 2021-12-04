<template>
	<section class="countries">
		<div class="columns is-multiline">
			<div class="column is-8">
				<CountriesTable per-page="10" />
			</div>
			<div class="column is-4">
				<CountriesInfo />
			</div>
		</div>
	</section>
</template>

<script>
import CountriesInfo from "@/components/CountriesInfo";
import CountriesTable from "@/components/CountriesTable";

export default {
	name: "Countries",

	components: {
		CountriesInfo,
		CountriesTable,
	},
};
</script>

<style></style>
