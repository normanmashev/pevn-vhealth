<template>
	<section class="profile">
		<div class="columns is-multiline">
			<div v-if="notification" class="column is-12 mb-3">
				<b-notification
					:type="notification.type + ' is-light'"
					aria-close-label="Close notification"
					role="alert"
				>
					{{ notification.message }}
				</b-notification>
			</div>

			<UserInfo :info="info" />
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

import UserInfo from "@/components/UserInfo";

export default {
	name: "Profile",

	components: {
		UserInfo,
	},

	data() {
		return {
			loading: false,
			info: null,
			notification: null,
		};
	},

	computed: {
		...mapGetters({
			mainInfo: "user/getUserInfo",
		}),
	},

	methods: {
		async loadData() {
			try {
				this.info = await this.$store.dispatch(
					"user/getOneUser",
					this.mainInfo.id
				);
			} catch (error) {
				this.notification = error;
			}
		},
	},

	created() {
		this.loadData();
	},
};
</script>

<style></style>
