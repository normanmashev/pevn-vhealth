<template>
	<article class="records-servant columns is-multiline">
		<div class="column is-12">
			<h1 class="is-size-4">My records list</h1>
			<p class="is-size-9 has-text-grey">
				Click on a row to modify the information about record
			</p>
		</div>
		<div class="column is-8">
			<RecordsServantTable />
		</div>
		<div class="column">
			<RecordsServantForm />
		</div>
	</article>
</template>

<script>
import RecordsServantForm from "@/components/RecordsServantForm";
import RecordsServantTable from "@/components/RecordsServantTable";

export default {
	name: "RecordsServant",

	components: {
		RecordsServantForm,
		RecordsServantTable,
	},
};
</script>

<style></style>
