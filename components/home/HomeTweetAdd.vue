<template>
	<div class="home-tweet-add">
		<v-container>
			<v-row>
				<v-avatar class="ml-4 mr-4" size="64">
					<v-img :src="account.avatarUrl"></v-img>
				</v-avatar>
				<v-textarea
					v-model="tweetText"
					placeholder="Что происходит?"
					auto-grow
					rows="1"
					row-height="15"
				></v-textarea>
			</v-row>
			<v-row align="center">
				<v-file-input
					v-model="image"
					color="primary"
					class="home-tweet-add__avatar-margin"
					hide-input
					dense
					accept="image/*"
					prepend-icon="mdi-file-upload"
					@change="addImageToAllFilesAndToPreviewURLs"
				></v-file-input>
				<span v-if="tweetText" class="mr-1 text-caption">
					{{ 280 - tweetText.length }}
				</span>
				<v-progress-circular
					v-if="tweetText"
					class="mr-4"
					:color="isTweetLimit"
					size="20"
					rotate="270"
					:value="tweetTextProgress"
				></v-progress-circular>
				<v-btn
					class="ml-auto"
					color="primary"
					rounded
					:disabled="tweetText.length > 280 || tweetText.length === 0"
					:loading="isTweetAddLoading"
					@click="tryAddTweet"
				>
					Твитнуть
				</v-btn>
			</v-row>

			<v-row class="mt-4">
				<v-card
					v-for="(previewURL, index) in previewURLs"
					:key="previewURL"
					:img="previewURL"
					class="mx-2 my-2"
					height="128"
					width="128"
					@click="removeImageFromAllImagesAndPreviewByIndex(index)"
				></v-card>
			</v-row>
		</v-container>
		<BaseVSnackbar :is-visible="snackbarError" />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			tweetText: '',
			image: null,
			allImages: [],
			previewURLs: [],
			isImageMenu: false,
			isTweetAddLoading: false,
			snackbarError: false,
		};
	},
	computed: {
		...mapState(['account']),
		tweetTextProgress() {
			return (this.tweetText.length / 280) * 100;
		},
		isTweetLimit() {
			if (this.tweetText.length >= 280) return 'error';
			else if (this.tweetText.length >= 260) return 'warning';
			else return 'primary';
		},
	},
	methods: {
		...mapActions({ addTweet: 'tweets/addTweet' }),
		async tryAddTweet() {
			this.isTweetAddLoading = true;
			try {
				const formData = {
					text: this.tweetText,
					images: this.allImages,
				};

				await this.addTweet(formData);

				this.isTweetAddLoading = false;
				this.tweetText = '';
				this.allImages = null;
				this.previewURLs = [];
			} catch (err) {
				this.isTweetAddLoading = false;
				this.snackbarError = true;
				console.error(err);
			}
		},
		addImageToAllFilesAndToPreviewURLs() {
			const image = this.image;
			if (!image) return;

			this.allImages.push(image);

			const url = URL.createObjectURL(image);
			this.previewURLs.push(url);
		},
		removeImageFromAllImagesAndPreviewByIndex(index) {
			this.allImages.splice(index, 1);
			this.previewURLs.splice(index, 1);
		},
	},
};
</script>

<style scoped>
.home-tweet-add__avatar-margin {
	margin-left: 94px;
}
</style>
