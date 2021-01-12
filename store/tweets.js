export const state = () => ({
	tweets: [
		// {
		// 	_id: '8df8a943sd7fuwer',
		// 	fullname: 'Сергей Мальцев',
		// 	username: 'deslacoda',
		// 	text: `lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf lorem textTest dfadf`,
		// 	likesQuantity: 5,
		// 	commentsQuantity: 0,
		// 	retweetsQuantity: 0,
		// 	created: '2020-10-05T14:48:00.000Z',
		// 	avatarUrl: `https://images.unsplash.com/photo-1603610515737-193e0b423983?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1350&q=80`,
		// },
	],
	tweetDetails: {},
});
export const mutations = {
	FETCH_TWEETS(state, data) {
		state.tweets = data;
	},
	FETCH_STORE_TWEET_DETAILS_BY_ID(state, tweetDetails) {
		state.tweetDetails = tweetDetails;
	},
	SWITCH_LIKE(state, { id, action }) {
		const tweet = state.tweets.filter((tweet) => tweet._id === id)[0];
		tweet.likesQuantity++;
	},
	ADD_TWEET(state, tweet) {
		state.tweets.unshift(tweet);
	},

	UPDATE_TWEET(state, tweet) {
		const id = tweet._id;
		const tweetIndex = state.tweets.findIndex((item) => item._id === id);
		if (tweetIndex !== -1) {
			state.tweets[tweetIndex] = tweet;
		}
	},
	DELETE_TWEET(state, id) {
		state.tweets = state.tweets.filter((tweet) => tweet._id !== id);
	},
};
export const actions = {
	async fetchTweets({ commit }) {
		const { data } = await this.$axios.$get('/tweets');
		commit('FETCH_TWEETS', data);
	},
	async fetchStoreTweetDetailsById({ commit }, id) {
		const { data } = await this.$axios.$get('/tweets/' + id);
		commit('FETCH_STORE_TWEET_DETAILS_BY_ID', data);
	},

	async switchLike({ commit }, { id, action }) {
		if (action === 'add') {
			console.log('add');
		} else {
			console.log('remove');
		}
		// await commit('SWITCH_LIKE', {id, action});
	},

	async addTweet({ dispatch, commit, rootState }, tweetData) {
		const allURLs = await dispatch('uploadImages', tweetData.images, {
			root: true,
		});
		const fd = {
			text: tweetData.text,
			user: rootState.account._id,
			imagesURLs: allURLs,
		};

		const { data } = await this.$axios.$post('/tweets', fd);
		commit('ADD_TWEET', data);
	},
	async updateTweet({ commit }, { text, id }) {
		const { data } = await this.$axios.$patch('tweets/' + id, { text });
		commit('UPDATE_TWEET', data);
	},
	async deleteTweet({ commit }, id) {
		await this.$axios.$delete('tweets/' + id);
		commit('DELETE_TWEET', id);
	},
};
