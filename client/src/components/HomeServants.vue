<template>
	<section class="home-dangerous mt-5">
		<h1 class="is-size-4 has-text-centered mb-6">
			#3 most active public servants
		</h1>
		<div class="is-flex is-justify-content-space-around">
			<article class="card my-card" v-for="d of data" :key="d.email">
				<div class="card-content has-text-centered">
					<h2 class="is-size-4">{{ d | getFullname }}</h2>
					<h6 class="is-size-7 has-text-grey">{{ d.email }}</h6>
					<h4 class="is-size-6 has-text-link">
						<h6>Total patients recorded:</h6>
						<b>{{ d.total_patients }}</b>
					</h4>
					<h4 class="is-size-6">
						<span>
							Made {{ d.total_records }} records in
							{{ d.total_countries }} countries
						</span>
					</h4>
				</div>
			</article>
		</div>
	</section>
</template>

<script>
import { getMostActiveServants } from "@/api/servants";

export default {
	name: "HomeServants",

	data() {
		return {
			data: [],
			loading: false,
		};
	},

	methods: {
		async loadData() {
			this.loading = true;
			this.data = await getMostActiveServants();
			this.loading = false;
		},
	},

	mounted() {
		this.loadData();
	},
};
</script>
