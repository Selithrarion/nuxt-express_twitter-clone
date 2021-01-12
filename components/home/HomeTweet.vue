<template>
	<v-list-item
		class="home-tweet"
		v-ripple="{ class: 'secondaryLightGray--text' }"
		@click="openTweet(tweet._id)"
	>
		<v-container fluid>
			<v-row>
				<v-list-item-avatar class="mb-auto" size="64">
					<v-img :src="tweet.user.avatarUrl"></v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title class="home-tweet__title">
						<span class="home-tweet__title-left-side"
							><span class="font-weight-bold">{{ tweet.user.fullname }}</span>
							<span class="secondaryDarkGray--text"
								>@{{ tweet.user.username }}</span
							>
							<span class="secondaryDarkGray--text">
								—
								{{ formatDate(new Date(tweet.createdAt)) }}
							</span>
						</span>
						<HomeTweetMenu
							:tweet="tweet"
							:tweetTextUpdate="tweetText"
							@update-tweet-text="updateTweetText"
						/>
					</v-list-item-title>
					<span>
						{{ tweetText }}
					</span>
					<v-card
						v-for="imageURL in tweet.imagesURLs"
						:key="imageURL"
						:img="imageURL"
						height="256"
						class="my-2"
					></v-card>
				</v-list-item-content>
			</v-row>

			<HomeTweetActions
				:comments="tweet.commentsQuantity"
				:likes="tweet.likesQuantity"
				:retweets="tweet.retweetsQuantity"
				isAvatarMargin
				@like="clickLike"
			/>
		</v-container>
	</v-list-item>
</template>

<script>
export default {
	props: {
		tweet: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			loaded: false,
			tweetText: '',
		};
	},
	methods: {
		clickComment() {
			console.log('comment');
		},
		clickRetweet() {
			console.log('retweet');
		},
		clickLike(action) {
			if (action === 'add') {
				this.$emit('like', this.tweet._id, 'add');
			} else {
				this.$emit('like', this.tweet._id, 'remove');
			}
		},
		openTweet(id) {
			this.$emit('open', id);
		},
		updateTweetText(text) {
			this.tweetText = text;
		},
	},
	mounted() {
		this.loaded = true;
		this.tweetText = this.tweet.text;
	},
};
</script>

<style scoped>
.home-tweet {
	border-top: 1px solid rgb(243, 243, 243);
}
.home-tweet__avatar-margin {
	margin-left: 80px;
}
.home-tweet__title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
