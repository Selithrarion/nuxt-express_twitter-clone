<template>
	<v-row>
		<v-col>
			<v-list rounded nav>
				<v-list-item-group>
					<v-list-item disabled>
						<v-btn icon color="primary">
							<v-icon large>mdi-twitter</v-icon>
						</v-btn>
					</v-list-item>
					<v-list-item
						v-for="item in items"
						:key="item.title"
						@click="openPage(item.to)"
					>
						<v-list-item-icon>
							<v-icon v-text="item.icon"></v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title
								class="text-h6 font-weight-bold"
								v-text="item.title"
							/>
						</v-list-item-content>
					</v-list-item>
					<v-dialog class="rounded-lg" v-model="tweetDialog" width="600">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								class="mt-6"
								color="primary"
								x-large
								block
								rounded
								v-bind="attrs"
								v-on="on"
								>Твитнуть</v-btn
							>
						</template>
						<v-card>
							<v-card-title class="pl-2">
								<v-btn
									class="mr-auto"
									icon
									color="primary"
									@click="tweetDialog = false"
								>
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</v-card-title>
							<v-divider></v-divider>
							<v-card-text class="px-0 pr-2">
								<HomeTweetAdd />
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-list-item-group>
			</v-list>
		</v-col>
	</v-row>
</template>

<script>
export default {
	data() {
		return {
			tweetDialog: false,
			items: [
				{
					icon: 'mdi-home',
					title: 'Главная',
					to: '/home',
				},
				{
					icon: 'mdi-bell',
					title: 'Уведомления',
					// to: '/notifications',
				},
				{
					icon: 'mdi-message',
					title: 'Сообщения',
					// to: '/messages',
				},
				{
					icon: 'mdi-bookmark',
					title: 'Закладки',
					// to: '/bookmarks',
				},
				{
					icon: 'mdi-format-list-bulleted',
					title: 'Списки',
					// to: '/lists',
				},
				{
					icon: 'mdi-account',
					title: 'Профиль',
					to: '/profile/' + this.$store.state.account.username,
				},
			],
		};
	},
	methods: {
		openPage(url) {
			if (url) {
				this.$router.push(url);
			}
		},
	},
};
</script>
