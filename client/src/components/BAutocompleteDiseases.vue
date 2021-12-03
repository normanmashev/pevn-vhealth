<template>
	<div class="b-autocomplete-diseases">
		<b-autocomplete
			field="disease_code"
			clearable
			:placeholder="placeholder"
			:data="filteredData"
			:loading="isLoading"
			:open-on-focus="true"
			@typing="handleTyping"
			@select="handleSelect"
		>
			<template #empty>No results found, you can add it as new one</template>
		</b-autocomplete>
		<legend></legend>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "BAutocompleteDiseases",

	props: {
		value: {
			required: true,
		},
		placeholder: {
			type: String,
			default: "Choose existing one or type a new code",
		},
	},

	data() {
		return {
			search: "",
		};
	},

	computed: {
		...mapGetters({
			diseases: "disease/getDiseases",
			isLoading: "disease/isLoadingDiseases",
		}),

		filteredData() {
			if (!this.search) return this.diseases;

			return this.diseases.filter(e =>
				e.disease_code.toLowerCase().includes(this.search.toLowerCase())
			);
		},
	},

	methods: {
		handleSelect(option) {
			let val = option;
			if (option) val = option["cname"];
			this.$emit("update:value", val);
			this.$emit("select", option);
		},

		handleTyping(e) {
			this.search = e;
			this.$emit("update:value", this.search);
		},
	},
};
</script>

<style></style>
