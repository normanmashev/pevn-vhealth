<template>
	<ValidationProvider
		:vid="vid"
		:name="$attrs.name || $attrs.label"
		:rules="rules"
	>
		<b-field
			slot-scope="{ errors, valid }"
			v-bind="$attrs"
			:type="{ 'is-danger': errors[0], 'is-success': valid }"
			:message="errors"
		>
			<b-input v-model="innerValue" v-bind="$attrs"></b-input>
		</b-field>
	</ValidationProvider>
</template>

<script>
// https://codesandbox.io/s/jj9q8r47p3?file=/src/main.js:303-343

export default {
	name: "BInputValidation",

	components: {},

	props: {
		vid: {
			type: String,
		},
		rules: {
			type: [Object, String],
			default: "",
		},
		// must be included in props
		value: {
			type: null,
		},
	},

	data: () => ({
		innerValue: "",
	}),

	watch: {
		// Handles internal model changes.
		innerValue(newVal) {
			this.$emit("input", newVal);
		},
		// Handles external model changes.
		value(newVal) {
			this.innerValue = newVal;
		},
	},

	created() {
		if (this.value) {
			this.innerValue = this.value;
		}
	},
};
</script>
