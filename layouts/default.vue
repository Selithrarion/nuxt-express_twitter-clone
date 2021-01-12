<template>
	<v-app>
		<v-navigation-drawer width="320" app>
			<v-container fill-height>
				<LayoutNavigation class="mb-auto" />
				<v-spacer />
				<LayoutUser
					class="mt-auto"
					:userData="accountStore"
					@sign-out="signOutFromAccount"
				/>
			</v-container>
		</v-navigation-drawer>

		<v-app-bar height="56" color="white" flat app>
			<span class="font-weight-black text-h6">
				<v-btn
					v-if="isTweetDetails"
					icon
					color="primary"
					@click="$router.go(-1)"
				>
					<v-icon> mdi-arrow-left </v-icon>
				</v-btn>

				{{ title }}
			</span>
		</v-app-bar>

		<v-main>
			<v-container>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="10" md="8"> <nuxt /> </v-col
				></v-row>
			</v-container>
		</v-main>

		<v-navigation-drawer right width="384" app>
			<v-col>
				<LayoutSearch />
				<LayoutLastUsers />
			</v-col>
		</v-navigation-drawer>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			accountStore: 'account',
		}),
		isMobile() {
			if (
				this.$vuetify.breakpoint.name === 'xs' ||
				this.$vuetify.breakpoint.name === 'sm'
			)
				return true;
			return false;
		},
		title() {
			switch (this.$route.path) {
				case '/home': {
					return 'Главная';
				}
				case '/explore': {
					return 'Поиск';
				}
				case '/profile': {
					return 'Профиль';
				}
				default: {
					return 'Твитнуть';
				}
			}
		},
		isTweetDetails() {
			if (this.$route.path.split('/').indexOf('tweet') !== -1) {
				return true;
			}
			return false;
		},
	},
	methods: {
		...mapActions({
			addTweet: 'tweets/addTweet',
			signOut: 'signOut',
		}),
		onClickTweet(text) {
			try {
				this.addTweet(text);
			} catch (err) {
				console.error(err);
			}
		},
		signOutFromAccount() {
			this.signOut();
			this.$router.push('/');
		},
	},
};
</script>

<style scoped></style>
