<template>
	<section class="home-dangerous mt-5">
		<h1 class="is-size-4 has-text-centered mb-2">#3 most dangerous diseases</h1>
		<div class="is-flex is-justify-content-center mb-6">
			<legend class="mr-5">
				<b-icon class="mr-1" size="is-small" icon="skull"></b-icon>
				<span>- total deaths</span>
			</legend>
			<legend class="has-text-link">
				<b-icon class="mr-1" size="is-small" icon="hospital-user"></b-icon>
				<span>- total patients</span>
			</legend>
		</div>
		<div class="is-flex is-justify-content-space-around">
			<article class="card my-card" v-for="d of data" :key="d.disease_code">
				<div class="card-content has-text-centered">
					<h2 class="is-size-4">{{ d.disease_code }}</h2>
					<h6 class="is-size-7 has-text-grey">{{ d.description }}</h6>
					<h4 class="is-size-6 has-text-link">
						<b-icon class="mr-1" size="is-small" icon="hospital-user"></b-icon>
						<span>{{ d.total_patients }}</span>
					</h4>
					<h4 class="is-size-6">
						<b-icon class="mr-1" size="is-small" icon="skull"></b-icon>
						<span>{{ d.total_deaths }}</span>
					</h4>
				</div>
			</article>
		</div>
	</section>
</template>

<script>
import { getMostDangerousDisease } from "@/api/disease";

export default {
	name: "HomeDangerous",

	data() {
		return {
			data: [],
			loading: false,
		};
	},

	methods: {
		async loadData() {
			this.loading = true;
			this.data = await getMostDangerousDisease();
			this.loading = false;
		},
	},

	mounted() {
		this.loadData();
	},
};
</script>

<style lang="scss" scoped></style>
