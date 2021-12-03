<template>
	<section class="home-welcome columns">
		<div class="column">
			<h2 class="is-size-3">
				Cases of infection with various infections around the world
			</h2>
			<h1 class="is-size-1 is-primary has-text-primary has-text-weight-bold">
				<BCounter :initial-value="casesCount" :ls-item-name="lsItemName" />
			</h1>
			<h3 class="is-size-5">
				This platform is a database that helps to track and record the number of
				cases of infection with various diseases around the world.
			</h3>
			<hr />
			<b-button type="is-primary is-light" icon-right="chevron-right">
				Let's contribute to the world
			</b-button>
		</div>
		<div class="column is-7">
			<img class="my-image" src="../assets/world.svg" alt="world" />
		</div>
	</section>
</template>

<script>
import BCounter from "@/components/app/BCounter";

export default {
	name: "HomeWelcome",

	components: { BCounter },

	data() {
		return {
			casesCount: null,
			lsItemName: "recordsCounter",
			interval: null,
		};
	},

	methods: {
		getRandInt(max) {
			return Math.floor(Math.random() * max);
		},

		initCounter() {
			const ls = localStorage.getItem(this.lsItemName) || null;
			this.casesCount = JSON.parse(ls) || this.getRandInt(123456);
		},
	},

	created() {
		this.initCounter();
	},

	mounted() {
		this.interval = window.setInterval(() => {
			const inc = this.getRandInt(234);
			this.casesCount += inc;
		}, 20000);
	},

	beforeDestroy() {
		clearInterval(this.interval);
	},
};
</script>

<style lang="scss" scoped>
.my-image {
	display: block;
	width: 80%;
	margin: 0 auto;
}
</style>
