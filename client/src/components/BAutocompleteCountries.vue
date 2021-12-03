<template>
	<b-autocomplete
		:value="cname"
		field="cname"
		icon="globe"
		icon-pack="fas"
		clearable
		:disabled="$attrs.disabled"
		:placeholder="placeholder"
		:data="filteredData"
		:loading="isLoading"
		:open-on-focus="true"
		@typing="handleTyping"
		@select="handleSelect"
	>
		<template #empty>No results found</template>
	</b-autocomplete>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "BAutocompleteCountries",

	props: {
		cname: {
			required: true,
		},
		placeholder: {
			type: String,
			default: "Where are you from",
		},
	},

	data() {
		return {
			search: "",
		};
	},

	computed: {
		...mapGetters({
			countries: "country/getCountries",
			isLoading: "country/getLoading",
		}),

		filteredData() {
			if (!this.search) return this.countries;

			return this.countries.filter(e =>
				e.cname.toLowerCase().includes(this.search.toLowerCase())
			);
		},
	},

	methods: {
		handleSelect(option) {
			let val = option;
			if (val) this.searchval = val = option["cname"];
			else this.search = "";
			this.$emit("update:cname", val);
		},

		handleTyping(e) {
			this.search = e;
		},
	},
};
</script>

<style></style>
