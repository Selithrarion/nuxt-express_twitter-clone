<template>
	<div class="home mx-auto">
		<div v-if="!loaded">
			<v-skeleton-loader
				boilerplate
				type="list-item-avatar"
			></v-skeleton-loader>
			<v-skeleton-loader boilerplate type="actions"></v-skeleton-loader>

			<div class="big-divider"></div>

			<BaseVProgressCircular />
		</div>

		<div v-if="loaded">
			<HomeTweetAdd />

			<div class="big-divider"></div>

			<v-list flat>
				<v-list-item-group>
					<LazyHomeTweet
						v-for="tweet in tweets"
						:key="tweet._id"
						:tweet="tweet"
						@like="trySwitchLike"
						@open="openTweet"
					/>
				</v-list-item-group>
			</v-list>
		</div>

		<BaseVSnackbar :is-visible="snackbarError" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
	async fetch() {
		await this.fetchAllTweets();
		const tweets = this.storeTweets.tweets;
		this.tweets = tweets;
	},
	middleware: ['isAuth'],
	data() {
		return {
			loaded: false,
			snackbarError: false,
			tweets: [],
		};
	},
	watch: {
		'storeTweets.tweets'() {
			this.tweets = this.storeTweets.tweets;
		},
	},
	computed: {
		...mapState({
			storeTweets: 'tweets',
		}),
	},
	methods: {
		...mapActions({
			switchLikeOnServer: 'tweets/switchLike',
			fetchAllTweets: 'tweets/fetchTweets',
			fetchStoreTweetDetailsById: 'tweets/fetchStoreTweetDetailsById',
		}),

		async trySwitchLike(id, action) {
			try {
				const data = {
					id,
					action,
				};
				await this.switchLikeOnServer(data);
			} catch (err) {
				this.snackbarError = true;
				console.error(err);
			}
		},
		async openTweet(id) {
			try {
				await this.fetchStoreTweetDetailsById(id);
				this.$router.push('/tweet/' + id);
			} catch (err) {
				this.snackbarError = true;
				console.error(err);
			}
		},
	},
	mounted() {
		this.loaded = true;
	},
});
</script>

<style scoped>
.home {
	max-width: 800px;
}
.big-divider {
	height: 8px;
	background: #e1e8ed;
	border-radius: 4px;
}
</style>
