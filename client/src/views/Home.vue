<template>
	<div class="home columns is-multiline">
		<div class="column is-12">
			<HomeWelcome />
		</div>
		<div class="column is-8">
			<DiseasesTable />
		</div>
		<div class="column is-4">
			<CountriesTable />
		</div>
		<div class="column is-12">
			<HomeDangerous />
		</div>
		<div class="column is-12">
			<HomeServants />
		</div>
	</div>
</template>

<script>
import CountriesTable from "@/components/CountriesTable";
import DiseasesTable from "@/components/DiseasesTable";
import HomeWelcome from "@/components/HomeWelcome";
import HomeDangerous from "@/components/HomeDangerous";
import HomeServants from "@/components/HomeServants";

export default {
	name: "Home",

	components: {
		CountriesTable,
		DiseasesTable,
		HomeDangerous,
		HomeServants,
		HomeWelcome,
	},
};
</script>
