<template>
	<div v-if="checkIsOwner" class="home-tweet-menu">
		<v-menu v-model="isMenu" bottom left offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon>mdi-dots-horizontal</v-icon>
				</v-btn>
			</template>

			<v-list class="text-center" flat>
				<v-list-item @click.stop="openDeleteDialog">
					<span>
						<v-icon color="red">mdi-delete-outline</v-icon>
						Удалить
					</span>
				</v-list-item>
				<v-list-item @click.stop="openEditDialog">
					<span>
						<v-icon>mdi-pencil-outline</v-icon>
						Редактировать
					</span>
				</v-list-item>

				<v-dialog v-model="deleteDialog" width="400">
					<v-card>
						<v-card-title>
							<span class="mx-auto">Удалить твит?</span>
						</v-card-title>

						<v-card-text>
							Это действие нельзя отменить, и твит будет удален из вашего
							профиля, ленты всех ваших читателей и результатов поиска в
							Твиттере навсегда.
						</v-card-text>

						<v-card-actions class="home-tweet-menu__delete-dialog__actions">
							<v-btn
								class="px-8"
								large
								rounded
								color="secondary-extra-extra-light-gray"
								@click="closeDeleteDialog"
							>
								Отмена
							</v-btn>
							<v-btn
								class="px-8 white--text"
								large
								rounded
								color="#e0245e"
								:loading="isLoading"
								@click="tryDeleteTweet"
							>
								Удалить
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="editDialog" width="400">
					<v-card>
						<v-card-title>
							<span class="mx-auto">Изменение</span>
						</v-card-title>

						<v-card-text>
							<v-textarea
								v-model="editText"
								label="Твит"
								auto-grow
								rows="1"
								row-height="15"
							></v-textarea>
							<v-row>
								<span class="ml-auto">
									<span v-if="editText" class="mr-1 text-caption">
										{{ 280 - editText.length }}
									</span>
									<v-progress-circular
										v-if="editText"
										class="mr-4"
										:color="isTweetLimit"
										size="20"
										rotate="270"
										:value="tweetTextProgress"
									></v-progress-circular>
								</span>
							</v-row>
						</v-card-text>

						<v-card-actions class="home-tweet-menu__delete-dialog__actions">
							<v-btn
								class="px-8"
								large
								rounded
								color="secondary-extra-extra-light-gray"
								@click="closeEditDialog"
							>
								Отмена
							</v-btn>
							<v-btn
								class="px-8 white--text"
								large
								rounded
								color="#e0245e"
								:disabled="editText.length > 280 || editText.length === 0"
								:loading="isLoading"
								@click="tryUpdateTweet"
							>
								Сохранить
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-list>
		</v-menu>

		<BaseVSnackbar :is-visible="snackbarError" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
	props: {
		tweet: {
			type: Object,
			default() {
				return {};
			},
		},
		tweetTextUpdate: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			isMenu: false,
			deleteDialog: false,
			editDialog: false,
			editText: '',
			snackbarError: false,
			isLoading: false,
		};
	},
	watch: {
		deleteDialog() {
			this.isMenu = false;
		},
		editDialog() {
			this.isMenu = false;
		},
	},
	computed: {
		...mapState(['account']),
		tweetTextProgress(): number {
			return (this.editText.length / 280) * 100;
		},
		isTweetLimit(): string {
			if (this.editText.length >= 280) return 'red';
			else if (this.editText.length >= 260) return 'warning';
			else return 'primary';
		},
		checkIsOwner(): boolean {
			if (this.tweet.user) {
				return this.tweet.user._id === this.account._id;
			} else return false;
		},
	},
	methods: {
		...mapActions({
			updateTweet: 'tweets/updateTweet',
			deleteTweet: 'tweets/deleteTweet',
		}),

		openDeleteDialog() {
			this.deleteDialog = true;
		},
		openEditDialog() {
			this.editDialog = true;
			this.editText = this.tweetTextUpdate;
		},
		closeDeleteDialog() {
			this.deleteDialog = false;
		},
		closeEditDialog() {
			this.editDialog = false;
		},

		async tryDeleteTweet() {
			this.isLoading = true;
			try {
				await this.deleteTweet(this.tweet._id);
				this.isLoading = false;
				this.deleteDialog = false;
			} catch (err) {
				this.isLoading = false;
				this.snackbarError = true;
				this.deleteDialog = false;
				console.error(err);
			}
		},
		async tryUpdateTweet() {
			this.isLoading = true;
			try {
				const data = {
					text: this.editText,
					id: this.tweet._id,
				};
				await this.updateTweet(data);
				this.$emit('update-tweet-text', data.text);
				this.isLoading = false;
				this.editDialog = false;
			} catch (err) {
				this.isLoading = false;
				this.snackbarError = true;
				console.error(err);
			}
		},
	},
	mounted() {
		this.editText = this.tweetTextUpdate;
	},
});
</script>

<style scoped>
.home-tweet-menu__delete-dialog__actions {
	display: flex;
	justify-content: space-around;
	padding-bottom: 1rem;
}
</style>
