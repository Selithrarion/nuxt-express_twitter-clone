<template>
	<v-row>
		<v-btn
			class="mr-auto"
			:class="{ 'home-tweet-actions__avatar-margin': isAvatarMargin }"
			icon
			@click.stop="openComments"
		>
			<v-icon> mdi-message-outline</v-icon>
			<span v-show="comments > 0">{{ comments }}</span>
		</v-btn>
		<v-btn class="mx-auto" icon @click.stop="openRetweets">
			<v-icon>mdi-repeat</v-icon>
			<span v-show="retweets > 0">{{ retweets }}</span>
		</v-btn>
		<v-btn
			class="ml-auto"
			icon
			:color="isLike ? '#e0245e' : ''"
			@click.stop="switchLike"
		>
			<v-icon>mdi-heart-outline</v-icon>
			<span v-show="likes > 0">{{ likes }}</span>
		</v-btn>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		comments: {
			type: Number,
			default: 0,
		},
		retweets: {
			type: Number,
			default: 0,
		},
		likes: {
			type: Number,
			default: 0,
		},
		isAvatarMargin: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isLike: false,
		};
	},
	methods: {
		openComments() {
			console.log('comment');
		},
		openRetweets() {
			console.log('retweet');
		},
		switchLike() {
			this.isLike = !this.isLike;
			if (this.isLike === true) {
				this.$emit('like', 'add');
			} else {
				this.$emit('like', 'remove');
			}
		},
	},
});
</script>

<style scoped>
.home-tweet-actions__avatar-margin {
	margin-left: 80px;
}
</style>