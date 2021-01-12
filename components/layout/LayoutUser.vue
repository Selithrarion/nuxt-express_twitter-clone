<template>
	<v-row>
		<v-col>
			<v-menu offset-y v-model="isMenu">
				<template v-slot:activator="{ on, attrs }">
					<v-list flat>
						<v-list-item-group>
							<v-list-item v-on="on" v-bind="attrs">
								<v-list-item-avatar>
									<v-img :src="userData.avatarUrl"></v-img>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title>
										{{ userData.fullname }}
									</v-list-item-title>
									<v-list-item-subtitle>
										@{{ userData.username }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</template>
				<v-list flat>
					<v-list-item-group>
						<v-list-item @click="exit">
							<v-list-item-title>Выйти</v-list-item-title>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-menu>
		</v-col>
	</v-row>
</template>

<script>
export default {
	props: {
		userData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isMenu: false,
			items: [],
		};
	},
	methods: {
		exit() {
			this.$emit('sign-out');
		},
	},
};
</script>

<style scoped></style>
