<template>
	<div class="tweet-details">
		<div v-if="!loaded">
			<v-skeleton-loader
				boilerplate
				type="list-item-avatar"
			></v-skeleton-loader>
			<div class="text-center mt-8">
				<v-progress-circular
					indeterminate
					color="primary"
				></v-progress-circular>
			</div>
		</div>

		<div v-if="loaded" class="loaded">
			<v-list-item
				class="pl-0"
				@click="$router.push(/profile/ + tweet.user.username)"
			>
				<v-list-item-avatar size="48">
					<v-img :src="tweet.user.avatarUrl" alt="Аватар"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title class="font-weight-bold">
						{{ tweet.user.fullname }}
					</v-list-item-title>
					<v-list-item-subtitle>
						@{{ tweet.user.username }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<div class="tweet-details__text">
				{{ tweet.text }}
			</div>
			<v-card v-for="imageURL in tweet.imagesURLs" :key="imageURL" class="my-2">
				<v-card-text>
					<v-img :src="imageURL"></v-img>
				</v-card-text>
			</v-card>
			<v-list-item class="pl-0">
				<v-list-item-content class="pt-2">
					<v-list-item-subtitle>
						{{ formatDate(new Date(tweet.createdAt)) }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-container fluid>
				<HomeTweetActions
					:comments="tweet.commentsQuantity"
					:likes="tweet.likesQuantity"
					:retweets="tweet.retweetsQuantity"
					@like="switchLike"
				/>
			</v-container>
		</div>
		<BaseVSnackbar :is-visible="snackbarError" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
	fetch() {
		const tweet = this.$store.state.tweets.tweetDetails;
		this.tweet = tweet;
	},
	middleware: ['isAuth'],
	data() {
		return {
			loaded: false,
			snackbarError: false,
			tweet: {},
		};
	},
	computed: {
		tweetId(): string {
			return this.$route.params.id;
		},
	},
	methods: {
		...mapActions({
			switchLikeOnServer: 'tweets/switchLike',
		}),
		async switchLike(action) {
			try {
				const data = {
					id: this.tweetId,
					action,
				};
				await this.switchLikeOnServer(data);
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
.tweet-details__text {
	font-size: 18px;
}
</style>
