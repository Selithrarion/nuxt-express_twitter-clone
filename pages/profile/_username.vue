<template>
	<v-container class="profile">
		<div v-if="!isLoaded">
			<BaseVProgressCircular />
		</div>
		<div v-if="isLoaded && accountInfo">
			<v-row class="pl-4">
				<v-avatar size="128">
					<img :src="accountInfo.avatarUrl" alt="avatar" />
				</v-avatar>
				<ProfileChangeInfoDialogForm
					v-if="accountStore.username === profileUsername"
					class="ml-auto"
					:fullnameProp="accountInfo.fullname"
					:aboutProp="accountInfo.about"
					:locationProp="accountInfo.location"
					:websiteProp="accountInfo.website"
					:idProp="accountInfo._id"
					@update-user="tryUpdateUser"
				/>
			</v-row>
			<v-row>
				<v-col>
					<div class="text-h5 font-weight-bold">
						{{ accountInfo.fullname }}
					</div>
					<div class="subtitle-1 secondaryDarkGray--text">
						@{{ accountInfo.username }}
					</div>
				</v-col>
			</v-row>

			<v-row>
				<v-col class="pt-0">
					<div class="subtitle-1 secondaryDarkGray--text">
						<span>
							<v-icon>mdi-calendar</v-icon>
							Дата регистрации:
							{{ formatDate(accountInfo.createdAt) }}
						</span>
						<span v-if="!isEmptyLocation" class="ml-2">
							<v-icon>mdi-map-marker-outline</v-icon>
							{{ accountInfo.location }}
						</span>
						<span v-if="!isEmptyWebsite" class="ml-2">
							<v-icon>mdi-all-inclusive</v-icon>
							<a :href="'http://' + accountInfo.website">
								{{ accountInfo.website }}
							</a>
						</span>
					</div>
				</v-col>
			</v-row>

			<v-row v-if="!isEmptyAbout" class="mb-8">
				<v-col>
					<div>
						<span class="font-weight-bold">О себе: </span>
						<span> {{ accountInfo.about }} </span>
					</div>
				</v-col>
			</v-row>

			<v-tabs
				v-model="selectedTab"
				background-color="transparent"
				color="primary"
				grow
			>
				<v-tab v-for="tab in tabs" :key="tab">
					{{ tab }}
				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="selectedTab">
				<v-tab-item v-for="tab in tabs" :key="tab">
					<v-card flat>
						<v-card-text>{{ tab }}</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</div>
		<BaseVSnackbar :is-visible="snackbarError" />
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

export default {
	async fetch() {
		try {
			if (this.username === this.accountStore.username) {
				this.getMe();
				this.accountInfo = this.accountStore;
			} else {
				const userInfo = await this.getProfile(this.profileUsername);
				this.accountInfo = userInfo;
			}
		} catch (err) {
			this.snackbarError = true;
			console.error(err);
		}
	},
	middleware: ['isAuth'],
	data() {
		return {
			accountInfo: null,
			tabs: ['Твиты', 'Твиты и ответы', 'Медиа', 'Нравится'],
			selectedTab: null,
			snackbarError: false,
			isLoaded: false,
		};
	},
	computed: {
		...mapState({
			accountStore: 'account',
		}),
		isEmptyLocation() {
			return this.accountInfo.location === '';
		},
		isEmptyWebsite() {
			return this.accountInfo.website === '';
		},
		isEmptyAbout() {
			return this.accountInfo.about === '';
		},
		profileUsername() {
			return this.$route.params.username;
		},
	},
	methods: {
		...mapActions({
			getMe: 'getMe',
			getProfile: 'getProfileByUsername',
			updateUser: 'updateUser',
		}),
		formatDate(date) {
			return format(new Date(date), 'dd MMMM yyyy' + ' г.', { locale: ru });
		},
		async tryUpdateUser(data) {
			try {
				await this.updateUser(data);
				this.accountInfo = this.accountStore;
			} catch (e) {
				console.error(e);
				this.snackbarError = true;
			}
		},
	},
	mounted() {
		this.isLoaded = true;
	},
};
</script>
