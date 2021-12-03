<template>
	<article class="servant-info">
		<b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
			<template #trigger="props">
				<div
					class="card-header"
					role="button"
					aria-controls="contentIdForA11y3"
				>
					<p class="card-header-title">
						<span class="has-text-weight-light mr-1">Information about</span>
						<span>{{ data.data | getFullname }}</span>
					</p>
					<a class="card-header-icon">
						<b-icon
							icon-group="fas"
							:icon="props.open ? 'chevron-up' : 'chevron-down'"
						>
						</b-icon>
					</a>
				</div>
			</template>

			<div class="card-content">
				<div class="content">
					<div class="is-flex is-justify-content-space-around">
						<div class="content__info">
							<p class="is-size-6">
								Name: <b>{{ data.data.name }}</b>
							</p>
							<p class="is-size-6">
								Surname: <b>{{ data.data.surname }}</b>
							</p>
							<p class="is-size-6">
								From: <b>{{ data.data.cname }}</b>
							</p>
							<p class="is-size-6">
								Works in: <b>{{ data.data.department }}</b>
							</p>
							<p class="is-size-6">
								Salary: <b>{{ data.data.salary }}$</b>
							</p>
						</div>

						<div class="content__records">
							<p class="is-size-6">
								Has {{ data.records.length }} records in
								<b>{{ data.total_countries.count }}</b> countries
							</p>
							<ul class="is-flex is-flex-direction-column">
								<li v-for="(record, i) of data.records" :key="i">
									<b>{{ record.description }}({{ record.disease_code }})</b>
									{{ record.total_patients }} recorded in {{ record.cname }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<footer class="card-footer">
				<a
					class="card-footer-item"
					@click="$store.commit('servants/SET_SERVANT_INFO', null)"
				>
					Close
				</a>
			</footer>
		</b-collapse>
	</article>
</template>

<script>
export default {
	name: "ServantInfo",

	props: {
		data: {
			type: Object,
			required: true,
		},
	},
};
</script>
