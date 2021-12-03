<template>
	<span class="b-counter">
		{{ counter | dividingComma }}
	</span>
</template>

<script>
export default {
	name: "BCounter",

	props: {
		initialValue: {
			type: Number,
			default: 0,
		},
		lsItemName: {
			type: String,
			default: "",
		},
	},

	data() {
		return {
			counter: 0,
			interval: false,
		};
	},

	watch: {
		initialValue() {
			this.callCounter();
		},
	},

	filters: {
		dividingComma(x) {
			return x.toLocaleString();
		},
	},

	methods: {
		callCounter(ms = 30) {
			clearInterval(this.interval);

			if (this.initialValue === this.counter) {
				return;
			}

			this.interval = window.setInterval(
				function () {
					if (this.counter != this.initialValue) {
						let change = (this.initialValue - this.counter) / 10;

						change = change >= 0 ? Math.ceil(change) : Math.floor(change);

						this.counter = this.counter + change;

						if (this.lsItemName) {
							localStorage.setItem(
								this.lsItemName,
								JSON.stringify(this.counter)
							);
						}
					}
				}.bind(this),
				ms
			);
		},
	},

	mounted() {
		this.callCounter(1);
	},
};
</script>

<style></style>
